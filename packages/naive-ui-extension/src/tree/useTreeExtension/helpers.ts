import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { TreeOption } from 'naive-ui'
import { isArray } from './is'

export interface UpdateOptions {
  replace?: boolean
  append?: boolean
  insertBefore?: boolean
  insertAfter?: boolean
}

export function updateNestedStructure<
  T extends { key?: string | number, id?: string, children?: T[] } = TreeOption,
>(
  root: MaybeRefOrGetter<T[]>,
  newNode: T,
  key: T['key'],
  options: UpdateOptions,
): T[] {
  const updatedRoot = [...toValue(root)]

  function _updateNode(nodes: T[]): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) {
        if (options.replace) {
          nodes[i] = { ...newNode, children: nodes[i].children }
        }
        else if (options.append) {
          if (nodes[i].children === undefined) {
            nodes[i].children = []
          }
          nodes[i].children?.push(newNode)
        }
        else if (options.insertBefore) {
          nodes.splice(i, 0, newNode)
        }
        else if (options.insertAfter) {
          nodes.splice(i + 1, 0, newNode)
        }
        return true
      }
      if (isArray(nodes[i].children) && _updateNode(nodes[i].children!)) {
        return true
      }
    }
    return false
  }

  _updateNode(updatedRoot)

  return updatedRoot
}

export function removeNestedStructure<
  T extends { key?: string | number, id?: string, children?: T[] } = TreeOption,
>(
  root: MaybeRefOrGetter<T[]>,
  key: T['key'],
): T[] {
  const updatedRoot = [...toValue(root)]

  function _removeNode(nodes: T[]): boolean {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) {
        nodes.splice(i, 1)
        return true
      }
      if (isArray(nodes[i].children) && _removeNode(nodes[i].children!)) {
        if (nodes[i].children?.length === 0) {
          delete nodes[i].children
        }
        return true
      }
    }
    return false
  }

  _removeNode(updatedRoot)

  return updatedRoot
}
