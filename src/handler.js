const chromium = require('chrome-aws-lambda');
const runScript = require('./script');

module.exports.default = async (event) => {
  try {
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    await runScript(browser, process.env.hdm_user, process.env.password, process.env.fullname);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Full name successfully changed to ${process.env.fullname}!`,
        },
        null,
        2,
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: err.message,
        },
        null,
        2,
      ),
    };
  }
};
