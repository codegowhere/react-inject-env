import replace from 'replace-in-file'
import shell from 'shelljs'
import { Cfg } from '../app/Config'
import { retrieveDotEnvCfg, retrieveReactEnvCfg } from './Utils'
import { writeFileSync } from 'fs'

function generateFromTo(
  envCfg: Record<string, string>,
  prefix = [Cfg.PREFIX, Cfg.PLACEHOLDER]
): {
  from: string[] | RegExp[]
  to: string[]
} {
  const from = Object.keys(envCfg)
    .map((key) => key.replace(prefix[0], prefix[1]))
    .map((key) => new RegExp(`\\b${key}\\b`, 'g'))
  const to = Object.values(envCfg)
  return {
    from: from,
    to: to,
  }
}

export function copyFolder(dir: string, copyDir: string): string {
  shell.cp('-R', dir, copyDir)
  return copyDir
}

export function replaceFile(dirPath: string, envConfig: Record<string, string>) {
  const { from, to } = generateFromTo(envConfig)
  const results = replace.sync({
    files: `${dirPath}/**/*`,
    from: from,
    to: to,
    countMatches: true,
  })
  results.forEach((it) => {
    if (it.hasChanged) {
      console.info(`Replaced ${it.numReplacements} variable(s) in '${it.file}'`)
    }
  })
}

export function replaceFilesInDir(dir: string) {
  const envCfg = { ...retrieveDotEnvCfg(), ...retrieveReactEnvCfg() }
  console.info('Injecting the following environment variables:')
  console.info(envCfg)
  replaceFile(dir, envCfg)
}

export function outputEnvFile(folder: string, fileName: string, envCfg: Record<string, string>, varName: string) {
  shell.mkdir('-p', './build')
  console.info('Setting the following environment variables:')
  console.info(envCfg)
  writeFileSync(`${folder}/${fileName}`, `window.${varName} = ${JSON.stringify(envCfg, null, 2)}`)
}
