#!/usr/bin/env python3
"""Smoke test for the five /tools/ calculators against a built bundle.

Run a production build and serve it, then point this at it:

    npm run build
    npx vite preview --port 4173 --strictPort &
    python3 scripts/e2e/tools_smoke.py

Exits non-zero on the first failed assertion. Screenshots land in
/tmp/bh-e2e/ at every step so a failure can be looked at rather than guessed at.

Mobile viewport throughout: Ghana traffic is overwhelmingly phones, and the
lead form sitting above the fold is the whole conversion mechanic, so a
desktop-width pass would prove nothing that matters.

EVERY network call to the live backend is aborted. The marketing-leads endpoint
is live in production, so an un-intercepted submit would create a real lead row
and email ops. The run asserts afterwards that nothing escaped.
"""

import json
import pathlib
import sys

from playwright.sync_api import sync_playwright

BASE = "http://localhost:4173"
SHOTS = pathlib.Path("/tmp/bh-e2e")
SHOTS.mkdir(parents=True, exist_ok=True)

escaped: list[str] = []
stubbed: list[str] = []
failures: list[str] = []
checks = 0


def check(label: str, condition: bool, detail: str = "") -> None:
    global checks
    checks += 1
    if condition:
        print(f"  ok   {label}")
    else:
        msg = f"{label}{(' — ' + detail) if detail else ''}"
        print(f"  FAIL {msg}")
        failures.append(msg)


def guard(route):
    """Keep the run offline without creating false alarms.

    The tools fetch the live public catalogue on load to price the CTAs. Those
    are GETs and harmless, but letting them out would make the run depend on a
    remote host, so they are stubbed rather than aborted: aborting produces
    console errors that look like product bugs and are not.

    A non-GET to a real backend is the thing that must never happen, because
    the marketing-leads endpoint is live and a submit would create a real row
    and email ops. Those are aborted and recorded as escapes.
    """
    req = route.request
    url = req.url
    remote = BASE not in url

    if remote and req.method != "GET":
        escaped.append(f"{req.method} {url}")
        route.abort()
    elif remote:
        stubbed.append(url)
        route.fulfill(status=200, content_type="application/json", body="{}")
    else:
        route.continue_()


def shot(page, name):
    page.screenshot(path=str(SHOTS / f"{name}.png"), full_page=True)


def unlock(page, slug):
    """Skip the lead gate the way a returning visitor does, so the smoke test
    never posts. The gate itself is covered by the unit tests."""
    page.add_init_script(
        f"try{{localStorage.setItem('bh_guide_unlocked:{slug}','Smoke');}}catch(e){{}}"
    )


def first_question_above_fold(page, label):
    """The first control must be reachable without scrolling on a 375x812 phone."""
    box = None
    for sel in ["main button", "main select", "main input"]:
        el = page.query_selector(sel)
        if el:
            box = el.bounding_box()
            if box:
                break
    check(f"{label}: first control above the fold", bool(box) and box["y"] < 812,
          f"y={box['y'] if box else 'not found'}")


