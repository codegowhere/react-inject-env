#!/usr/bin/env node
import { some_class, some_function } from './src/Something'
import some_singleton from './src/Something'
;(async function() {
  try {
    let command = process.argv[2]

    if (command === 'some_function') {
      some_function('1')
    } else if (command === 'some_class') {
      new some_class('2').test()
    } else if (command === 'some_singleton') {
      some_singleton.test()
    } else {
      throw Error('InvalidArgumentException')
    }
  } catch (e) {
    console.error((e?.name ?? 'Error') + ': ' + e?.message)
    process.exit(1)
  }
})()
