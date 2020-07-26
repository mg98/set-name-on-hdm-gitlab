const puppeteer = require('puppeteer');
const args = require('yargs').argv;

// Validate CLI arguments
if (!args.username) {
  console.error('Please provide your username.');
  process.exit(1);
}
if (!args.password) {
  console.error('Please provide your password.');
  process.exit(1);
}
if (!args.username) {
  console.error('Please provide your wished full name.');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage({ headless: !args.browser });
    await page.setViewport({ width: 1280, height: 1800 });

    // Login
    await page.goto('https://gitlab.mi.hdm-stuttgart.de');
    await page.type('#username', args.username);
    await page.type('#password', args.password);
    await page.click('[type=submit]');

    // Go to profil edit page
    await page.waitForResponse((response) => response.status() === 200);
    await page.goto('https://gitlab.mi.hdm-stuttgart.de/profile');

    // Check if login truely succeed
    if (page.url() === 'https://gitlab.mi.hdm-stuttgart.de/users/sign_in') {
      throw new Error('Invalid credentials!');
    }

    // Set new full name and update profile
    await page.evaluate(() => document.getElementById('user_name').value = args.fullname);
    await page.click('[type=submit]');

    await page.waitForResponse((response) => response.status() === 200);
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
