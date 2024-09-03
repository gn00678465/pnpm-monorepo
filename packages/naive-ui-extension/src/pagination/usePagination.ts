import { computed, reactive, watch } from 'vue'
import type { PaginationProps } from 'naive-ui'
import { useClamp } from '@vueuse/math'

export interface UseNPaginationOptions {
  defaultValues: PaginationProps
  onPageChange?: (value: PaginationProps) => void | Promise<void>
  onPageSizeChange?: (value: PaginationProps) => void | Promise<void>
}

export function useNPagination({
  defaultValues,
  onPageChange,
  onPageSizeChange,
}: UseNPaginationOptions): UseNPaginationReturn {
  const pagination = reactive(defaultValues)

  function updatePage(page: number): void {
    pagination.page = page
  }

  function updatePageSize(pageSize: number): void {
    pagination.pageSize = pageSize
  }

  const pageCount = computed(() => {
    return Math.max(1, Math.ceil((pagination?.itemCount ?? 1) / (pagination?.pageSize ?? 1)))
  })

  watch(pageCount, (newCount) => {
    pagination.page = useClamp(pagination.page!, 1, newCount).value
  })

  watch(
    () => pagination.page,
    async () => {
      if (onPageChange) {
        await onPageChange(defaultValues)
      }
    },
  )

  watch(
    () => pagination.pageSize,
    async () => {
      if (onPageSizeChange) {
        await onPageSizeChange(defaultValues)
      }
    },
  )

  return {
    pagination: pagination as PaginationProps,
    onUpdatePage: updatePage,
    onUpdatePageSize: updatePageSize,
  }
}
export interface UseNPaginationReturn {
  pagination: PaginationProps
  onUpdatePage: (page: number) => void
  onUpdatePageSize: (pageSize: number) => void
}
