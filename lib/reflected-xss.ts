import puppeteer = require('puppeteer')
import { encodePayload } from './utils'

export async function reflectedXssScan(url: string, payloads: string[]) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      `--no-sandbox`,
      `--disable-xss-auditor`,
      `--disable-web-security`,
      `--incognito`,
    ],
  })

  for (const p of payloads) {
    const page = await browser.newPage()
    await page.evaluateOnNewDocument(() => {
      (window as any).__crosser__ = 0
      window.alert = (arg) => (window as any).__crosser__ = arg
    })

    const fullUrl = url + encodePayload(p)
    // tslint:disable-next-line:no-console
    console.log('testing: ' + fullUrl)
    await page.goto(fullUrl, {timeout: 10000, waitUntil: 'networkidle0'})

    const output = await page.evaluate(() => {
      return (window as any).__crosser__
    })

    // tslint:disable-next-line:no-console
    console.log('Vulnerable:', output === 1, p)
    await page.close()
  }

  await browser.close()
}
