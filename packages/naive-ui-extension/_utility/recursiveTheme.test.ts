import { describe, expect, it } from 'vitest'
import { recursiveTheme } from './recursiveTheme'

describe('recursiveTheme', () => {
  it('should create CSS variables for nested theme object', () => {
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
      '--theme-neutral-base': '#FFF',
      '--theme-neutral-invert-base': '#000',
      '--theme-neutral-text-base': '#000',
      '--theme-neutral-popover': '#fff',
      '--theme-neutral-card': '#fff',
      '--theme-neutral-modal': '#fff',
      '--theme-neutral-body': '#fff',
    }

    const result = recursiveTheme(input, 'theme-')
    expect(result).toEqual(expected)
  })

  it('should handle empty input', () => {
    const result = recursiveTheme({}, 'theme-')
    expect(result).toEqual({})
  })

  it('should handle arrays in theme', () => {
    const input = {
      colors: {
        primary: ['#light', '#normal', '#dark'],
      },
    }
    const expected = {
      '--theme-colors-primary-0': '#light',
      '--theme-colors-primary-1': '#normal',
      '--theme-colors-primary-2': '#dark',
    }
    const result = recursiveTheme(input, 'theme-')
    expect(result).toEqual(expected)
  })

  it('should ignore keys containing DEFAULT', () => {
    const input = {
      colors: {
        primary: '#main',
        DEFAULT: '#default',
      },
    }
    const expected = {
      '--theme-colors': '#default',
      '--theme-colors-primary': '#main',
    }
    const result = recursiveTheme(input, 'theme-')
    expect(result).toEqual(expected)
  })

  it('should handle custom prefix', () => {
    const input = {
      neutral: {
        base: '#FFF',
      },
    }
    const expected = {
      '--custom-neutral-base': '#FFF',
    }
    const result = recursiveTheme(input, 'custom-')
    expect(result).toEqual(expected)
  })
})
