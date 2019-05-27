import { PAYLOADS } from './lib/payloads'
import { reflectedXssScan } from './lib/reflected-xss'

(async () => {
  const url = 'http://localhost:4200/vuln/'
  await reflectedXssScan(url, PAYLOADS)
})()
