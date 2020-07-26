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
if (!args.fullname) {
  console.error('Please provide your wished full name.');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({ headless: !args.browser });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800 });

  try {
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
    await page.waitForSelector('#user_name');
    await page.evaluate((fullname) => document.getElementById('user_name').value = fullname, args.fullname);
    await page.click('[type=submit]');

    await page.waitForResponse((response) => response.status() === 200);
    console.log(`Full name successfully changed to ${args.fullname}!`);
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
