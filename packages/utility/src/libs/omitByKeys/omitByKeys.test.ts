import { expect, test } from 'vitest';
import { omitByKeys } from '.';

const obj = { foo: 'bar' };

test('No props to omit at all', () => {
  expect(omitByKeys([], obj)).toEqual(obj);
});

test('Only one prop to omit', () => {
  expect(omitByKeys(['foo'], obj)).toEqual({});
});

test('不存在的 props', () => {
  // @ts-expect-error 不存在的 props
  expect(omitByKeys(['bar'], obj)).toEqual({ foo: 'bar' });
});

const obj2 = { aa: 'aa', bb: 'bb', cc: 'cc' };

test('重複的props', () => {
  expect(omitByKeys(['aa', 'aa'], obj2)).toEqual({ bb: 'bb', cc: 'cc' });
});
