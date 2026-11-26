import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

export function ProgressRingDemo() {
  const [total, setTotal] = useState<number>(5)
  const [done, setDone] = useState<number>(4)

  const safeDone = Math.min(done, total)
  const pct = total > 0 ? Math.round((safeDone / total) * 100) : 0
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  const handleTotalChange = (nextTotal: number) => {
    setTotal(nextTotal)
    if (done > nextTotal) {
      setDone(nextTotal)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-5 rounded-3xl border border-[#E5E8EB] bg-white p-6 shadow-xs">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="#E5E8EB"
              strokeWidth="9.5"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke={pct === 100 ? '#03B26C' : '#3182F6'}
              strokeWidth="9.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#191F28]">
            {pct}%
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-[#E8F3FF] px-2 py-0.5 text-[11px] font-bold text-[#3182F6]">
            {pct === 100 ? '목표 달성!' : '진행 중'}
          </span>
          <p className="mt-2 text-xs font-medium text-[#8B95A1]">이번 달 목표</p>
          <p className="mt-0.5 text-lg font-bold text-[#191F28]">
            {total}건 중 <span className="text-[#3182F6]">{safeDone}건</span>
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E5E8EB] bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#4E5968]">완료 건수</span>
          <button
            type="button"
            onClick={() => setDone((d) => Math.max(0, d - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
            aria-label="완료 건수 감소"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center text-xs font-bold text-[#191F28]">{safeDone}</span>
          <button
            type="button"
            onClick={() => setDone((d) => Math.min(total, d + 1))}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F3FF] text-[#3182F6] hover:bg-[#D0E4FF]"
            aria-label="완료 건수 증가"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-[#8B95A1]">목표</span>
          {[5, 8, 10].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTotalChange(t)}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
                total === t ? 'bg-[#3182F6] text-white' : 'bg-[#F2F4F6] text-[#4E5968]'
              }`}
            >
              {t}건
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
