export function retrieveReactEnvCfg(envVariablePrefix: string): Record<string, string> {
  const env = process.env
  const keys = Object.keys(env)
  const reactKeys = keys.filter(key => {
    return key.startsWith(envVariablePrefix) || key === 'PUBLIC_URL'
  })

  const envCfg: Record<string, string> = {}
  for (const key of reactKeys) {
    // @ts-ignore
    envCfg[key] = process.env[key]
  }
  return envCfg
}

export function retrieveDotEnvCfg(envVariablePrefix: string): Record<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const env = require('dotenv').config().parsed ?? {}

  const keys = Object.keys(env)
  const reactKeys = keys.filter(key => {
    return key.startsWith(envVariablePrefix) || key === 'PUBLIC_URL'
  })

  const envCfg: Record<string, string> = {}
  for (const key of reactKeys) {
    // @ts-ignore
    envCfg[key] = process.env[key]
  }
  return envCfg
}
