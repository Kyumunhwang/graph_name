import { useState } from 'react'

interface StackRow {
  label: string
  mobile: number
  web: number
  store: number
}

const DATA: StackRow[] = [
  { label: '1분기', mobile: 34, web: 22, store: 16 },
  { label: '2분기', mobile: 44, web: 26, store: 20 },
  { label: '3분기', mobile: 40, web: 25, store: 18 },
  { label: '4분기', mobile: 52, web: 28, store: 22 },
]

type SeriesKey = 'mobile' | 'web' | 'store'

const SERIES_META: { key: SeriesKey; label: string; color: string }[] = [
  { key: 'mobile', label: '모바일 앱', color: '#3182F6' },
  { key: 'web', label: '웹 스토어', color: '#75AAFC' },
  { key: 'store', label: '오프라인', color: '#D1E3FE' },
]

export function StackedBarDemo() {
  const [activeIdx, setActiveIdx] = useState<number>(3)
  const [visible, setVisible] = useState<Record<SeriesKey, boolean>>({
    mobile: true,
    web: true,
    store: true,
  })

  const getSum = (row: StackRow) =>
    (visible.mobile ? row.mobile : 0) +
    (visible.web ? row.web : 0) +
    (visible.store ? row.store : 0)

  const maxSum = Math.max(...DATA.map(getSum), 1)
  const current = DATA[activeIdx]
  const currentSum = getSum(current)

  const toggleSeries = (key: SeriesKey) => {
    const activeCount = Object.values(visible).filter(Boolean).length
    if (visible[key] && activeCount === 1) return
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-xs">
        <div className="mb-3 flex items-baseline justify-between">
          <div>
            <p className="text-xs font-medium text-[#8B95A1]">채널별 누적 실적</p>
            <p className="mt-0.5 text-lg font-bold text-[#191F28]">
              {current.label} 총 <span className="text-[#3182F6]">{currentSum}억</span>
            </p>
          </div>
          <span className="text-[11px] font-medium text-[#8B95A1]">범례 클릭 시 필터링</span>
        </div>

        <div className="flex h-40 items-end justify-between gap-4 rounded-2xl bg-[#F9FAFB] px-5 pb-3 pt-6">
          {DATA.map((row, idx) => {
            const total = getSum(row)
            const totalPct = Math.round((total / maxSum) * 100)
            const isActive = idx === activeIdx

            return (
              <button
                key={row.label}
                type="button"
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className="flex flex-1 flex-col items-center gap-1.5 focus:outline-none"
              >
                <span
                  className={`text-[11px] font-bold transition-colors ${
                    isActive ? 'text-[#3182F6]' : 'text-[#8B95A1]'
                  }`}
                >
                  {total}
                </span>
                <div className="flex h-24 w-full items-end">
                  <div
                    style={{ height: `${totalPct}%` }}
                    className={`flex w-full flex-col-reverse overflow-hidden rounded-t-lg transition-all duration-500 ease-out ${
                      isActive ? 'ring-2 ring-[#3182F6]/30' : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    {SERIES_META.map((s) => {
                      if (!visible[s.key] || total === 0) return null
                      const segPct = (row[s.key] / total) * 100
                      return (
                        <div
                          key={s.key}
                          style={{ height: `${segPct}%`, backgroundColor: s.color }}
                          className="w-full transition-all duration-300"
                        />
                      )
                    })}
                  </div>
                </div>
                <span
                  className={`text-xs ${
                    isActive ? 'font-bold text-[#191F28]' : 'font-medium text-[#8B95A1]'
                  }`}
                >
                  {row.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Breakdown Row */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {SERIES_META.map((s) => {
            const isShown = visible[s.key]
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => toggleSeries(s.key)}
                className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all ${
                  isShown
                    ? 'bg-[#F2F4F6] text-[#191F28]'
                    : 'bg-[#F9FAFB] text-[#B0B8C1] line-through'
                }`}
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: isShown ? s.color : '#D1D6DB' }}
                  />
                  {s.label}
                </span>
                <span className="font-bold">{current[s.key]}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
