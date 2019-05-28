import ora = require('ora')
import puppeteer = require('puppeteer')
import { IReflectedFlags } from '../commands/reflected'
import { encodePayload } from './utils'

export async function reflectedXssScan(opts: IReflectedFlags, payloads: string[]) {
  const { url } = opts
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
    const index = payloads.indexOf(p)
    const page = await browser.newPage()
    await page.setBypassCSP(true)
    await page.evaluateOnNewDocument(() => {
      (window as any).__crosser__ = 0
      window.alert = (arg) => (window as any).__crosser__ = arg
    })

    const fullUrl = url.indexOf('PAYLOAD') >= 0 ? url.replace(/PAYLOAD/, encodePayload(p)) : url + encodePayload(p)
    spinner.start(`[${index + 1}/${payloads.length}] Testing: ${fullUrl}`)
    await page.goto(fullUrl, {timeout: 10000, waitUntil: 'networkidle0'})

    const output = await page.evaluate(() => {
      return (window as any).__crosser__
    })

    const vulnerable = output === 1
    if (vulnerable) {
      spinner.fail('Vulnerable    : ' + fullUrl)
    } else {
      spinner.succeed('Not vulnerable: ' + fullUrl)
    }

    await page.close()
  }

  spinner.start('Closing Chromium')
  await browser.close()
  spinner.succeed('Done')
  spinner.stop()
}
