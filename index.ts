const puppeteer = require('puppeteer');

const payloads = [
  '<img src=x onerror=alert(1)>',
  'asd',
  '<svg/onload=alert(1)>',
  '<svg onload=alert(1)>',
];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--no-sandbox`,
      `--disable-xss-auditor`,
      `--disable-web-security`,
    ]
  });

  for (let p of payloads) {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      (window as any).__crosser__ = 0;
      window.alert = (arg) => (window as any).__crosser__ = arg;
    });

    const url = 'http://localhost:4200/secrets/' + encodeURIComponent(p).replace(/\(/g, '%28').replace(/\)/g, '%29');
    console.log('testing: ' + url)
    await page.goto(url, {timeout: 10000, waitUntil: "networkidle0"});

    const output = await page.evaluate(() => {
      return (window as any).__crosser__;
    });

    console.log('Vulnerable:', !!output);
    await page.close();
  }

  await browser.close();
})();

