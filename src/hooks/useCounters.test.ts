import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCounters } from './useCounters'

const STORAGE_KEY = 'counter-counters'

describe('useCounters', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY)
  })

  it('starts with an empty list', () => {
    const { result } = renderHook(() => useCounters())
    expect(result.current.counters).toEqual([])
  })

  it('adds a counter with default initial value', () => {
    const { result } = renderHook(() => useCounters())
    act(() => {
      result.current.addCounter('My counter')
    })
    expect(result.current.counters).toHaveLength(1)
    expect(result.current.counters[0].label).toBe('My counter')
    expect(result.current.counters[0].value).toBe(0)
  })

  it('adds a counter with custom initial value', () => {
    const { result } = renderHook(() => useCounters())
    act(() => {
      result.current.addCounter('Score', 10)
    })
    expect(result.current.counters).toHaveLength(1)
    expect(result.current.counters[0].label).toBe('Score')
    expect(result.current.counters[0].value).toBe(10)
  })

  it('ignores empty label', () => {
    const { result } = renderHook(() => useCounters())
    act(() => {
      result.current.addCounter('   ')
    })
    expect(result.current.counters).toHaveLength(0)
  })

  it('increments a counter', () => {
    const { result } = renderHook(() => useCounters())
    act(() => {
      result.current.addCounter('Clicks')
    })
    const id = result.current.counters[0].id
    expect(result.current.counters[0].value).toBe(0)
    act(() => {
      result.current.increment(id)
    })
    expect(result.current.counters[0].value).toBe(1)
  })

  it('decrements a counter', () => {
    const { result } = renderHook(() => useCounters())
    act(() => {
      result.current.addCounter('Clicks', 5)
    })
    const id = result.current.counters[0].id
    act(() => {
      result.current.decrement(id)
    })
    expect(result.current.counters[0].value).toBe(4)
  })

  it('removes a counter', () => {
    const { result } = renderHook(() => useCounters())
    act(() => {
      result.current.addCounter('To remove')
    })
    expect(result.current.counters).toHaveLength(1)
    act(() => {
      result.current.removeCounter(result.current.counters[0].id)
    })
    expect(result.current.counters).toHaveLength(0)
  })

  it('resetAll clears the list', () => {
    const { result } = renderHook(() => useCounters())
    act(() => {
      result.current.addCounter('One')
      result.current.addCounter('Two')
    })
    expect(result.current.counters).toHaveLength(2)
    act(() => {
      result.current.resetAll()
    })
    expect(result.current.counters).toHaveLength(0)
  })
})
