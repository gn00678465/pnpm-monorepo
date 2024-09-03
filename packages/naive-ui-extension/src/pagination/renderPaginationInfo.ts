import { h } from 'vue'
import type { VNode } from 'vue'
import type { PaginationInfo } from 'naive-ui'

export function renderPaginationInfo(info: PaginationInfo): VNode
export function renderPaginationInfo(info: PaginationInfo): VNode {
  const { startIndex, endIndex, pageSize, itemCount } = info
  if (!itemCount || (itemCount && itemCount === 0)) {
    return h('span', `0 of ${0}`)
  }

  const start = startIndex + 1
  const end = endIndex > itemCount ? start + pageSize : endIndex + 1

  return h('span', `${start}-${end} of ${itemCount}`)
}
