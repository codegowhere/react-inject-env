import shell from 'shelljs'
import { InjectEnvCommandLine } from '../src/InjectEnv'

/**
 * FIXME: These tests have a lot of leakage in between tests
 *  1. process.env variables
 *  2. dotenv variables
 *  3. leftover files
 */

const readFile = (dir: string): string => {
  return shell.cat(dir).toString()
}

describe('react-inject-env', () => {
  describe('Build', () => {
    const buildFile = () => {
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['build', 'sh', 'tests/scripts/buildFile.sh'])
      const _file = readFile('tests/output/test.txt')
      return _file
    }

    it('should build file with placeholders from process.env', () => {
      process.env['REACT_APP_PROCESS_ENV'] = ''
      const file = buildFile()
      expect(file).toContain('REACT_APP_PROCESS_ENV: ReactInjectEnv_REACT_APP_PROCESS_ENV')
    })
    it('should take in PUBLIC_URL env variable', () => {
      process.env['PUBLIC_URL'] = ''
      const file = buildFile()
      expect(file).toContain('PUBLIC_URL: ReactInjectEnv_PUBLIC_URL')
    })
    it('should build file with placeholders from dotenv file', () => {
      shell.exec('echo REACT_APP_DOT_ENV = DOT_ENV > .env')
      const file = buildFile()
      expect(file).toContain('REACT_APP_DOT_ENV: ReactInjectEnv_REACT_APP_DOT_ENV')
    })
    it('should not overwrite variables that are not passed in', () => {
      const file = buildFile()
      expect(file).toContain('REACT_APP_NO_INPUT: \n')
    })
    it('should not overwrite variables that do not start with the prefix', () => {
      process.env['GENERIC_ENV'] = ''
      process.env['MY_CUSTOM_PREFIX_TEST_VAR'] = ''
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['build', '--prefix', 'MY_CUSTOM_PREFIX_', 'sh', 'tests/scripts/buildFile.sh'])
      const file = readFile('tests/output/test.txt')
      expect(file).toContain(`MY_CUSTOM_PREFIX_TEST_VAR: ReactInjectEnv_MY_CUSTOM_PREFIX_TEST_VAR`)
      expect(file).toContain('GENERIC_ENV: \n')
    })

    // FIXME: Broken Test
    // it('should not read dotenv variables when --dotenv false', () => {
    //   shell.exec('echo REACT_APP_DOT_ENV = DOT_ENV > .env')
    //
    //   const commandLine = new InjectEnvCommandLine()
    //   commandLine.execute(['build', '--dotenv', 'false', 'sh', 'tests/scripts/buildFile.sh'])
    //   const file = readFile('tests/output/test.txt')
    //   expect(file).toContain('REACT_APP_DOT_ENV: \n')
    // })

    it('should build with actual variables when using --bypass', () => {
      const time = new Date().toISOString()
      process.env['REACT_APP_BYPASS_ENV'] = time
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['build', '--bypass', 'REACT_APP_BYPASS_ENV', 'sh', 'tests/scripts/buildFile.sh'])
      const file = readFile('tests/output/test.txt')
      expect(file).toContain(`REACT_APP_BYPASS_ENV: ${time}`)
    })
  })

  describe('Inject', () => {
    const buildFile = () => {
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['build', 'sh', 'tests/scripts/buildFile.sh'])
    }

    it('should replace file with injected env variables from process.env', () => {
      process.env['REACT_APP_INJECT_ENV1'] = 'A'
      buildFile()
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['inject', '-d', 'tests/output'])
      const file = readFile('tests/output/test2.txt')
      expect(file).toContain('REACT_APP_INJECT_ENV1: A')
    })

    it('should update PUBLIC_URL', () => {
      process.env['PUBLIC_URL'] = 'https://www.google.com'
      buildFile()
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['inject', '-d', 'tests/output'])
      const file = readFile('tests/output/test2.txt')
      expect(file).toContain('PUBLIC_URL: https://www.google.com')
    })

    it('should replace file with injected env variables from dotenv', () => {
      shell.exec('echo REACT_APP_INJECT_ENV2 = B > .env')
      buildFile()
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['inject', '-d', 'tests/output'])
      const file = readFile('tests/output/test2.txt')
      expect(file).toContain('REACT_APP_INJECT_ENV2: B')
    })

    it('should replace file with injected env variables from dotenv matching custom prefix', () => {
      shell.exec('echo MY_CUSTOM_PREFIX_TEST_VAR = B > .env')
      buildFile()
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['inject', '-p', 'MY_CUSTOM_PREFIX_', '-d', 'tests/output'])
      const file = readFile('tests/output/test2.txt')
      expect(file).toContain('MY_CUSTOM_PREFIX_TEST_VAR: B')
    })

    it('should replace all files in directory', () => {
      process.env['REACT_APP_INJECT_ENV3'] = 'C'
      buildFile()
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['inject', '-d', 'tests/output'])
      expect(readFile('tests/output/test3/test3.txt')).toContain('REACT_APP_INJECT_ENV3: C')
      expect(readFile('tests/output/test3/test3b.txt')).toContain('REACT_APP_INJECT_ENV3: C')
    })

    it('should output to new folder without modifying the origin when using --o', () => {
      process.env['REACT_APP_INJECT_ENV4'] = 'D'
      buildFile()
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['inject', '-d', 'tests/output', '-o', 'tests/output2'])
      expect(readFile('tests/output/test4.txt')).toContain(
        'REACT_APP_INJECT_ENV4: ReactInjectEnv_REACT_APP_INJECT_ENV4'
      )
      expect(readFile('tests/output2/test4.txt')).toContain('REACT_APP_INJECT_ENV4: D')
    })
  })

  describe('Set', () => {
    it('should generate env.js file in specified directory', () => {
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['set', '-d', './tests/output3'])
      expect(()=>readFile('tests/output3/env.js')).not.toThrowError()
    })
    it('should rename output env file based on param', () => {
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['set', '-d', './tests/output3', '-n', 'env2.js'])
      expect(()=>readFile('tests/output3/env2.js')).not.toThrowError()
    })
    it('should generate env file based on process.env variables', () => {
      process.env['REACT_APP_SET_ENV1'] = 'ENV1'
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['set', '-d', './tests/output3', '-n', 'env3.js'])
      expect(readFile('tests/output3/env3.js')).toContain('"REACT_APP_SET_ENV1": "ENV1"')
    })
    it('should generate env file based on dotenv variables', () => {
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['set', '-d', './tests/output3', '-n', 'env4.js'])
      expect(readFile('tests/output3/env4.js')).toContain('"REACT_APP_SET_ENV2": "C"')
    })
    it('should not pick up env variables not starting with prefix', () => {
      process.env['SET_GENERIC_ENV'] = 'GENERIC_ENV'
      process.env['MY_CUSTOM_PREFIX_TEST_VAR'] = 'MY_CUSTOM_PREFIX_TEST_VAR'
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['set', '-p', 'MY_CUSTOM_PREFIX_', '-d', './tests/output3', '-n', 'env5.js'])
      expect(readFile('tests/output3/env5.js')).not.toContain('"SET_GENERIC_ENV": "GENERIC_ENV"')
      expect(readFile('tests/output3/env5.js')).toContain('"MY_CUSTOM_PREFIX_TEST_VAR": "MY_CUSTOM_PREFIX_TEST_VAR"')
    })
    it('should rename window variable name based on param', () => {
      const commandLine = new InjectEnvCommandLine()
      commandLine.execute(['set', '-d', './tests/output3', '-n', 'env6.js', '-v', 'randomVarName'])
      expect(readFile('tests/output3/env6.js')).toContain('window.randomVarName = {')
    })
  })
})
