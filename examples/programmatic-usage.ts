import { PAYLOADS } from '../src/lib/payloads'
import { reflectedXssScan } from '../src/lib/reflected-xss'
import { storedXssScan } from '../src/lib/stored-xss'

(async () => {
  // reflected
  // tslint:disable-next-line:no-console
  console.log('true reflected')
  await (async () => {
    const url = 'http://localhost:4200/vuln/'
    await reflectedXssScan(url, PAYLOADS)
  })()

  // stored
  // tslint:disable-next-line:no-console
  console.log('true stored')
  await (async () => {
    const url = 'http://localhost:4200/stored1/'
    const url2 = 'http://localhost:4200/stored2/'
    const PRE = 'document.querySelector("#vuln").value = `<PAYLOAD>`; document.querySelector("#button").click();'
    const POST = 'document.querySelector("#button").click();'
    await storedXssScan(url, url2, PRE, POST, PAYLOADS)
  })()

  // stored eval
  // tslint:disable-next-line:no-console
  console.log('true stored eval')
  await (async () => {
    const url = 'http://localhost:4200/stored1/'
    const url2 = 'http://localhost:4200/stored3/'
    const PRE = 'document.querySelector("#vuln").value = `<PAYLOAD>`; document.querySelector("#button").click();'
    const POST = 'document.querySelector("#button").click();'
    await storedXssScan(url, url2, PRE, POST, PAYLOADS)
  })()
})()
