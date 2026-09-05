#!/usr/bin/env python3
"""Smoke test for the four /tools/ calculators against a built bundle.

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
    check("index lists four tools",
          all(t in body for t in ["Genotype", "Diabetes Risk", "Heart Age", "BMI and Waist"]))
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

    # ---------- prerendered head, which is what Meta reads ----------
    print("\nprerendered <head>")
    for slug in ["genotype-compatibility", "diabetes-risk", "heart-age", "bmi-waist"]:
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
