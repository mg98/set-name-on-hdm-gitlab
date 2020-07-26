module.exports = async (browser, username, password, fullname) => {
  const page = await browser.newPage();

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
  } finally {
    await browser.close();
  }
};
