import { describe, expect, it } from 'vitest'
import { createAntdColorPalletteVars } from './antd'

describe('createAntdColorPalletteVars', () => {
  it('should create flat color palette variables with default options', () => {
    const colors = {
      primary: '#1890ff',
      success: '#52c41a',
    }
    const result = createAntdColorPalletteVars(colors)
    expect(result).toEqual(expect.objectContaining({
      'primary-1': expect.any(String),
      'primary-2': expect.any(String),
      // ... 其他預期的顏色變量
      'success-1': expect.any(String),
      'success-2': expect.any(String),
      // ... 其他預期的顏色變量
    }))
    expect(Object.keys(result)).toHaveLength(20) // 假設每種顏色生成 10 個變體
  })

  it('should create nested color palette variables when type is "nested"', () => {
    const colors = {
      primary: '#1890ff',
    }
    const result = createAntdColorPalletteVars(colors, { type: 'nested' })
    expect(result).toEqual({
      primary: expect.objectContaining({
        1: expect.any(String),
        2: expect.any(String),
        // ... 其他預期的顏色變量
      }),
    })
    expect(Object.keys(result.primary)).toHaveLength(10) // 假設每種顏色生成 10 個變體
  })

  it('should use RGB format when specified', () => {
    const colors = {
      primary: '#1890ff',
    }
    const result = createAntdColorPalletteVars(colors, { format: 'rgbString' })
    Object.values(result).forEach((color) => {
      expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/)
    })
  })

  it('should throw error for invalid type option', () => {
    const colors = {
      primary: '#1890ff',
    }
    expect(() => createAntdColorPalletteVars(colors, { type: 'invalid' as any })).toThrow('Type must be \'flat\' of \'nested\'')
  })

  it('should handle empty color object', () => {
    const result = createAntdColorPalletteVars({})
    expect(result).toEqual({})
  })

  it('should correctly handle single color input', () => {
    const colors = {
      primary: '#1890ff',
    }
    const result = createAntdColorPalletteVars(colors)
    expect(Object.keys(result)).toHaveLength(10) // 假設生成 10 個變體
    expect(result['primary-1']).toBeDefined()
    expect(result['primary-10']).toBeDefined()
  })

  it('should handle various color formats in input', () => {
    const colors = {
      primary: 'rgb(0,0,0)',
    }
    const result = createAntdColorPalletteVars(colors, { type: 'nested' })
    expect(result).toEqual({
      primary: expect.objectContaining({
        1: expect.any(String),
        2: expect.any(String),
        // ... 其他預期的顏色變量
      }),
    })
  })
})
