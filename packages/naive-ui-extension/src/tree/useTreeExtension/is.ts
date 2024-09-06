import type { TreeOption } from 'naive-ui'
import type { NodeOrKeyParams } from './types'

export function isArray<T>(nodes?: T[]): nodes is T[] {
  if (nodes !== undefined && typeof nodes === 'object' && Array.isArray(nodes))
    return true
  return false
}

export function isNode(node?: NodeOrKeyParams): node is TreeOption {
  if (typeof node === 'object' && 'key' in node)
    return true
  return false
}

export function isKey(node?: NodeOrKeyParams): node is TreeOption['key'] {
  if (typeof node === 'string')
    return true
  if (typeof node === 'number')
    return true
  return false
}
