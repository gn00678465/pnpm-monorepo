import { useClamp } from '@vueuse/math'
import { computed, reactive, watch } from 'vue'
import type { PaginationProps } from 'naive-ui'

export interface UseNPaginationOptions {
  defaultValues: PaginationProps
  onPageChange?: (value: PaginationProps) => void | Promise<void>
  onPageSizeChange?: (value: PaginationProps) => void | Promise<void>
  onPageCountChange?: (value: PaginationProps) => void | Promise<void>
}

export function useNPagination({
  defaultValues,
  onPageChange,
  onPageSizeChange,
  onPageCountChange,
}: UseNPaginationOptions): UseNPaginationReturn {
  const pagination = reactive(Object.assign({}, defaultValues)) as PaginationProps

  function updatePage(page: number): void {
    pagination.page = page
  }

  function updatePageSize(pageSize: number): void {
    pagination.pageSize = pageSize
  }

  const pageCount = computed(() => {
    return Math.max(1, Math.ceil((pagination?.itemCount ?? 1) / (pagination?.pageSize ?? 1)))
  })

  watch(pageCount, async (newCount) => {
    pagination.page = useClamp(pagination?.page ?? 1, 1, newCount).value
    if (onPageCountChange) {
      await onPageCountChange(pagination)
    }
  })

  watch(
    () => pagination.page,
    async () => {
      if (onPageChange) {
        await onPageChange(pagination)
      }
    },
  )

  watch(
    () => pagination.pageSize,
    async () => {
      if (onPageSizeChange) {
        await onPageSizeChange(pagination)
      }
    },
  )

  return {
    pagination,
    onUpdatePage: updatePage,
    onUpdatePageSize: updatePageSize,
  }
}
export interface UseNPaginationReturn {
  pagination: PaginationProps
  onUpdatePage: (page: number) => void
  onUpdatePageSize: (pageSize: number) => void
}
