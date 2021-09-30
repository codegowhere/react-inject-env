function getEnv<T extends object>(): T {
  let env = {}
  if (typeof process?.env === 'object') {
    Object.assign(env, process.env)
  }
  // @ts-ignore
  if (typeof window['reactinject']?.env === 'object') {
    // @ts-ignore
    Object.assign(env, window['reactinject'].env)
  }
  return env as T
}

const env: any = getEnv()

export default env
export { getEnv }
