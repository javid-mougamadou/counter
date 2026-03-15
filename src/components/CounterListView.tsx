import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Counter } from '../types/counter'
import { CounterRow } from './CounterRow'

interface CounterListViewProps {
  counters: Counter[]
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onRemove: (id: string) => void
  onReorder: (orderedIds: string[]) => void
}

export function CounterListView({
  counters,
  onIncrement,
  onDecrement,
  onRemove,
  onReorder,
}: CounterListViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = counters.findIndex((c) => c.id === active.id)
    const newIndex = counters.findIndex((c) => c.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    const reordered = arrayMove(counters, oldIndex, newIndex)
    onReorder(reordered.map((c) => c.id))
  }

  return (
    <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
      <h2 className="shrink-0 text-center text-base font-medium text-base-content/90 px-2 py-1">
        Number of counters ({counters.length})
      </h2>
      <div className="min-h-0 max-h-[60vh] flex-1 overflow-y-auto overscroll-contain">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={counters.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex w-full flex-col gap-1 p-2 list-none">
              {counters.map((counter) => (
                <CounterRow
                  key={counter.id}
                  counter={counter}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
