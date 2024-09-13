import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useBoolean } from './useBoolean'

describe('useBoolean', () => {
  it('should initialize with the default value', () => {
    const { bool } = useBoolean()
    expect(bool.value).toBe(false)
  })

  it('should initialize with the provided value', () => {
    const { bool } = useBoolean(true)
    expect(bool.value).toBe(true)
  })

  it('should initialize with a ref value', () => {
    const initialValue = ref(true)
    const { bool } = useBoolean(initialValue)
    expect(bool.value).toBe(true)
  })

  it('should set the value to true', () => {
    const { bool, setTrue } = useBoolean(false)
    setTrue()
    expect(bool.value).toBe(true)
  })

  it('should set the value to false', () => {
    const { bool, setFalse } = useBoolean(true)
    setFalse()
    expect(bool.value).toBe(false)
  })

  it('should toggle the value', () => {
    const { bool, toggle } = useBoolean(false)
    toggle()
    expect(bool.value).toBe(true)
    toggle()
    expect(bool.value).toBe(false)
  })

  it('should set the value to the provided boolean', () => {
    const { bool, setBool } = useBoolean(false)
    setBool(true)
    expect(bool.value).toBe(true)
    setBool(false)
    expect(bool.value).toBe(false)
  })
})
