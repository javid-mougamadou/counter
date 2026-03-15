import { useState, useEffect, useCallback } from 'react'
import type { Counter } from '../types/counter'

const STORAGE_KEY = 'counter-counters'

function loadCounters(): Counter[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Counter[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCounters(counters: Counter[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counters))
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useCounters() {
  const [counters, setCounters] = useState<Counter[]>(loadCounters)

  useEffect(() => {
    saveCounters(counters)
  }, [counters])

  const addCounter = useCallback((label: string, initialValue: number = 0) => {
    const trimmed = label.trim()
    if (!trimmed) return
    setCounters((prev) => {
      const maxOrder = prev.length === 0 ? 0 : Math.max(...prev.map((c) => c.order))
      return [
        ...prev,
        {
          id: generateId(),
          label: trimmed,
          value: initialValue,
          order: maxOrder + 1,
        },
      ]
    })
  }, [])

  const increment = useCallback((id: string) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: c.value + 1 } : c))
    )
  }, [])

  const decrement = useCallback((id: string) => {
    setCounters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value: c.value - 1 } : c))
    )
  }, [])

  const removeCounter = useCallback((id: string) => {
    setCounters((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const reorderCounters = useCallback((orderedIds: string[]) => {
    setCounters((prev) => {
      const byId = new Map(prev.map((c) => [c.id, c]))
      const restIds = prev.map((c) => c.id).filter((id) => !orderedIds.includes(id))
      const combined = [...orderedIds, ...restIds]
      return combined
        .map((id, index) => {
          const c = byId.get(id)
          return c ? { ...c, order: index } : null
        })
        .filter((c): c is Counter => c !== null)
    })
  }, [])

  const resetAll = useCallback(() => {
    setCounters([])
  }, [])

  return {
    counters,
    addCounter,
    increment,
    decrement,
    removeCounter,
    reorderCounters,
    resetAll,
  }
}
