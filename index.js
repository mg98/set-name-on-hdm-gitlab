const puppeteer = require('puppeteer');
const args = require('yargs').argv;
require('dotenv').config();

const username = process.env.username || args.username;
const password = process.env.password || args.password;
const fullname = process.env.fullname || args.fullname;

// Validate parameters
if (!username) {
  console.error('Please provide your username.');
  process.exit(1);
}
if (!password) {
  console.error('Please provide your password.');
  process.exit(1);
}
if (!fullname) {
  console.error('Please provide your wished full name.');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800 });

  try {
    // Login
    await page.goto('https://gitlab.mi.hdm-stuttgart.de');
    await page.type('#username', username);
    await page.type('#password', password);
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
    await page.evaluate((value) => document.getElementById('user_name').value = value, fullname);
    await page.click('[type=submit]');

    await page.waitForResponse((response) => response.status() === 200);
    console.log(`Full name successfully changed to ${fullname}!`);
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
