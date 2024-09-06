import { computed, ref, toValue, watch } from 'vue'
import type { Ref, WritableComputedRef } from 'vue'
import type { TreeOption } from 'naive-ui'
import { isKey, isNode } from './is'
import type { NodeOrKeyParams } from './types'
import { removeNestedStructure, updateNestedStructure } from './helpers'

/**
 * naive tree 擴充
 * 1. append
 * 2. remove
 * 3. insertBefore
 * 4. insertAfter
 * @param root
 */
export function useNTreeExtension(root: Ref<TreeOption[]>): UseNTreeExtensionReturn {
  const _root = ref(toValue(root)) as Ref<TreeOption[]>

  const computedRoot = computed({
    get() {
      return _root.value
    },
    set(data) {
      _root.value = data
    },
  }) as WritableComputedRef<TreeOption[]>

  watch(root, (_) => {
    computedRoot.value = _
  })

  /**
   *
   * @param node
   */
  function remove(node: NodeOrKeyParams): void {
    if (isKey(node)) {
      computedRoot.value = removeNestedStructure(computedRoot, node)
      return
    }
    if (isNode(node)) {
      computedRoot.value = removeNestedStructure(computedRoot, node.key)
    }
  }

  /**
   *
   * @param data
   * @param node
   */
  function append(data: TreeOption, node: NodeOrKeyParams): void {
    if (isKey(node)) {
      computedRoot.value = updateNestedStructure(computedRoot, data, node, { append: true })
      return
    }
    if (isNode(node)) {
      computedRoot.value = updateNestedStructure(computedRoot, data, node.key, { append: true })
    }
  }

  /**
   *
   * @param data
   * @param node
   */
  function insertBefore(data: TreeOption, node: NodeOrKeyParams): void {
    if (isKey(node)) {
      computedRoot.value = updateNestedStructure(computedRoot, data, node, { insertBefore: true })
      return
    }
    if (isNode(node)) {
      computedRoot.value = updateNestedStructure(computedRoot, data, node.key, {
        insertBefore: true,
      })
    }
  }

  /**
   *
   * @param data
   * @param node
   */
  function insertAfter(data: TreeOption, node: NodeOrKeyParams): void {
    if (isKey(node)) {
      computedRoot.value = updateNestedStructure(computedRoot, data, node, { insertAfter: true })
      return
    }
    if (isNode(node)) {
      computedRoot.value = updateNestedStructure(computedRoot, data, node.key, {
        insertAfter: true,
      })
    }
  }

  return {
    data: computedRoot,
    remove,
    append,
    insertBefore,
    insertAfter,
  }
}

export interface UseNTreeExtensionReturn {
  data: WritableComputedRef<TreeOption[]>
  remove: (node: NodeOrKeyParams) => void
  append: (data: TreeOption, node: NodeOrKeyParams) => void
  insertBefore: (data: TreeOption, node: NodeOrKeyParams) => void
  insertAfter: (data: TreeOption, node: NodeOrKeyParams) => void
}
