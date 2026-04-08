#!/usr/bin/env python3
"""Inspect login page to find correct field selectors."""
import asyncio
from playwright.async_api import async_playwright

APP_URL = "https://app.betterhealth.africa"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=3,
        )
        page = await context.new_page()
        print(f"Navigating to {APP_URL}...")
        await page.goto(APP_URL, wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(2000)
        print(f"URL: {page.url}")
        
        # Get all input elements
        inputs = await page.query_selector_all("input")
        print(f"Found {len(inputs)} input elements:")
        for i, inp in enumerate(inputs):
            t = await inp.get_attribute("type")
            n = await inp.get_attribute("name")
            ph = await inp.get_attribute("placeholder")
            id_ = await inp.get_attribute("id")
            print(f"  [{i}] type={t} name={n} id={id_} placeholder={ph}")
        
        # Get all buttons
        buttons = await page.query_selector_all("button")
        print(f"\nFound {len(buttons)} buttons:")
        for i, btn in enumerate(buttons):
            txt = await btn.inner_text()
            t = await btn.get_attribute("type")
            print(f"  [{i}] type={t} text={txt[:60]!r}")
        
        # Take a screenshot to see what we're dealing with
        await page.screenshot(path="/tmp/login-inspect.jpg", type="jpeg", quality=85)
        print("\nLogin page screenshot saved to /tmp/login-inspect.jpg")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
