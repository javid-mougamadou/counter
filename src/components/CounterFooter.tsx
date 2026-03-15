export type ViewMode = 'cards' | 'list' | 'carousel'

interface CounterFooterProps {
  onResetAll: () => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  hasCounters: boolean
}

const VIEW_OPTIONS: { value: ViewMode; label: string }[] = [
  { value: 'cards', label: 'Cards' },
  { value: 'list', label: 'List' },
  { value: 'carousel', label: 'Carousel' },
]

export function CounterFooter({
  onResetAll,
  viewMode,
  onViewModeChange,
  hasCounters,
}: CounterFooterProps) {
  if (!hasCounters) return null

  return (
    <footer className="flex flex-wrap items-center justify-center gap-2 border-t border-base-300 bg-base-100 p-3">
      <button
        type="button"
        className="btn btn-outline btn-sm"
        onClick={onResetAll}
      >
        Reset all
      </button>
      <select
        className="select select-bordered select-sm w-auto max-w-[140px]"
        value={viewMode}
        onChange={(e) => onViewModeChange(e.target.value as ViewMode)}
        aria-label="View mode"
      >
        {VIEW_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </footer>
  )
}
