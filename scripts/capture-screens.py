#!/usr/bin/env python3
"""
Capture high-res screenshots of the BetterHealth patient app.
Target: Dashboard, Focus, Biomarkers screens at 390x844 (iPhone 14 viewport).
Output: 390x844 @ 3x DPR = 1170x2532 px — proper Retina resolution.
"""
import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright

EMAIL = "peter.dag@gmail.com"
PASSWORD = "Pass.1234"
APP_URL = "https://app.betterhealth.africa"

OUTPUT_DIR = Path("/Users/greatdamzi/projects/BetterHealth-Front-End/public/screenshots")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # iPhone 14 Pro dimensions @ 3x DPR for crisp Retina output
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=3,
            user_agent=(
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
                "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            ),
        )
        page = await context.new_page()

        print(f"Navigating to {APP_URL}/login ...")
        await page.goto(f"{APP_URL}/login", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(2000)

        # --- Login with correct field IDs ---
        print("Filling login form...")
        await page.fill("#login-email", EMAIL)
        await page.fill("#login-password", PASSWORD)
        print("Submitting login...")
        await page.click('button[type="submit"]')
        
        # Wait for navigation away from login page
        try:
            await page.wait_for_url(lambda url: "/login" not in url, timeout=30000)
            print(f"Logged in! URL: {page.url}")
        except Exception:
            print(f"Timeout waiting for post-login nav. URL: {page.url}")
        
        await page.wait_for_load_state("networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        
        print(f"Post-login URL: {page.url}")
        
        # --- Discover available nav links ---
        links = await page.query_selector_all("a, nav button, [role='tab']")
        print("Nav links found:")
        for l in links[:20]:
            href = await l.get_attribute("href")
            txt = (await l.inner_text()).strip()[:50]
            if txt or href:
                print(f"  href={href!r} text={txt!r}")

        # --- Screenshot 1: Dashboard / Health Score ---
        print("\nCapturing Dashboard / Health Score...")
        await page.wait_for_timeout(2000)
        await page.screenshot(
            path=str(OUTPUT_DIR / "mobile-healthscore.jpg"),
            full_page=False, type="jpeg", quality=95
        )
        print("  → mobile-healthscore.jpg saved")

        # --- Screenshot 2: Focus ---
        print("Capturing Today's Focus...")
        captured_focus = False
        for selector in [
            'a:has-text("Focus")',
            'a:has-text("Today")',
            'a[href*="focus"]',
            'button:has-text("Focus")',
            '[role="tab"]:has-text("Focus")',
        ]:
            try:
                el = page.locator(selector).first
                if await el.count() > 0:
                    await el.click()
                    await page.wait_for_load_state("networkidle", timeout=20000)
                    await page.wait_for_timeout(2000)
                    captured_focus = True
                    print(f"  Navigated via selector: {selector}")
                    break
            except Exception:
                pass
        
        if not captured_focus:
            for path in ["/focus", "/today", "/home", "/dashboard"]:
                try:
                    await page.goto(f"{APP_URL}{path}", wait_until="networkidle", timeout=20000)
                    await page.wait_for_timeout(2000)
                    if page.url != f"{APP_URL}/login":
                        print(f"  Navigated to {path}")
                        break
                except Exception:
                    pass
        
        await page.screenshot(
            path=str(OUTPUT_DIR / "mobile-focus.jpg"),
            full_page=False, type="jpeg", quality=95
        )
        print("  → mobile-focus.jpg saved")

        # --- Screenshot 3: Biomarkers ---
        print("Capturing Biomarkers...")
        captured_bio = False
        for selector in [
            'a:has-text("Biomarker")',
            'a:has-text("Results")',
            'a:has-text("Lab")',
            'a[href*="biomarker"]',
            'a[href*="result"]',
            'button:has-text("Biomarker")',
            '[role="tab"]:has-text("Biomarker")',
        ]:
            try:
                el = page.locator(selector).first
                if await el.count() > 0:
                    await el.click()
                    await page.wait_for_load_state("networkidle", timeout=20000)
                    await page.wait_for_timeout(2000)
                    captured_bio = True
                    print(f"  Navigated via selector: {selector}")
                    break
            except Exception:
                pass
        
        if not captured_bio:
            for path in ["/biomarkers", "/biomarker", "/results", "/lab"]:
                try:
                    await page.goto(f"{APP_URL}{path}", wait_until="networkidle", timeout=20000)
                    await page.wait_for_timeout(2000)
                    if page.url != f"{APP_URL}/login":
                        print(f"  Navigated to {path}")
                        break
                except Exception:
                    pass

        await page.screenshot(
            path=str(OUTPUT_DIR / "mobile-biomarker.jpg"),
            full_page=False, type="jpeg", quality=95
        )
        print("  → mobile-biomarker.jpg saved")

        # --- Bonus: capture a full-page version for reference ---
        await page.screenshot(
            path=str(OUTPUT_DIR / "mobile-biomarker-full.jpg"),
            full_page=True, type="jpeg", quality=90
        )
        
        await browser.close()
        print("\nAll screenshots captured successfully.")
        
        # Print file sizes
        for fname in ["mobile-healthscore.jpg", "mobile-focus.jpg", "mobile-biomarker.jpg"]:
            fpath = OUTPUT_DIR / fname
            size = fpath.stat().st_size
            print(f"  {fname}: {size:,} bytes")

if __name__ == "__main__":
    asyncio.run(main())
