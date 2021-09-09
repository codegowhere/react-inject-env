import { CommandLineParser } from '@rushstack/ts-command-line'
import { BuildAction } from './actions/BuildAction'
import { InjectAction } from './actions/InjectAction'
import { Cfg } from './app/Config'

export class InjectEnvCommandLine extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: Cfg.NAME,
      toolDescription: 'This tool is used to inject environment variables into your react /build folder.'
    })

    this.addAction(new BuildAction())
    this.addAction(new InjectAction())
  }

  protected onDefineParameters(): void {
    // abstract
    // this._verbose = this.defineFlagParameter({
    //   parameterLongName: '--verbose',
    //   parameterShortName: '-v',
    //   description: 'Show extra logging detail'
    // })
  }

  protected onExecute(): Promise<void> {
    return super.onExecute()
  }
}
