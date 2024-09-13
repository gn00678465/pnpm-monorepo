import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useNPagination } from './useNPagination'

// Mock useClamp function
vi.mock('./useClamp', () => ({
  useClamp: vi.fn((value, min, max) => ({ value: Math.min(Math.max(value, min), max) })),
}))

describe('useNPagination', () => {
  it('should initialize with default values', () => {
    const { pagination } = useNPagination({
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
    })
    expect(pagination).toEqual({ page: 1, pageSize: 10, itemCount: 100 })
  })

  it('should update page', async () => {
    const onPageChange = vi.fn()
    const { pagination, onUpdatePage } = useNPagination({
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
      onPageChange,
    })
    onUpdatePage(2)
    await nextTick()
    expect(pagination.page).toBe(2)
    expect(onPageChange).toHaveBeenCalledWith({ page: 2, pageSize: 10, itemCount: 100 })
  })

  it('should update page size', async () => {
    const onPageSizeChange = vi.fn()
    const { pagination, onUpdatePageSize } = useNPagination({
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
      onPageSizeChange,
    })
    onUpdatePageSize(20)
    await nextTick()
    expect(pagination.pageSize).toBe(20)
    expect(onPageSizeChange).toHaveBeenCalledWith({ page: 1, pageSize: 20, itemCount: 100 })
  })

  it('should calculate page count correctly', async () => {
    const onPageCountChange = vi.fn()
    const { pagination } = useNPagination({
      defaultValues: { page: 1, pageSize: 10, itemCount: 100 },
      onPageCountChange,
    })
    pagination.itemCount = 25
    await nextTick()
    expect(onPageCountChange).toHaveBeenCalledWith({ page: 1, pageSize: 10, itemCount: 25 })
  })

  it('should clamp page number when page count changes', async () => {
    const { pagination } = useNPagination({
      defaultValues: { page: 10, pageSize: 10, itemCount: 100 },
    })
    pagination.itemCount = 25
    await nextTick()
    expect(pagination.page).toBe(3) // Clamped to max page (ceil(25/10) = 3)
  })

  it('should handle zero items', async () => {
    const { pagination } = useNPagination({
      defaultValues: { page: 1, pageSize: 10, itemCount: 0 },
    })
    expect(pagination.page).toBe(1)
  })
})
