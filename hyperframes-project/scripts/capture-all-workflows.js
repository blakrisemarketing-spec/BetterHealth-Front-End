#!/usr/bin/env node

/**
 * Capture all mobile workflows from BetterHealth app
 * Usage: node scripts/capture-all-workflows.js
 */

import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  appUrl: 'https://app.betterhealth.africa',
  email: 'peter.dag@gmail.com',
  password: 'Pass.1234',
  viewport: { width: 375, height: 812 },
  screenshotDir: path.join(__dirname, '../assets/mobile-screens'),
  timeout: 30000,
  headless: false
};

if (!fs.existsSync(config.screenshotDir)) {
  fs.mkdirSync(config.screenshotDir, { recursive: true });
}

async function captureAllWorkflows() {
  const browser = await chromium.launch({ headless: config.headless });
  const context = await browser.newContext({
    viewport: config.viewport,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();
  let globalScreenshotCount = 8; // Start after login workflow

  const screenshot = async (name, description) => {
    const filename = `${String(globalScreenshotCount).padStart(2, '0')}-${name}.png`;
    const filepath = path.join(config.screenshotDir, filename);
    await page.screenshot({ path: filepath, fullPage: false });
    console.log(`✓ Screenshot ${globalScreenshotCount}: ${description}`);
    globalScreenshotCount++;
  };

  try {
    console.log('\n🎬 Capturing BetterHealth App Workflows\n');
    console.log(`📱 Viewport: ${config.viewport.width}x${config.viewport.height}`);
    console.log(`🔗 App URL: ${config.appUrl}\n`);

    // Login first
    console.log('🔓 Logging in...');
    await page.goto(config.appUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      await page.fill('input[type="email"]', config.email);
      await page.fill('input[type="password"]', config.password);

      const loginButton = await page.$('button[type="submit"]') ||
                         await page.$('button:has-text("Login")') ||
                         await page.$('button:has-text("Sign in")');

      if (loginButton) {
        await loginButton.click();
        await page.waitForTimeout(3000);
      }
    }

    // === WORKFLOW 2: DASHBOARD OVERVIEW ===
    console.log('\n📍 WORKFLOW 2: Dashboard Overview');
    await screenshot('dashboard-main', 'Main dashboard view');

    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollBy(0, 150));
    await screenshot('dashboard-cards', 'Dashboard with card details visible');

    await page.evaluate(() => window.scrollBy(0, 150));
    await screenshot('dashboard-bottom', 'Dashboard bottom section');

    // Try to find and interact with menu
    const menuBtn = await page.$('[role="button"][aria-label*="menu"], [role="button"][aria-label*="Menu"], [aria-haspopup="menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await page.waitForTimeout(800);
      await screenshot('menu-open', 'Main menu opened');
    }

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // === WORKFLOW 3: TEST RESULTS ===
    console.log('\n📍 WORKFLOW 3: Viewing Test Results');

    // Look for results/tests link
    let resultsFound = false;
    const selectors = [
      '[href*="result"]',
      '[href*="test"]',
      '[href*="tests"]',
      '[role="link"]:has-text("Results")',
      '[role="link"]:has-text("Test")',
      '[role="link"]:has-text("Tests")',
      'a:has-text("Results")',
      'a:has-text("Test Results")',
      '[data-testid*="result"]',
      '[data-testid*="test"]'
    ];

    for (const selector of selectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.click();
          await page.waitForTimeout(1500);
          resultsFound = true;
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    if (resultsFound) {
      await screenshot('results-list', 'Test results list');

      // Try to scroll and see more results
      await page.evaluate(() => window.scrollBy(0, 100));
      await page.waitForTimeout(300);
      await screenshot('results-list-scrolled', 'Results list scrolled');

      // Try clicking on a result
      const resultItems = await page.$$('[role="button"]:has-text("Result"), [role="link"]:has-text("Result"), .result-item, [data-testid*="result-item"]');
      if (resultItems.length > 0) {
        await resultItems[0].click();
        await page.waitForTimeout(1200);
        await screenshot('result-detail', 'Individual result detail view');

        // Scroll down to see more details
        await page.evaluate(() => window.scrollBy(0, 200));
        await page.waitForTimeout(300);
        await screenshot('result-detail-expanded', 'Result detail expanded view');
      }
    } else {
      console.log('⚠️  Could not find results section');
      await screenshot('no-results-section', 'Dashboard (results not found)');
    }

    // === WORKFLOW 4: APPOINTMENT BOOKING ===
    console.log('\n📍 WORKFLOW 4: Booking Appointments');

    // Navigate back to dashboard or find appointments
    await page.goto(config.appUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    let appointmentsFound = false;
    const appointmentSelectors = [
      '[href*="appointment"]',
      '[href*="book"]',
      '[href*="schedule"]',
      '[role="link"]:has-text("Appointments")',
      '[role="link"]:has-text("Book")',
      '[role="link"]:has-text("Schedule")',
      'a:has-text("Appointments")',
      'a:has-text("Book Appointment")',
      '[data-testid*="appointment"]'
    ];

    for (const selector of appointmentSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.click();
          await page.waitForTimeout(1500);
          appointmentsFound = true;
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    if (appointmentsFound) {
      await screenshot('appointments-list', 'Appointments or booking page');

      // Look for "Book" or "Schedule" button
      const bookButton = await page.$('[role="button"]:has-text("Book"), [role="button"]:has-text("Schedule"), [role="button"]:has-text("New"), button:has-text("Book"), button:has-text("Schedule")');

      if (bookButton) {
        await bookButton.click();
        await page.waitForTimeout(1200);
        await screenshot('appointment-form', 'Appointment booking form');

        // Try to scroll and see form fields
        await page.evaluate(() => window.scrollBy(0, 150));
        await page.waitForTimeout(300);
        await screenshot('appointment-form-fields', 'Booking form with all fields visible');
      } else {
        await screenshot('appointment-details', 'Appointment details view');
      }
    } else {
      console.log('⚠️  Could not find appointments section');
      await screenshot('no-appointments-section', 'Dashboard (appointments not found)');
    }

    // === WORKFLOW 5: PROFILE/SETTINGS ===
    console.log('\n📍 WORKFLOW 5: Profile & Settings');

    // Look for profile/settings
    const profileSelectors = [
      '[role="button"]:has-text("Profile")',
      '[role="button"]:has-text("Settings")',
      '[role="button"]:has-text("Account")',
      '[aria-label*="profile"]',
      '[aria-label*="settings"]',
      '[aria-label*="account"]',
      'a:has-text("Profile")',
      '[data-testid*="profile"]'
    ];

    let profileFound = false;
    for (const selector of profileSelectors) {
      try {
        const element = await page.$(selector);
        if (element && element.isVisible) {
          await element.click();
          await page.waitForTimeout(1000);
          profileFound = true;
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    if (profileFound) {
      await screenshot('profile-page', 'User profile page');

      await page.evaluate(() => window.scrollBy(0, 150));
      await page.waitForTimeout(300);
      await screenshot('profile-settings', 'Profile settings section');
    } else {
      console.log('⚠️  Could not find profile section');
    }

    console.log('\n✅ Screenshot capture completed!\n');
    console.log(`📸 Total screenshots saved: ${globalScreenshotCount - 8} new + 7 from login = ${globalScreenshotCount - 1} total\n`);
    console.log('Captured workflows:');
    console.log('  1. Patient Login (screenshots 01-07)');
    console.log('  2. Dashboard Overview (screenshots 08-10)');
    console.log('  3. Test Results (screenshots 11+)');
    console.log('  4. Appointments (screenshots 14+)');
    console.log('  5. Profile (screenshots 17+)\n');
    console.log('Next steps:');
    console.log('1. Create manifests for each workflow');
    console.log('2. Update asset paths in manifests');
    console.log('3. Build videos with hyperframes producer\n');

  } catch (error) {
    console.error('\n❌ Error during screenshot capture:', error.message);
    console.log('\nTroubleshooting:');
    console.log('- Check if app.betterhealth.africa is accessible');
    console.log('- Verify demo credentials: peter.dag@gmail.com / Pass.1234');
    console.log('- Check your internet connection\n');
  } finally {
    await context.close();
    await browser.close();
  }
}

captureAllWorkflows();
