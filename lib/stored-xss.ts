import puppeteer = require('puppeteer')
import { encodePayload, encodePayloadStored } from './utils'

export async function storedXssScan(url: string, url2: string, pre: string, post: string, payloads: string[]) {
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

    // tslint:disable-next-line:no-console
    console.log('testing: ' + url)
    await page.goto(url, {timeout: 10000, waitUntil: 'networkidle0'})

    // tslint:disable-next-line:no-console
    console.log('evaluating: ' + pre.replace(/\<PAYLOAD\>/, encodePayloadStored(p)))

    await page.evaluate(pre.replace(/\<PAYLOAD\>/, encodePayloadStored(p)))

    // tslint:disable-next-line:no-console
    console.log('navigating to: ' + url)
    await page.goto(url2, {timeout: 10000, waitUntil: 'networkidle0'})

    // tslint:disable-next-line:no-console
    console.log('evaluating: ' + post.replace(/\<PAYLOAD\>/, encodePayloadStored(p)))
    await page.evaluate(post)

    await page.waitFor(1000)

    const output = await page.evaluate(() => {
      return (window as any).__crosser__
    })

    // tslint:disable-next-line:no-console
    console.log('Vulnerable:', output === 1, p)
    await page.close()
  }

  await browser.close()
}
