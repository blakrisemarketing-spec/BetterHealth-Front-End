#!/usr/bin/env python3
"""Deep exploration - screenshot every route and scroll to see full UI."""
import asyncio
from playwright.async_api import async_playwright

EMAIL = "peter.dag@gmail.com"
PASSWORD = "Pass.1234"
APP_URL = "https://app.betterhealth.africa"
OUT = "/Users/greatdamzi/projects/BetterHealth-Front-End/public/screenshots"

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
        await page.wait_for_timeout(4000)  # extra wait for SPA hydration
        print(f"Logged in. URL: {page.url}")

        # Full page screenshot of root to see everything
        await page.screenshot(path=f"{OUT}/debug-root-full.jpg", full_page=True, type="jpeg", quality=85)
        print("Full page root screenshot saved.")

        # Get all HTML to inspect structure
        html_excerpt = await page.evaluate("document.body.innerHTML.substring(0, 5000)")
        print("\n--- HTML excerpt ---")
        print(html_excerpt)

        # Check bottom of page (likely bottom nav)
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=f"{OUT}/debug-bottom.jpg", full_page=False, type="jpeg", quality=85)

        # Try common mobile app routes
        routes_to_try = [
            "/dashboard", "/home", "/health", "/health-score",
            "/today", "/focus", "/actions", "/plan", "/insights",
            "/biomarkers", "/results", "/labs", "/tests", "/reports",
            "/profile", "/settings"
        ]
        
        accessible = []
        for route in routes_to_try:
            await page.goto(f"{APP_URL}{route}", wait_until="networkidle", timeout=20000)
            await page.wait_for_timeout(1000)
            if "/login" not in page.url and "404" not in (await page.title()).lower():
                title = await page.title()
                h1s = await page.eval_on_selector_all("h1, h2", "els => els.map(e => e.innerText.trim()).filter(t => t).slice(0, 3)")
                accessible.append((route, page.url, title, h1s))
                print(f"  ✓ {route} → {page.url} | {title} | {h1s}")
            else:
                print(f"  ✗ {route} → redirected to login or 404")

        print(f"\nAccessible routes: {[r[0] for r in accessible]}")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
