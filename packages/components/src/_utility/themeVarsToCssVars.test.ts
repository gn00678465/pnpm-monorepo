import { describe, expect, it } from 'vitest'
import { themeVarsToCssVars } from './processThemeVars'

const themeVars = {
  paddingSm: '12px 16px 12px',
  paddingMd: '19px 24px',
  paddingLg: '23px 32px 24px 28px',
  marginSm: '8px',
  marginMd: '16px 20px',
  marginLg: '24px 28px 32px',
  lineHeight: 1.6,
  fontSizeSm: '14px',
  fontSizeMd: '16px',
  fontSizeLg: '18px',
  borderRadius: '3px',
  fontWeight: '400',
  letterSpacing: '0.5px',
}

const sizes = ['sm', 'md', 'lg']

describe('processThemeVars', () => {
  it('processes theme vars for "sm" size with padding and margin', () => {
    const result = themeVarsToCssVars('sm', sizes, themeVars)
    expect(result).toEqual({
      '--padding-top': '12px',
      '--padding-bottom': '12px',
      '--padding-left': '16px',
      '--margin-top': '8px',
      '--margin-bottom': '8px',
      '--margin-left': '8px',
      '--line-height': 1.6,
      '--font-size': '14px',
      '--border-radius': '3px',
      '--font-weight': '400',
      '--letter-spacing': '0.5px',
    })
  })

  it('processes theme vars for "md" size with padding and margin', () => {
    const result = themeVarsToCssVars('md', sizes, themeVars)
    expect(result).toEqual({
      '--padding-top': '19px',
      '--padding-bottom': '19px',
      '--padding-left': '24px',
      '--margin-top': '16px',
      '--margin-bottom': '16px',
      '--margin-left': '20px',
      '--line-height': 1.6,
      '--font-size': '16px',
      '--border-radius': '3px',
      '--font-weight': '400',
      '--letter-spacing': '0.5px',
    })
  })

  it('processes theme vars for "lg" size with padding and margin', () => {
    const result = themeVarsToCssVars('lg', sizes, themeVars)
    expect(result).toEqual({
      '--padding-top': '23px',
      '--padding-bottom': '24px',
      '--padding-left': '28px',
      '--margin-top': '24px',
      '--margin-bottom': '32px',
      '--margin-left': '28px',
      '--line-height': 1.6,
      '--font-size': '18px',
      '--border-radius': '3px',
      '--font-weight': '400',
      '--letter-spacing': '0.5px',
    })
  })

  it('handles invalid spacing values', () => {
    const invalidThemeVars = {
      ...themeVars,
      paddingSm: '1px 2px 3px 4px 5px', // Invalid: too many values
    }
    expect(() => themeVarsToCssVars('sm', sizes, invalidThemeVars)).toThrow('Invalid spacing value')
  })
})
