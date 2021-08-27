import { some_class, some_function } from '../src/Something'
import some_singleton from '../src/Something'

describe('Sample', () => {
  test('some_class', async () => {
    let a = new some_class('string')
    expect(a.test()).toEqual('string')
  })

  test('some_function', async () => {
    expect(some_function('string')).toEqual('string')
  })

  test('some_singleton', async () => {
    expect(some_singleton.test()).toEqual('1')
  })
})
