import { computed, type ComputedRef, type MaybeRefOrGetter, toValue, watch } from 'vue'
import { useNPagination, type UseNPaginationOptions, type UseNPaginationReturn } from './useNPagination'

export type UseClientPaginationOptions = UseNPaginationOptions

export function useClientPagination<T>(
  list: MaybeRefOrGetter<T[]>,
  options: UseClientPaginationOptions,
): UseClientPaginationReturn<T> {
  const { ...opts } = options

  const { pagination, ...paginationRef } = useNPagination(opts)

  const range = computed(() => {
    const start = ((pagination.page || 1) - 1) * (pagination.pageSize || 20)
    return { start, limit: pagination.pageSize || 20 }
  })

  const currentPageData = computed(() => {
    return toValue(list).slice(range.value.start, range.value.start + range.value.limit)
  })

  watch(() => toValue(list).length, (len) => {
    pagination.itemCount = len
  }, { immediate: true })

  return {
    currentPageData,
    pagination,
    ...paginationRef,
  }
}

export interface UseClientPaginationReturn<T> extends UseNPaginationReturn {
  currentPageData: ComputedRef<T[]>
}
