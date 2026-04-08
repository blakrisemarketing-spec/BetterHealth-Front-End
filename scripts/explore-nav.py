#!/usr/bin/env python3
"""Explore app navigation after login to find correct URLs for each screen."""
import asyncio
from playwright.async_api import async_playwright

EMAIL = "peter.dag@gmail.com"
PASSWORD = "Pass.1234"
APP_URL = "https://app.betterhealth.africa"
OUT = "/Users/greatdamzi/projects/BetterHealth-Front-End/public/screenshots"

async def screenshot_url(page, url, filename):
    await page.goto(url, wait_until="networkidle", timeout=30000)
    await page.wait_for_timeout(2000)
    await page.screenshot(path=f"{OUT}/{filename}", full_page=False, type="jpeg", quality=95)
    print(f"  Saved {filename} from {page.url}")

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

        # Login
        await page.goto(f"{APP_URL}/login", wait_until="networkidle", timeout=60000)
        await page.fill("#login-email", EMAIL)
        await page.fill("#login-password", PASSWORD)
        await page.click('button[type="submit"]')
        await page.wait_for_url(lambda url: "/login" not in url, timeout=30000)
        await page.wait_for_load_state("networkidle")
        await page.wait_for_timeout(3000)
        print(f"Logged in. URL: {page.url}")

        # Screenshot root (health score / dashboard)
        await page.screenshot(path=f"{OUT}/mobile-healthscore.jpg", full_page=False, type="jpeg", quality=95)
        print(f"Root screenshot saved. URL: {page.url}")

        # Explore navigation - find all links & their text
        links = await page.eval_on_selector_all("a, button", """
            els => els.map(el => ({
                tag: el.tagName,
                href: el.href || el.getAttribute('href'),
                text: el.innerText.trim().substring(0, 80),
                class: el.className.substring(0, 80)
            })).filter(x => x.text || x.href)
        """)
        print("\nAll clickable elements:")
        for l in links:
            print(f"  [{l['tag']}] href={l['href']!r} text={l['text']!r}")

        # Try to find & screenshot focus/today screen
        print("\n--- Trying to find Focus screen ---")
        for text in ["Focus", "Today", "Actions", "Plan", "Recommendations"]:
            els = page.locator(f'a:has-text("{text}"), button:has-text("{text}")')
            count = await els.count()
            if count > 0:
                print(f"Found element with text '{text}', clicking...")
                await els.first.click()
                await page.wait_for_load_state("networkidle", timeout=20000)
                await page.wait_for_timeout(2000)
                print(f"  URL after click: {page.url}")
                await page.screenshot(path=f"{OUT}/mobile-focus.jpg", full_page=False, type="jpeg", quality=95)
                print(f"  Focus screenshot saved.")
                break
        
        # Try to find biomarkers screen
        print("\n--- Trying to find Biomarkers screen ---")
        # Go back home first
        await page.goto(APP_URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(2000)
        
        for text in ["Biomarker", "Results", "Lab", "Tests", "Blood"]:
            els = page.locator(f'a:has-text("{text}"), button:has-text("{text}")')
            count = await els.count()
            if count > 0:
                print(f"Found element with text '{text}', clicking...")
                await els.first.click()
                await page.wait_for_load_state("networkidle", timeout=20000)
                await page.wait_for_timeout(2000)
                print(f"  URL after click: {page.url}")
                await page.screenshot(path=f"{OUT}/mobile-biomarker.jpg", full_page=False, type="jpeg", quality=95)
                print(f"  Biomarker screenshot saved.")
                break

        await browser.close()
        print("\nDone!")

if __name__ == "__main__":
    asyncio.run(main())
