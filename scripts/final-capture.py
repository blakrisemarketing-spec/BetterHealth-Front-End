#!/usr/bin/env python3
"""
Final high-quality screenshot capture for BetterHealth landing page.
Maps:
  mobile-healthscore.jpg → /biomarkers (YOUR HEALTH SCORE 83/100)
  mobile-focus.jpg       → / root dashboard (Good morning, Kofi + overview)
  mobile-biomarker.jpg   → /biomarkers scrolled / detail view

All at 390x844 @ 3x = 1170x2532px Retina quality.
"""
import asyncio
from playwright.async_api import async_playwright

EMAIL = "peter.dag@gmail.com"
PASSWORD = "Pass.1234"
APP_URL = "https://app.betterhealth.africa"
OUT = "/Users/greatdamzi/projects/BetterHealth-Front-End/public/screenshots"

async def login(page):
    await page.goto(f"{APP_URL}/login", wait_until="networkidle", timeout=60000)
    await page.fill("#login-email", EMAIL)
    await page.fill("#login-password", PASSWORD)
    await page.click('button[type="submit"]')
    await page.wait_for_url(lambda url: "/login" not in url, timeout=30000)
    await page.wait_for_load_state("networkidle")
    await page.wait_for_timeout(4000)
    print(f"Logged in. URL: {page.url}")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=3,
            user_agent=(
                "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
                "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            ),
        )
        page = await context.new_page()
        await login(page)

        # -------------------------------------------------------
        # Screenshot 1: /biomarkers — Health Score view
        # This shows "YOUR HEALTH SCORE 83/100" with organ systems
        # -------------------------------------------------------
        print("\n1. Capturing Health Score (/biomarkers)...")
        await page.goto(f"{APP_URL}/biomarkers", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        # Scroll to top to show health score prominently
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(1000)
        await page.screenshot(
            path=f"{OUT}/mobile-healthscore.jpg",
            full_page=False, type="jpeg", quality=95
        )
        print(f"  → mobile-healthscore.jpg (URL: {page.url})")

        # -------------------------------------------------------
        # Screenshot 2: / root — Dashboard / Today's overview
        # Shows "Good morning, Kofi", biomarker stats, daily insights
        # -------------------------------------------------------
        print("\n2. Capturing Dashboard / Today's view (root /)...")
        await page.goto(APP_URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(1000)
        await page.screenshot(
            path=f"{OUT}/mobile-focus.jpg",
            full_page=False, type="jpeg", quality=95
        )
        print(f"  → mobile-focus.jpg (URL: {page.url})")

        # -------------------------------------------------------
        # Screenshot 3: /biomarkers scrolled to show individual
        # biomarker list (BUN, Creatinine, etc.)
        # -------------------------------------------------------
        print("\n3. Capturing Biomarker detail list (/biomarkers scrolled)...")
        await page.goto(f"{APP_URL}/biomarkers", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        # Scroll down to show individual biomarker rows
        await page.evaluate("window.scrollTo(0, 600)")
        await page.wait_for_timeout(1500)
        await page.screenshot(
            path=f"{OUT}/mobile-biomarker.jpg",
            full_page=False, type="jpeg", quality=95
        )
        print(f"  → mobile-biomarker.jpg (URL: {page.url})")

        # -------------------------------------------------------
        # Bonus: /dashboard full-page for reference
        # -------------------------------------------------------
        print("\n4. Capturing /dashboard for reference...")
        await page.goto(f"{APP_URL}/dashboard", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(1000)
        await page.screenshot(
            path=f"{OUT}/mobile-dashboard-ref.jpg",
            full_page=False, type="jpeg", quality=90
        )
        print(f"  → mobile-dashboard-ref.jpg (URL: {page.url})")

        await browser.close()

        import os
        print("\n--- File sizes ---")
        for fname in ["mobile-healthscore.jpg", "mobile-focus.jpg", "mobile-biomarker.jpg", "mobile-dashboard-ref.jpg"]:
            fpath = f"{OUT}/{fname}"
            size = os.path.getsize(fpath)
            print(f"  {fname}: {size:,} bytes")

if __name__ == "__main__":
    asyncio.run(main())
