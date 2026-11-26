import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface BarPoint {
  label: string
  value: number
  unit: string
}

const PRESETS: Record<'weekly' | 'monthly', { title: string; items: BarPoint[] }> = {
  weekly: {
    title: '요일별 방문자',
    items: [
      { label: '월', value: 46, unit: '만' },
      { label: '화', value: 68, unit: '만' },
      { label: '수', value: 53, unit: '만' },
      { label: '목', value: 92, unit: '만' },
      { label: '금', value: 64, unit: '만' },
    ],
  },
  monthly: {
    title: '월별 신규 가입',
    items: [
      { label: '7월', value: 38, unit: '천' },
      { label: '8월', value: 54, unit: '천' },
      { label: '9월', value: 61, unit: '천' },
      { label: '10월', value: 84, unit: '천' },
      { label: '11월', value: 76, unit: '천' },
    ],
  },
}

export function BarChartDemo() {
  const [preset, setPreset] = useState<'weekly' | 'monthly'>('weekly')
  const [customItems, setCustomItems] = useState<BarPoint[] | null>(null)
  const [activeIdx, setActiveIdx] = useState<number>(3)
  const [showValues, setShowValues] = useState<boolean>(true)

  const items = customItems ?? PRESETS[preset].items
  const maxVal = Math.max(...items.map((item) => item.value), 1)
  const active = items[activeIdx] ?? items[0]

  const handlePresetChange = (next: 'weekly' | 'monthly') => {
    setPreset(next)
    setCustomItems(null)
    setActiveIdx(3)
  }

  const handleRandomize = () => {
    const base = PRESETS[preset].items
    const randomized = base.map((item) => ({
      ...item,
      value: Math.floor(28 + Math.random() * 70),
    }))
    const maxIndex = randomized.reduce(
      (best, cur, idx, arr) => (cur.value > arr[best].value ? idx : best),
      0,
    )
    setCustomItems(randomized)
    setActiveIdx(maxIndex)
  }

  return (
    <div className="space-y-3">
      {/* Interactive Demo Card */}
      <div className="rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-[#8B95A1]">{PRESETS[preset].title}</p>
            <p className="mt-0.5 text-xl font-bold tracking-tight text-[#191F28]">
              {active.label} ·{' '}
              <span className="text-[#3182F6]">
                {active.value}
                {active.unit}
              </span>
            </p>
          </div>
          <span className="rounded-full bg-[#E8F3FF] px-2.5 py-1 text-[11px] font-bold text-[#3182F6]">
            선택됨
          </span>
        </div>

        {/* SVG / CSS Hybrid Bar Chart */}
        <div className="flex h-40 items-end justify-between gap-3 rounded-2xl bg-[#F9FAFB] px-4 pb-3 pt-6">
          {items.map((item, idx) => {
            const isActive = idx === activeIdx
            const pct = Math.max(12, Math.round((item.value / maxVal) * 100))
            return (
              <button
                key={item.label}
                type="button"
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className="group flex flex-1 flex-col items-center gap-1.5 focus:outline-none"
              >
                <span
                  className={`text-[11px] font-bold transition-all duration-200 ${
                    isActive
                      ? 'translate-y-0 text-[#3182F6] opacity-100'
                      : showValues
                        ? 'text-[#8B95A1] opacity-80'
                        : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                  }`}
                >
                  {item.value}
                </span>
                <div className="flex h-24 w-full items-end">
                  <div
                    style={{ height: `${pct}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 ease-out ${
                      isActive
                        ? 'bg-[#3182F6] shadow-[0_6px_14px_rgba(49,130,246,0.28)]'
                        : 'bg-[#E5EFFE] group-hover:bg-[#C2DDFD]'
                    }`}
                  />
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'font-bold text-[#191F28]' : 'font-medium text-[#8B95A1]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#E5E8EB] bg-white px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handlePresetChange('weekly')}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors ${
              preset === 'weekly'
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
            }`}
          >
            주간 데이터
          </button>
          <button
            type="button"
            onClick={() => handlePresetChange('monthly')}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition-colors ${
              preset === 'monthly'
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
            }`}
          >
            월간 데이터
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowValues((v) => !v)}
            className="rounded-xl bg-[#F2F4F6] px-2.5 py-1 text-xs font-semibold text-[#4E5968] hover:bg-[#E5E8EB]"
          >
            수치 {showValues ? '숨김' : '표시'}
          </button>
          <button
            type="button"
            onClick={handleRandomize}
            className="inline-flex items-center gap-1 rounded-xl bg-[#E8F3FF] px-2.5 py-1 text-xs font-semibold text-[#3182F6] hover:bg-[#D0E4FF]"
          >
            <RefreshCw className="h-3 w-3" />
            랜덤
          </button>
        </div>
      </div>
    </div>
  )
}
