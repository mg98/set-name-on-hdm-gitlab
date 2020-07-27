require('dotenv').config();
const args = require('yargs').argv;
const puppeteer = require('puppeteer');
const runScript = require('./script');

const username = process.env.hdm_user || args.username;
const password = (process.env.password || args.password).replace(/\\/g, '');
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
  try {
    const headless = args.browser === undefined ? true : !args.browser;
    const browser = await puppeteer.launch({
      headless,
      defaultViewport: { width: 1280, height: 1800 },
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    await runScript(browser, username, password, fullname);
    console.log(`Full name successfully changed to ${process.env.fullname}!`);
  } catch (err) {
    console.error(err);
  }
})();
