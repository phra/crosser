import {Command, flags} from '@oclif/command'

import { PAYLOADS } from '../lib/payloads'
import { reflectedXssScan } from '../lib/reflected-xss'

export interface IReflectedFlags {
  help: void
  url: string
}

export default class Reflected extends Command {
  public static description = 'checks for reflected xss'

  public static examples = [
    `$ crosser reflected -u "http://localhost:4200/vuln/"
`,
  ]

  public static flags = {
    help: flags.help({char: 'h'}),
    url: flags.string({char: 'u', description: 'url to connect', required: true}),
  }

  public static args = []

  public async run() {
    const {args, flags: parsedFlags} = this.parse(Reflected)
    await reflectedXssScan(parsedFlags, PAYLOADS)
  }
}
