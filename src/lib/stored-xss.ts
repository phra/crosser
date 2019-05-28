import ora = require('ora')
import puppeteer = require('puppeteer')
import { IStoredXssFlags } from '../commands/stored'
import { encodePayloadStored } from './utils'

export async function storedXssScan(opts: IStoredXssFlags, payloads: string[]) {
  const { url1, url2, pre, post } = opts
  const spinner = ora()
  spinner.start('Launching Chromium')
  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    args: [
      `--no-sandbox`,
      `--disable-xss-auditor`,
      `--disable-web-security`,
      `--incognito`,
    ],
  })

  spinner.succeed('Launched Chromium')

  for (const p of payloads) {
    const page = await browser.newPage()
    const index = payloads.indexOf(p)
    await page.setBypassCSP(true)
    await page.evaluateOnNewDocument(() => {
      (window as any).__crosser__ = 0
      window.alert = (arg) => (window as any).__crosser__ = arg
    })

    spinner.start(`[${index + 1}/${payloads.length}] Testing: ${p}`)
    await page.goto(url1, { timeout: 10000, waitUntil: 'networkidle0' })

    await page.evaluate(pre.replace(/\<PAYLOAD\>/, encodePayloadStored(p)))

    await page.waitFor(1000)

    await page.goto(url2, { timeout: 10000, waitUntil: 'networkidle0' })

    await page.evaluate(post)

    await page.waitFor(1000)

    const output = await page.evaluate(() => {
      return (window as any).__crosser__
    })

    const vulnerable = output === 1

    if (vulnerable) {
      spinner.fail('Vulnerable    : ' + p)
    } else {
      spinner.succeed('Not vulnerable: ' + p)
    }

    await page.close()
  }

  spinner.start('Closing Chromium')
  await browser.close()
  spinner.succeed('Done')
  spinner.stop()
}
