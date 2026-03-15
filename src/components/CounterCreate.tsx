import { useState } from 'react'
import type { FormEvent } from 'react'

interface CounterCreateProps {
  onAdd: (label: string, initialValue: number) => void
  isEmpty: boolean
}

const DEFAULT_INITIAL_VALUE = 0

export function CounterCreate({ onAdd, isEmpty }: CounterCreateProps) {
  const [label, setLabel] = useState('')
  const [initialValue, setInitialValue] = useState<string>(String(DEFAULT_INITIAL_VALUE))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = Number.parseInt(initialValue, 10)
    onAdd(label, Number.isNaN(value) ? DEFAULT_INITIAL_VALUE : value)
    setLabel('')
    setInitialValue(String(DEFAULT_INITIAL_VALUE))
  }

  return (
    <div
      className={
        isEmpty
          ? 'flex flex-1 items-center justify-center p-4'
          : 'flex justify-center bg-base-100 p-4'
      }
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-wrap items-center justify-center gap-2"
      >
        <input
          type="text"
          placeholder="Counter name..."
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="input input-bordered input-sm flex-1 min-w-[120px]"
          aria-label="Counter name"
        />
        <input
          type="number"
          value={initialValue}
          onChange={(e) => setInitialValue(e.target.value)}
          className="input input-bordered input-sm w-20"
          aria-label="Initial value"
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm btn-circle"
          aria-label="Add counter"
          title="Add counter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}
