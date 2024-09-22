// capitalizer.test.ts
import { describe, expect, it } from 'vitest'
import { capitalize } from './index'

describe('capitalize', () => {
  it('capitalizes the first letter of a lowercase string', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('returns the same string if it starts with an uppercase letter', () => {
    expect(capitalize('World')).toBe('World')
  })

  it('handles empty strings', () => {
    expect(capitalize('')).toBe('')
  })

  it('handles strings with only one character', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('A')).toBe('A')
  })

  it('does not change strings starting with numbers', () => {
    expect(capitalize('123abc')).toBe('123abc')
  })

  it('does not change strings starting with special characters', () => {
    expect(capitalize('!hello')).toBe('!hello')
  })

  it('does not change Chinese characters', () => {
    expect(capitalize('你好')).toBe('你好')
  })

  it('capitalizes the first letter of a mixed case string', () => {
    expect(capitalize('hElLo')).toBe('Hello')
  })

  it('handles strings with leading whitespace', () => {
    expect(capitalize(' hello')).toBe(' hello')
  })
})
