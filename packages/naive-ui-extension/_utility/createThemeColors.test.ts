import { describe, expect, it } from 'vitest'
import { createThemeColors } from './createThemeColors'

describe('createThemeColors', () => {
  it('should create theme colors with nested structure', () => {
    const input = {
      neutral: {
        base: '#FFF',
        invertBase: '#000',
        textBase: '#000',
        popover: '#fff',
        card: '#fff',
        modal: '#fff',
        body: '#fff',
      },
    }

    const expected = {
      neutral: {
        base: '--un-neutral-base',
        invertBase: '--un-neutral-invert-base',
        textBase: '--un-neutral-text-base',
        popover: '--un-neutral-popover',
        card: '--un-neutral-card',
        modal: '--un-neutral-modal',
        body: '--un-neutral-body',
      },
    }

    const result = createThemeColors(input, 'un-')
    expect(result).toEqual(expected)
  })

  it('should handle empty input', () => {
    const result = createThemeColors({})
    expect(result).toEqual({})
  })

  it('should handle custom prefix', () => {
    const input = { color: '#FFF' }
    const result = createThemeColors(input, 'custom-')
    expect(result).toEqual({ color: '--custom-color' })
  })

  it('should handle multiple nested levels', () => {
    const input = {
      colors: {
        primary: {
          light: '#E6F7FF',
          main: '#1890FF',
          dark: '#0050B3',
          DEFAULT: '#0000FF',
        },
      },
    }
    const result = createThemeColors(input, 'un-')
    expect(result).toEqual({
      colors: {
        primary: {
          light: '--un-colors-primary-light',
          main: '--un-colors-primary-main',
          dark: '--un-colors-primary-dark',
          DEFAULT: '--un-colors-primary',
        },
      },
    })
  })
})
