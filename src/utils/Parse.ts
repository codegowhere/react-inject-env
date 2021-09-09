export function validateDotEnvExists(param: unknown): Record<string, any> {
  if (typeof param === 'object' && param != null) {
    return param
  }
  throw TypeError('dotenv file not found')
}

export function validateCommand(command: string): string
export function validateCommand(command: unknown): string {
  if (typeof command !== 'string' || !command) {
    throw TypeError(`Command must be be valid: ${command}`)
  }
  return command
}

export function parseCommand(params: string[] | readonly string[]): string {
  const command = validateCommand(params.join(' '))
  return command
}

export function parseBoolean(param: string): boolean
export function parseBoolean(param: unknown): boolean {
  if (param === 'true') {
    return true
  } else if (param === 'false') {
    return false
  }
  throw TypeError(`Expected 'true' or 'false', received: ${param}`)
}
