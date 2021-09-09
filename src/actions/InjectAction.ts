import { CommandLineAction, CommandLineStringParameter } from '@rushstack/ts-command-line'
import { copyFolder, replaceFilesInDir } from '../utils/File'

export class InjectAction extends CommandLineAction {
  private _dir!: CommandLineStringParameter
  get dir(): string {
    // --dir is a required variable
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._dir.value!
  }

  private _cp?: CommandLineStringParameter
  get cp(): string | undefined {
    return this._cp?.value
  }

  protected onDefineParameters(): void {
    this._dir = this.defineStringParameter({
      description: 'Specify the location of your build folder',
      parameterLongName: '--dir',
      parameterShortName: '-d',
      argumentName: 'PATH_TO_BUILD_FOLDER',
      required: true
    })

    this._cp = this.defineStringParameter({
      description: 'Specify the location of the new folder if you would like to make a copy',
      parameterLongName: '--output',
      parameterShortName: '-o',
      argumentName: 'PATH_TO_OUTPUT_FOLDER'
    })
  }

  public constructor() {
    super({
      actionName: 'inject',
      summary: 'Inject environment variables into your React /build folder.',
      documentation: 'TODO'
    })
  }

  protected async onExecute(): Promise<void> {
    let folder = this.dir
    if (this.cp) {
      copyFolder(this.dir, this.cp)
      folder = this.cp
    }
    replaceFilesInDir(folder)
  }
}
