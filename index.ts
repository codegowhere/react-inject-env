#!/usr/bin/env node
import { InjectEnvCommandLine } from './src/InjectEnv'

const commandLine = new InjectEnvCommandLine()
commandLine.execute()
