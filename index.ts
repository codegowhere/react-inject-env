#!/usr/bin/env node
import { replaceFilesInDir } from './src/Something'
;(async function() {
  try {
    const dir = process.argv[2]
    if (!dir) {
      throw Error('No directory entered. Usage npx react-inject-env <path_to_build_folder>')
    }
    replaceFilesInDir(dir)
  } catch (e) {
    console.error((e?.name ?? 'Error') + ': ' + e?.message)
    process.exit(1)
  }
})()
