import { Cfg } from '../app/Config'

export function formatEnvToCliString(env: Record<string, string>): string {
  let envString = ''
  Object.keys(env).forEach(key => {
    envString += `${key}=${Cfg.PLACEHOLDER}${key.split(Cfg.PREFIX)[1]} `
  })
  return envString
}

export function formatEnvCommand(env: Record<string, string>, command: string): string {
  return `${formatEnvToCliString(env)} ${command}`
}
