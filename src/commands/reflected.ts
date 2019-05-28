import {Command, flags} from '@oclif/command'

import { PAYLOADS } from '../lib/payloads'
import { reflectedXssScan } from '../lib/reflected-xss'

function die(msg: string) {
  // tslint:disable-next-line:no-console
  console.error(msg)
  process.exit(1)
  return void 0 as any
}

export default class Reflected extends Command {
  public static description = 'checks for reflected xss'

  public static examples = [
    `$ crosser reflected -u "http://localhost:4200/vuln/"
`,
  ]

  public static flags = {
    help: flags.help({char: 'h'}),
    url: flags.string({char: 'u', description: 'url to connect'}),
  }

  public static args = []

  public async run() {
    const {args, flags: parsedFlags} = this.parse(Reflected)

    const url = parsedFlags.url || die('missing url')
    await reflectedXssScan(url, PAYLOADS)
  }
}
