import { expect, test, describe } from 'vitest';
import {
  generateColorCombinations,
  setCssVarName
} from './generateColorCombinations';

describe('setCssVarName', () => {
  test('should exist', () => {
    expect(setCssVarName).toBeDefined();
  });

  test('帶入所有參數', () => {
    expect(setCssVarName('n', 'primary', 'hover', '100')).toEqual(
      '--n-primary-hover-100'
    );
  });
  test('不帶入 prefix 參數', () => {
    expect(setCssVarName('', 'primary', 'hover', '100')).toEqual(
      '--primary-hover-100'
    );
  });
  test('不帶入 shade 參數', () => {
    expect(setCssVarName('n', 'primary', 'hover', '')).toEqual(
      '--n-primary-hover'
    );
  });

  test('type 為空字串回應錯誤', () => {
    expect(() => setCssVarName('', '', '', '')).toThrowError(
      'Type must not empty'
    );
  });
});

describe('generateColorCombinations', () => {
  test('should exist', () => {
    expect(generateColorCombinations).toBeDefined();
  });

  test('帶入 types', () => {
    expect(generateColorCombinations({ types: ['primary'] })).toStrictEqual({
      primary: 'rgba(var(--primary))',
      'primary-hover': 'rgba(var(--primary-hover))',
      'primary-pressed': 'rgba(var(--primary-pressed))',
      'primary-focus': 'rgba(var(--primary-focus))',
      'primary-disabled': 'rgba(var(--primary-disabled))'
    });
  });

  test('帶入 scenes', () => {
    expect(generateColorCombinations({ scenes: ['hover'] })).toStrictEqual({
      primary: 'rgba(var(--primary))',
      'primary-hover': 'rgba(var(--primary-hover))',
      info: 'rgba(var(--info))',
      'info-hover': 'rgba(var(--info-hover))',
      success: 'rgba(var(--success))',
      'success-hover': 'rgba(var(--success-hover))',
      warning: 'rgba(var(--warning))',
      'warning-hover': 'rgba(var(--warning-hover))',
      error: 'rgba(var(--error))',
      'error-hover': 'rgba(var(--error-hover))'
    });
  });

  test('帶入 shades', () => {
    expect(
      generateColorCombinations({
        types: ['primary'],
        scenes: ['hover'],
        shades: ['100', 200]
      })
    ).toStrictEqual({
      primary: 'rgba(var(--primary))',
      'primary-hover': 'rgba(var(--primary-hover))',
      'primary-100': 'rgba(var(--primary-100))',
      'primary-200': 'rgba(var(--primary-200))'
    });
  });

  test('types 型別錯誤回應', () => {
    expect(() =>
      generateColorCombinations({
        /* @ts-expect-error: type error test */
        types: 123
      })
    ).toThrowError('Types must be an array.');
  });

  test('types 未帶入錯誤回應', () => {
    expect(() =>
      generateColorCombinations({
        types: []
      })
    ).toThrowError('Types must be not empty.');
  });
});
