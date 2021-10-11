function getEnv<T extends object>(varName = 'env'): T {
  let env = {}
  if (typeof process?.env === 'object') {
    Object.assign(env, process.env)
  }
  // @ts-ignore
  if (typeof window?.[varName] === 'object') {
    // @ts-ignore
    Object.assign(env, window[varName])
  }
  return env as T
}

const env: any = getEnv()

export default env
export { getEnv }
