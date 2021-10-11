import { CommandLineParser } from '@rushstack/ts-command-line'
import { BuildAction } from './actions/BuildAction'
import { InjectAction } from './actions/InjectAction'
import { Cfg } from './app/Config'
import { SetAction } from './actions/SetAction'

export class InjectEnvCommandLine extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: Cfg.NAME,
      toolDescription: 'This tool is used to inject environment variables into your react /build folder.',
    })

    this.addAction(new BuildAction())
    this.addAction(new InjectAction())
    this.addAction(new SetAction())
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onDefineParameters(): void {}

  protected onExecute(): Promise<void> {
    return super.onExecute()
  }
}
