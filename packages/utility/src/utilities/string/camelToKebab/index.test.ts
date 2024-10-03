import { describe, expect, it } from 'vitest'
import { camelToKebab } from './index'

describe('camelToKebab', () => {
  it('converts simple camel case to kebab case', () => {
    expect(camelToKebab('helloWorld')).toBe('hello-world')
  })

  it('handles multiple uppercase letters', () => {
    expect(camelToKebab('thisIsALongString')).toBe('this-is-a-long-string')
  })

  it('handles numbers', () => {
    expect(camelToKebab('user123Name')).toBe('user123-name')
  })

  it('returns lowercase single words unchanged', () => {
    expect(camelToKebab('hello')).toBe('hello')
  })

  it('handles empty string', () => {
    expect(camelToKebab('')).toBe('')
  })
})
