import { useMemo, useEffect } from 'react'
import { CounterCreate } from './components/CounterCreate'
import { CounterList } from './components/CounterList'
import { CounterFooter, type ViewMode } from './components/CounterFooter'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useCounters } from './hooks/useCounters'
import { useTheme } from './hooks/useTheme'
import { usePersistentState } from './hooks/usePersistentState'

const VIEW_MODE_KEY = 'counter.view-mode'

function parseViewMode(raw: string): ViewMode {
  if (raw === 'cards' || raw === 'list' || raw === 'carousel') return raw
  return 'cards'
}

function App() {
  useEffect(() => {
    document.title = 'Counter - Javid Mougamadou'
  }, [])

  const { theme, toggleTheme } = useTheme()
  const {
    counters,
    addCounter,
    increment,
    decrement,
    removeCounter,
    reorderCounters,
    resetAll,
  } = useCounters()

  const [viewMode, setViewMode] = usePersistentState<ViewMode>({
    key: VIEW_MODE_KEY,
    defaultValue: 'cards',
    serialize: (v) => v,
    deserialize: parseViewMode,
  })

  const sortedCounters = useMemo(
    () => [...counters].sort((a, b) => a.order - b.order),
    [counters]
  )

  const isEmpty = counters.length === 0

  return (
    <div className="flex min-h-[100dvh] flex-col items-center bg-base-200">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <div className="flex w-full max-w-lg flex-1 flex-col min-h-0 pt-16">
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center p-4">
            <CounterCreate onAdd={addCounter} isEmpty={true} />
          </div>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <CounterList
                counters={sortedCounters}
                viewMode={viewMode}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={removeCounter}
                onReorder={reorderCounters}
              />
            </div>
            <div className="shrink-0 border-t border-base-300 bg-base-100">
              <CounterCreate onAdd={addCounter} isEmpty={false} />
              <CounterFooter
                hasCounters={counters.length > 0}
                onResetAll={resetAll}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App
