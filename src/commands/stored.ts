import {Command, flags} from '@oclif/command'

import { PAYLOADS } from '../lib/payloads'
import { storedXssScan } from '../lib/stored-xss'

function die(msg: string) {
  // tslint:disable-next-line:no-console
  console.error(msg)
  process.exit(1)
  return void 0 as any
}

export default class Stored extends Command {
  public static description = 'checks for stored xss'

  public static examples = [
    // tslint:disable-next-line:max-line-length
    `$ crosser stored -u "http://localhost:4200/stored1/" -x "http://localhost:4200/stored2/" --pre "document.querySelector('#vuln').value = \`<PAYLOAD>\`; document.querySelector('#button').click();" --post "document.querySelector('#button').click();"
`,
  ]

  public static flags = {
    help: flags.help({char: 'h'}),
    url1: flags.string({char: 'u', description: 'url to connect'}),
    url2: flags.string({char: 'x', description: 'url to connect'}),
    pre: flags.string({char: 'b', description: 'url to connect'}),
    post: flags.string({char: 'a', description: 'url to connect'}),
  }

  public static args = []

  public async run() {
    const {args, flags: parsedFlags} = this.parse(Stored)

    const url1 = parsedFlags.url1 || die('missing url')
    const url2 = parsedFlags.url2 || die('missing url')
    const pre = parsedFlags.pre || ''
    const post = parsedFlags.post || ''
    await storedXssScan(url1, url2, pre, post, PAYLOADS)
  }
}
