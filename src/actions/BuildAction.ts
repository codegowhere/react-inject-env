import {
  CommandLineAction,
  CommandLineChoiceParameter,
  CommandLineRemainder,
  CommandLineStringListParameter, CommandLineStringParameter
} from "@rushstack/ts-command-line";
import { retrieveDotEnvCfg, retrieveReactEnvCfg } from '../utils/Utils'
import shell from 'shelljs'
import { Obj } from '@aelesia/commons'
import { parseBoolean, parseCommand } from '../utils/Parse'
import { formatEnvToCliString } from '../utils/Format'

export class BuildAction extends CommandLineAction {
  private _userCommand!: CommandLineRemainder
  get userCommand(): string {
    return parseCommand(this._userCommand.values)
  }

  private _dotEnvEnabled!: CommandLineChoiceParameter
  get dotEnvEnabled(): boolean {
    return parseBoolean(this._dotEnvEnabled.value!)
  }

  private _bypassEnvVar!: CommandLineStringListParameter
  get bypassEnvVar(): string[] {
    return this._bypassEnvVar.values as string[]
  }

  private _envVariablePrefix!: CommandLineStringParameter
  get envVariablePrefix(): string {
    // --prefix has a default value of 'REACT_APP_'
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this._envVariablePrefix.value!
  }

  public constructor() {
    super({
      actionName: 'build',
      summary: 'Build your react app with placeholder variables',
      documentation: 'TODO'
    })
  }

  protected onDefineParameters(): void {
    this._dotEnvEnabled = this.defineChoiceParameter({
      parameterLongName: '--dotenv',
      required: false,
      alternatives: ['true', 'false'],
      defaultValue: 'true',
      description: 'Automatically reads from .env file in /root folder. Default: true'
    })

    this._bypassEnvVar = this.defineStringListParameter({
      parameterLongName: '--bypass',
      description:
        'react-inject-env will use these environment variables when building and not substitute placeholders',
      argumentName: 'ENV_VARIABLE_NAME'
    })

    this._envVariablePrefix = this.defineStringParameter({
      description: 'Specify the prefix of environment variables to load',
      parameterLongName: '--prefix',
      parameterShortName: '-p',
      argumentName: 'ENV_VAR_PREFIX',
      defaultValue: 'REACT_APP_',
      required: false,
    })

    this._userCommand = this.defineCommandLineRemainder({
      description: 'Enter your build command here (eg. `react-inject-env build npm run build`)'
    })
  }

  protected async onExecute(): Promise<void> {
    console.log("Vallah: " + this.envVariablePrefix);

    const dotEnvCfg = this.dotEnvEnabled ? retrieveDotEnvCfg(this.envVariablePrefix) : {}
    const env = { ...dotEnvCfg, ...retrieveReactEnvCfg(this.envVariablePrefix) }
    console.info('Building with the following variables', Obj.pick(env, this.bypassEnvVar))

    const filteredEnv = Obj.omit(env, this.bypassEnvVar)
    console.info('Replacing the following variables with placeholders', Object.keys(filteredEnv))

    const command = `${formatEnvToCliString(filteredEnv)} ${this.userCommand}`
    console.info('Executing script', `'${this.userCommand}'`)
    shell.exec(command)
  }
}
