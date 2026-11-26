import { useState } from 'react'

interface Segment {
  label: string
  value: number
  color: string
}

const PRESETS: Record<'payment' | 'age', { title: string; segments: Segment[] }> = {
  payment: {
    title: '결제 수단 비중',
    segments: [
      { label: '간편결제', value: 62, color: '#3182F6' },
      { label: '신용카드', value: 23, color: '#8BB8FA' },
      { label: '계좌이체', value: 15, color: '#E5E8EB' },
    ],
  },
  age: {
    title: '사용자 연령대',
    segments: [
      { label: '20~30대', value: 54, color: '#3182F6' },
      { label: '40대', value: 31, color: '#8BB8FA' },
      { label: '50대 이상', value: 15, color: '#E5E8EB' },
    ],
  },
}

export function DonutChartDemo() {
  const [preset, setPreset] = useState<'payment' | 'age'>('payment')
  const [activeIdx, setActiveIdx] = useState<number>(0)

  const current = PRESETS[preset]
  const radius = 44
  const circumference = 2 * Math.PI * radius
  let acc = 0

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium text-[#8B95A1]">{current.title}</p>
          <span className="text-xs font-semibold text-[#4E5968]">세그먼트를 눌러보세요</span>
        </div>

        <div className="flex flex-col items-center py-2">
          <div className="relative h-40 w-40">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              {current.segments.map((seg, idx) => {
                const dash = (seg.value / 100) * circumference
                const offset = -acc
                acc += dash
                const isActive = idx === activeIdx
                return (
                  <circle
                    key={seg.label}
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={isActive ? 19 : 15}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={offset}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                  />
                )
              })}
            </svg>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold tracking-tight text-[#191F28]">
                {current.segments[activeIdx].value}%
              </span>
              <span className="mt-0.5 text-[11px] font-semibold text-[#8B95A1]">
                {current.segments[activeIdx].label}
              </span>
            </div>
          </div>

          <div className="mt-4 grid w-full grid-cols-3 gap-2">
            {current.segments.map((seg, idx) => {
              const isActive = idx === activeIdx
              return (
                <button
                  key={seg.label}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`flex flex-col items-center rounded-2xl px-2 py-2 text-center transition-all ${
                    isActive
                      ? 'bg-[#E8F3FF] ring-1 ring-[#3182F6]/30'
                      : 'bg-[#F9FAFB] hover:bg-[#F2F4F6]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-[11px] font-semibold text-[#4E5968]">{seg.label}</span>
                  </div>
                  <span className="mt-0.5 text-xs font-bold text-[#191F28]">{seg.value}%</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white px-3.5 py-2.5">
        <span className="text-xs font-medium text-[#8B95A1]">데이터셋 전환</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => {
              setPreset('payment')
              setActiveIdx(0)
            }}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
              preset === 'payment'
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#F2F4F6] text-[#4E5968]'
            }`}
          >
            결제 수단
          </button>
          <button
            type="button"
            onClick={() => {
              setPreset('age')
              setActiveIdx(0)
            }}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
              preset === 'age'
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#F2F4F6] text-[#4E5968]'
            }`}
          >
            연령대
          </button>
        </div>
      </div>
    </div>
  )
}
