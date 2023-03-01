import { Cfg } from '../app/Config'

export function retrieveReactEnvCfg(): Record<string, string> {
  const env = process.env
  const keys = Object.keys(env)
  const reactKeys = keys.filter(key => {
    return key.startsWith(Cfg.PREFIX) || key === 'PUBLIC_URL'
  })

  const envCfg: Record<string, string> = {}
  for (const key of reactKeys) {
    // @ts-ignore
    envCfg[key] = process.env[key]
  }
  return envCfg
}

export function retrieveDotEnvCfg(): Record<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = process.env.REACT_APP_DOTENV_CONFIG_PATH ?? '.env';
  const env = require('dotenv').config({path: path}).parsed ?? {}

  const keys = Object.keys(env)
  const reactKeys = keys.filter(key => {
    return key.startsWith(Cfg.PREFIX) || key === 'PUBLIC_URL'
  })

  const envCfg: Record<string, string> = {}
  for (const key of reactKeys) {
    // @ts-ignore
    envCfg[key] = process.env[key]
  }
  return envCfg
}
