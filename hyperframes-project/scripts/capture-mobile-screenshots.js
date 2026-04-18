#!/usr/bin/env node

/**
 * Capture mobile screenshots of BetterHealth app
 * Usage: node scripts/capture-mobile-screenshots.js
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
  headless: false // Set to true for CI/CD
};

// Ensure screenshot directory exists
if (!fs.existsSync(config.screenshotDir)) {
  fs.mkdirSync(config.screenshotDir, { recursive: true });
  console.log(`✓ Created screenshot directory: ${config.screenshotDir}`);
}

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: config.headless });
  const context = await browser.newContext({
    viewport: config.viewport,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();
  let screenshotCount = 1;

  const screenshot = async (name, description) => {
    const filename = `${String(screenshotCount).padStart(2, '0')}-${name}.png`;
    const filepath = path.join(config.screenshotDir, filename);
    await page.screenshot({ path: filepath, fullPage: false });
    console.log(`✓ Screenshot ${screenshotCount}: ${description}`);
    screenshotCount++;
  };

  try {
    console.log('\n🎬 Starting BetterHealth App Screenshot Capture\n');
    console.log(`📱 Viewport: ${config.viewport.width}x${config.viewport.height}`);
    console.log(`🔗 App URL: ${config.appUrl}\n`);

    // Step 1: Navigate to app
    console.log('📍 Step 1: Navigating to app...');
    await page.goto(config.appUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await screenshot('splash', 'App splash/landing screen');

    // Step 2: Capture login form
    console.log('\n📍 Step 2: Capturing login form...');
    await screenshot('login-form', 'Login form with email and password fields');

    // Step 3: Login process
    console.log('\n📍 Step 3: Logging in...');
    await page.fill('input[type="email"]', config.email);
    await page.waitForTimeout(800);
    await screenshot('login-email-filled', 'Login form with email filled');

    await page.fill('input[type="password"]', config.password);
    await page.waitForTimeout(800);
    await screenshot('login-password-filled', 'Login form with credentials filled');

    // Click login button
    const loginButton = await page.$('button[type="submit"]') ||
                       await page.$('button:has-text("Login")') ||
                       await page.$('button:has-text("Sign in")') ||
                       await page.$('[role="button"]:has-text("Login")');

    if (loginButton) {
      await loginButton.click();
      console.log('🔓 Clicked login button...');
      await page.waitForTimeout(2000);
      await screenshot('loading', 'Loading/authenticating...');

      // Wait for dashboard to load
      await page.waitForTimeout(3000);
      await screenshot('dashboard', 'Main dashboard after login');

      // Step 4: Explore dashboard
      console.log('\n📍 Step 4: Exploring dashboard...');

      // Scroll down to see more content
      await page.evaluate(() => window.scrollBy(0, 200));
      await page.waitForTimeout(500);
      await screenshot('dashboard-scrolled', 'Dashboard - scrolled view');

      // Step 5: Try to navigate to results (if available)
      console.log('\n📍 Step 5: Looking for results/menu...');
      try {
        const resultLink = await page.$('[href*="result"]') ||
                          await page.$('[href*="test"]') ||
                          await page.$('[role="link"]:has-text("Results")') ||
                          await page.$('[role="link"]:has-text("Test")');

        if (resultLink) {
          await resultLink.click();
          await page.waitForTimeout(2000);
          await screenshot('results-list', 'Test results list');

          // Try clicking on first result if available
          const firstResult = await page.$('[role="button"]:has-text("Result")') ||
                             await page.$('[role="link"]:has-text("Result")') ||
                             await page.$('.result-card, .test-card, [data-testid*="result"], [data-testid*="test"]');

          if (firstResult) {
            await firstResult.click();
            await page.waitForTimeout(1500);
            await screenshot('result-detail', 'Test result detail view');
          }
        }
      } catch (e) {
        console.log('⚠️  Could not navigate to results');
      }

      // Step 6: Profile/Settings
      console.log('\n📍 Step 6: Looking for profile/settings...');
      try {
        const profileButton = await page.$('[role="button"]:has-text("Profile")') ||
                             await page.$('[role="button"]:has-text("Settings")') ||
                             await page.$('[role="button"]:has-text("Account")') ||
                             await page.$('[aria-label*="profile"], [aria-label*="settings"], [aria-label*="menu"]');

        if (profileButton) {
          await profileButton.click();
          await page.waitForTimeout(1000);
          await screenshot('profile-menu', 'Profile/settings menu');
        }
      } catch (e) {
        console.log('⚠️  Could not navigate to profile');
      }

    } else {
      console.log('⚠️  Could not find login button, attempting alternative methods...');
      // Try Enter key
      await page.press('input[type="password"]', 'Enter');
      await page.waitForTimeout(3000);
      await screenshot('dashboard-alternative', 'Dashboard (alternative login)');
    }

    console.log('\n✅ Screenshot capture completed!\n');
    console.log(`📸 Saved ${screenshotCount - 1} screenshots to: ${config.screenshotDir}\n`);
    console.log('Next steps:');
    console.log('1. Review screenshots in the assets/mobile-screens directory');
    console.log('2. Update manifests/patient-login-manifest.json with correct asset paths');
    console.log('3. Create additional manifests for other workflows');
    console.log('4. Build videos with hyperframes producer\n');

  } catch (error) {
    console.error('\n❌ Error during screenshot capture:', error.message);
    console.log('\nTroubleshooting:');
    console.log('- Check if app.betterhealth.africa is accessible');
    console.log('- Verify demo credentials: peter.dag@gmail.com / Pass.1234');
    console.log('- Check your internet connection');
    console.log('- Try running with headless: false to see browser interactions\n');
  } finally {
    await context.close();
    await browser.close();
  }
}

captureScreenshots();
