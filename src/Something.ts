import replace from 'replace-in-file'

function generateFromTo(
  envCfg: Record<string, string>,
  prefix = ['REACT_APP_', 'REPLACE_']
): {
  from: string[] | RegExp[];
  to: string[];
} {
  const from = Object.keys(envCfg)
    .map(key => key.replace(prefix[0], prefix[1]))
    .map(key => new RegExp(`\\b${key}\\b`, 'g'))
  const to = Object.values(envCfg)
  return {
    from: from,
    to: to
  }
}

function replaceFile(dirPath: string, envConfig: Record<string, string>) {
  const { from, to } = generateFromTo(envConfig)
  const results = replace.sync({
    files: `${dirPath}/**/*`,
    from: from,
    to: to,
    countMatches: true
  })
  results.forEach(it => {
    if (it.hasChanged) {
      console.info(`Replaced ${it.numReplacements} variable(s) in '${it.file}'`)
    }
  })
}

function getReactEnvCfg(): Record<string, string> {
  const env = process.env
  const keys = Object.keys(env)
  const reactKeys = keys.filter(key => key.startsWith('REACT_APP_'))

  const envCfg: Record<string, string> = {}
  for (const key of reactKeys) {
    // @ts-ignore
    envCfg[key] = process.env[key]
  }
  return envCfg
}

export function replaceFilesInDir(dir: string) {
  const envCfg = getReactEnvCfg()
  console.info('Injecting the following environment variables:')
  console.info(envCfg)
  replaceFile(dir, envCfg)
}
