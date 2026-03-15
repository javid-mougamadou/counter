import { useState } from 'react'
import type { Counter } from '../types/counter'

interface CounterCarouselViewProps {
  counters: Counter[]
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
}

export function CounterCarouselView({
  counters,
  onIncrement,
  onDecrement,
  onRemove,
}: CounterCarouselViewProps) {
  const [index, setIndex] = useState(0)
  const length = counters.length
  const clampedIndex = length > 0 ? Math.min(index, length - 1) : 0
  const current = counters[clampedIndex] ?? null
  const hasMultiple = length >= 2
  const canGoPrev = hasMultiple
  const canGoNext = hasMultiple

  const goPrev = () => {
    if (!hasMultiple) return
    setIndex(clampedIndex > 0 ? clampedIndex - 1 : length - 1)
  }

  const goNext = () => {
    if (!hasMultiple) return
    setIndex(clampedIndex < length - 1 ? clampedIndex + 1 : 0)
  }

  if (counters.length === 0) return null

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      <h2 className="shrink-0 text-center text-base font-medium text-base-content/90 px-2 py-1">
        Number of counters ({counters.length})
      </h2>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 min-h-0">
        <div className="flex w-full max-w-sm items-center gap-2">
          <button
            type="button"
            className="btn btn-circle btn-ghost shrink-0"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous counter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 1 1 1.06 1.06L9.31 12l2.97 2.97a.75.75 0 1 1-1.06 1.06l-3.75-3.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex-1 flex flex-col items-center gap-2 min-w-0">
            {current && (
              <>
                <span className="text-sm font-medium text-base-content/80 truncate max-w-full">
                  {current.label}
                </span>
                <button
                  type="button"
                  className="btn btn-ghost font-mono text-3xl min-h-[3rem]"
                  onClick={() => onIncrement(current.id)}
                  aria-label={`Increment ${current.label}`}
                >
                  {current.value}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-circle"
                    onClick={() => onDecrement(current.id)}
                    aria-label="Decrement"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-circle"
                    onClick={() => onIncrement(current.id)}
                    aria-label="Increment"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => onRemove(current.id)}
                  aria-label="Remove"
                >
                  Remove
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className="btn btn-circle btn-ghost shrink-0"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next counter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06L14.69 12 11.72 9.03a.75.75 0 0 1 1.06-1.06l3.75 3.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
