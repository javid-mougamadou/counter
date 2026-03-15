import type { Counter } from '../types/counter'
import type { ViewMode } from './CounterFooter'
import { CounterCard } from './CounterCard'
import { CounterListView } from './CounterListView'
import { CounterCarouselView } from './CounterCarouselView'

interface CounterListProps {
  counters: Counter[]
  viewMode: ViewMode
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
  onReorder: (orderedIds: string[]) => void
}

export function CounterList({
  counters,
  viewMode,
  onIncrement,
  onDecrement,
  onRemove,
  onReorder,
}: CounterListProps) {
  if (viewMode === 'carousel') {
    return (
      <CounterCarouselView
        counters={counters}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
      />
    )
  }

  if (viewMode === 'list') {
    return (
      <CounterListView
        counters={counters}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        onReorder={onReorder}
      />
    )
  }

  // cards (default)
  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      <h2 className="shrink-0 text-center text-base font-medium text-base-content/90 px-2 py-1">
        Number of counters ({counters.length})
      </h2>
      <div className="min-h-0 max-h-[60vh] flex-1 overflow-y-auto overscroll-contain p-2">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-2">
          {counters.map((counter) => (
            <CounterCard
              key={counter.id}
              counter={counter}
              onIncrement={onIncrement}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
