import { describe, expect, it, vi } from 'vitest'
import { nextTick, reactive, ref } from 'vue'
import { useClientPagination } from './useClientPagination'

// 模擬 useNPagination
vi.mock('./useNPagination', () => ({
  useNPagination: vi.fn(({ defaultValues, onPageChange, onPageSizeChange }) => {
    const pagination = reactive({ ...defaultValues })

    return {
      pagination,
      onUpdatePage: (page: number) => {
        pagination.page = page
        onPageChange?.(pagination)
      },
      onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize
        onPageSizeChange?.(pagination)
      },
    }
  }),
}))

describe('useClientPagination', () => {
  it('should initialize with correct values', () => {
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i + 1 })))
    const { currentPageData, pagination } = useClientPagination(list, {
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
    })

    expect(currentPageData.value.length).toBe(10)
    expect(currentPageData.value[0].id).toBe(1)
    expect(currentPageData.value[9].id).toBe(10)
    expect(pagination.itemCount).toBe(100)
  })

  it('should update currentPageData when page changes', async () => {
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i + 1 })))
    const { currentPageData, onUpdatePage } = useClientPagination(list, {
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
    })

    onUpdatePage(2)
    await nextTick()

    expect(currentPageData.value[0].id).toBe(11)
    expect(currentPageData.value[9].id).toBe(20)
  })

  it('should update currentPageData when pageSize changes', async () => {
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i + 1 })))
    const { currentPageData, onUpdatePageSize } = useClientPagination(list, {
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
    })

    onUpdatePageSize(20)
    await nextTick()

    expect(currentPageData.value.length).toBe(20)
    expect(currentPageData.value[0].id).toBe(1)
    expect(currentPageData.value[19].id).toBe(20)
  })

  it('should update pagination when list changes', async () => {
    const list = ref(Array.from({ length: 50 }, (_, i) => ({ id: i + 1 })))
    const { currentPageData, pagination } = useClientPagination(list, {
      defaultValues: { page: 1, pageSize: 10, itemCount: 50 },
    })

    list.value = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }))
    await nextTick()

    expect(pagination.itemCount).toBe(100)
    expect(currentPageData.value.length).toBe(10)
    expect(currentPageData.value[0].id).toBe(1)
    expect(currentPageData.value[9].id).toBe(10)
  })

  it('should handle empty list', () => {
    const list = ref([])
    const { currentPageData, pagination } = useClientPagination(list, {
      defaultValues: { page: 1, pageSize: 10, itemCount: 0 },
    })

    expect(currentPageData.value.length).toBe(0)
    expect(pagination.itemCount).toBe(0)
  })

  it('should call onPageChange when page is updated', async () => {
    const onPageChange = vi.fn()
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i + 1 })))
    const { onUpdatePage } = useClientPagination(list, {
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
      onPageChange,
    })

    onUpdatePage(2)
    await nextTick()

    expect(onPageChange).toHaveBeenCalledWith(expect.objectContaining({ page: 2, pageSize: 10, itemCount: 100 }))
  })

  it('should call onPageSizeChange when pageSize is updated', async () => {
    const onPageSizeChange = vi.fn()
    const list = ref(Array.from({ length: 100 }, (_, i) => ({ id: i + 1 })))
    const { onUpdatePageSize } = useClientPagination(list, {
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
      onPageSizeChange,
    })

    onUpdatePageSize(20)
    await nextTick()

    expect(onPageSizeChange).toHaveBeenCalledWith(expect.objectContaining({ page: 1, pageSize: 20, itemCount: 100 }))
  })
})