def run(pw):
    browser = pw.chromium.launch(
        executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        headless=True,
    )
    ctx = browser.new_context(
        viewport={"width": 375, "height": 812},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
        user_agent=(
            "Mozilla/5.0 (Linux; Android 13; SM-A536B) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36"
        ),
    )
    ctx.route("**/*", guard)
    page = ctx.new_page()

    console_errors: list[str] = []
    page.on("console", lambda m: console_errors.append(m.text) if m.type == "error" else None)

    # ---------- index ----------
    print("\n/tools index")
    page.goto(f"{BASE}/tools/", wait_until="networkidle")
    body = page.inner_text("main")
    check("index lists five tools",
          all(t in body for t in ["Genotype", "Diabetes Risk", "Heart Age", "BMI and Waist", "Kidney Check"]))
    check("index has no horizontal overflow",
          page.evaluate("document.documentElement.scrollWidth <= 375"),
          page.evaluate("String(document.documentElement.scrollWidth)"))
    shot(page, "00-index")

    # ---------- genotype / inheritance ----------
    print("\n/tools/genotype-compatibility")
    unlock(page, "genotype-compatibility")
    page.goto(f"{BASE}/tools/genotype-compatibility/", wait_until="networkidle")
    h1 = page.inner_text("h1")
    check("h1 matches the ad promise", "Genotype Compatibility" in h1, h1)
    check("title keeps the search phrase", "Genotype Compatibility" in page.title(), page.title())
    first_question_above_fold(page, "genotype")
    shot(page, "01-genotype-start")

    # The tool interleaves chapter screens with questions, so rather than
    # assume a fixed shape, walk it: answer AS wherever a genotype option is
    # offered, otherwise take whatever button moves forward.
    # No "have we finished" shortcut here: the page's own explanatory copy
    # contains percentages, so anything that greps for one stops on step one.
    # Walk until neither an answer nor an advance button is on offer.
    ADVANCE = ["Work out", "See the odds", "Start part", "Continue", "Next"]
    picked = 0
    for _ in range(14):
        as_btn = None
        for el in page.query_selector_all("main button"):
            if (el.inner_text() or "").strip().split("\n")[0].strip() == "AS":
                as_btn = el
                break
        if as_btn and as_btn.is_enabled():
            as_btn.click(timeout=3000)
            picked += 1
            page.wait_for_timeout(400)
            continue

        moved = False
        for word in ADVANCE:
            btn = page.query_selector(f"main button:has-text('{word}')")
            if btn and btn.is_enabled():
                btn.click(timeout=3000)
                page.wait_for_timeout(600)
                moved = True
                break
        if moved:
            continue

        # Some other question, such as how the genotype is known. Prefer the
        # sickling-only answer where it is offered, since that is the path that
        # should surface the electrophoresis recommendation.
        pref = page.query_selector("main button:has-text('sickling test only')")
        if pref and pref.is_enabled():
            pref.click(timeout=3000)
            page.wait_for_timeout(500)
            continue

        for el in page.query_selector_all("main button"):
            label = (el.inner_text() or "").strip()
            if label and not label.startswith("Back") and el.is_enabled():
                el.click(timeout=3000)
                page.wait_for_timeout(500)
                moved = True
                break
        if not moved:
            break

    check("selected AS for both partners", picked >= 2, f"picked={picked}")
    page.wait_for_timeout(1800)
    shot(page, "01b-genotype-questions")
    text = page.inner_text("main")
    shot(page, "02-genotype-result")
    check("AS + AS shows the 25/50/25 split",
          "25%" in text and "50%" in text)
    check("sickling-only answer surfaces the electrophoresis recommendation",
          "lectrophoresis" in text)
    check("carries the education disclaimer", "General education only" in text)

    # ---------- the other three load and start ----------
    for slug, phrase in [
        ("diabetes-risk", "FINDRISC"),
        ("heart-age", "WHO"),
        ("bmi-waist", "waist"),
        ("kidney-check", "eGFR"),
    ]:
        print(f"\n/tools/{slug}")
        unlock(page, slug)
        page.goto(f"{BASE}/tools/{slug}/", wait_until="networkidle")
        page.wait_for_timeout(400)
        body = page.inner_text("main")
        check(f"{slug}: renders its instrument", phrase.lower() in body.lower())
        check(f"{slug}: no horizontal overflow",
              page.evaluate("document.documentElement.scrollWidth <= 375"))
        first_question_above_fold(page, slug)
        shot(page, f"03-{slug}-start")

    # ---------- kidney check: the branch is the whole point ----------
    # Part 1 needs no test at all. Part 2 opens with "do you have a recent
    # kidney result?" and everything after it skips on a no, so both sides of
    # that branch get walked: the ordinary no-numbers run, and the run that
    # arrives with only the blood half and should be told the urine half is
    # missing. A third run checks the hard stop, where the page refuses to
    # compute anything at all.
    print("\n/tools/kidney-check")
    unlock(page, "kidney-check")

    def click_text(page, label, timeout=4000):
        btn = page.query_selector(f"main button:has-text('{label}')")
        assert btn is not None, f"no button matching {label!r}"
        btn.click(timeout=timeout)
        page.wait_for_timeout(420)

    def kidney_part_one(page, nephrology="No", first_shot=False):
        """The ten part 1 questions, ending on the part 2 chapter screen."""
        page.goto(f"{BASE}/tools/kidney-check/", wait_until="networkidle")
        page.wait_for_timeout(500)
        if first_shot:
            check("kidney: h1 carries the page name", "Kidney Check" in page.inner_text("h1"),
                  page.inner_text("h1"))
            check("kidney: title keeps the search phrases",
                  "Kidney Function" in page.title() and "eGFR" in page.title(), page.title())
            first_question_above_fold(page, "kidney")
            shot(page, "04-kidney-01-part1-first-question")

        # 1. age
        page.fill("#step-age", "52")
        click_text(page, "Continue")
        # 2. sex, 3. pregnancy (asked because the female reference was picked),
        # 4. nephrology care, 5. diabetes, 6. blood pressure, 7. family history
        for label in ["Female", "No", nephrology, "Yes, diagnosed", "Yes, on medication", "No"]:
            click_text(page, label)
        # 8, 9, 10: three "any that apply" lists, taken empty
        for _ in range(3):
            click_text(page, "Continue")

    # --- run A: no numbers, which is what most people will answer ---
    kidney_part_one(page, first_shot=True)
    body = page.inner_text("main")
    check("kidney: part 2 is announced as its own chapter", "Part 2" in body, body[:120])
    shot(page, "04-kidney-02-part2-chapter")
    click_text(page, "Start part 2")
    body = page.inner_text("main")
    check("kidney: the branch question is asked outright",
          "Do you have a recent kidney result?" in body, body[:160])
    shot(page, "04-kidney-03-branch-question")
    click_text(page, "No, not yet")
    page.wait_for_timeout(2200)
    text = page.inner_text("main")
    shot(page, "04-kidney-04-result-no-numbers")
    check("kidney: no-numbers result still answers part 1",
          "should your kidneys be checked" in text.lower())
    check("kidney: no-numbers result makes the two-numbers case",
          "two numbers" in text.lower())
    check("kidney: no-numbers result offers both tests, not one",
          "Renal Function Test" in text and "Albumin:Creatinine Ratio" in text)
    check("kidney: part 1 says it is a list and not a score",
          "not a score" in text.lower())
    check("kidney: carries the education disclaimer", "General education only" in text)

    # --- run B: the blood half only, which is the case the tool exists for ---
    kidney_part_one(page)
    click_text(page, "Start part 2")
    click_text(page, "Yes, I have a report")
    body = page.inner_text("main")
    check("kidney: the has-numbers branch asks which number is on the report",
          "Which of these is on the report?" in body, body[:160])
    shot(page, "04-kidney-05-which-numbers")
    click_text(page, "A blood creatinine result")
    click_text(page, "Continue")
    body = page.inner_text("main")
    check("kidney: the creatinine box offers both units",
          "micromol/L" in body and "mg/dL" in body, body[:200])
    shot(page, "04-kidney-06-creatinine-units")
    click_text(page, "micromol/L")
    page.fill("#step-creatinine", "88")
    click_text(page, "Continue")
    # The KDIGO Table 9 reliability list, taken empty so a number is computed.
    body = page.inner_text("main")
    check("kidney: asks the reliability question before estimating",
          "less accurate" in body, body[:200])
    click_text(page, "Continue")
    page.wait_for_timeout(2600)
    text = page.inner_text("main")
    shot(page, "04-kidney-07-result-one-number-only")
    check("kidney: the urine question was skipped, not asked",
          "urine albumin result?" not in text.lower())
    check("kidney: one-number result names the missing half",
          "urine half is missing" in text.lower(), text[:200])
    check("kidney: one-number result shows a range from two equations",
          "CKD-EPI 2021" in text and "EKFC" in text)
    check("kidney: one-number result gives a KDIGO G stage", "Stage G2" in text, text[:400])
    check("kidney: every eGFR carries the Ghana validation caveat",
          "validated against measured kidney function in Ghanaian adults" in text)
    check("kidney: one-number result converts the unit rather than dropping it",
          "88 micromol/L is 1 mg/dL" in text, text[text.find("creatinine of"):][:120])
    check("kidney: one-number result sells the test that fills the gap",
          "Albumin:Creatinine Ratio" in text)
    check("kidney: one-number result refuses to call a single value a diagnosis",
          "not a diagnosis" in text.lower() and "three months" in text.lower())
    check("kidney: no horizontal overflow on the result",
          page.evaluate("document.documentElement.scrollWidth <= 375"),
          page.evaluate("String(document.documentElement.scrollWidth)"))

    # The share card is drawn on a canvas on the device, so check it rendered
    # rather than trusting that the component mounted.
    card = page.query_selector("[data-testid='share-result'] canvas")
    check("kidney: the share card is drawn", card is not None)
    if card:
        card.scroll_into_view_if_needed()
        page.wait_for_timeout(700)
        card.screenshot(path=str(SHOTS / "04-kidney-08-share-card.png"))
        drawn = page.evaluate(
            "() => {const c=document.querySelector(\"[data-testid='share-result'] canvas\");"
            "if(!c) return 0; const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;"
            "let n=0; for(let i=0;i<d.length;i+=4000){if(d[i]!==0||d[i+1]!==0||d[i+2]!==0)n++;} return n;}"
        )
        check("kidney: the share card has pixels on it", drawn > 0, f"non-empty samples={drawn}")

    # --- run C: the hard stop, where the page computes nothing at all ---
    kidney_part_one(page, nephrology="Yes")
    page.wait_for_timeout(2200)
    text = page.inner_text("main")
    shot(page, "04-kidney-09-result-hard-stop")
    check("kidney: nephrology care ends the run without asking for numbers",
          "Do you have a recent kidney result?" not in text)
    check("kidney: the hard stop says so rather than going quiet",
          "no number from this page" in text.lower(), text[:200])
    check("kidney: the hard stop names the guideline it is following",
          "KDIGO" in text, text[:200])
    check("kidney: the hard stop sells nothing",
          "Nothing to book from this page today." in text)

    # ---------- prerendered head, which is what Meta reads ----------
    print("\nprerendered <head>")
    for slug in ["genotype-compatibility", "diabetes-risk", "heart-age", "bmi-waist", "kidney-check"]:
        html = pathlib.Path(f"dist/tools/{slug}/index.html").read_text()
        check(f"{slug}: prerendered title", "<title>" in html and "BetterHealth" in html)
        check(f"{slug}: has og:image", 'property="og:image"' in html)

    print("\nconsole")
    noisy = [e for e in console_errors if "favicon" not in e.lower()]
    check("no console errors", not noisy, "; ".join(noisy[:3]))

    print("\nnetwork containment")
    check("no write ever left for a real backend", not escaped, "; ".join(escaped[:3]))
    print(f"  note: {len(stubbed)} catalogue GET(s) stubbed offline "
          f"(the tools price their CTAs from the live catalogue by design)")

    ctx.close()
    browser.close()


with sync_playwright() as pw:
    run(pw)

print(f"\n{checks - len(failures)}/{checks} checks passed")
if failures:
    print("\nFAILED:")
    for f in failures:
        print(f"  - {f}")
    sys.exit(1)
print(f"screenshots: {SHOTS}")
