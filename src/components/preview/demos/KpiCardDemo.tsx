import { useState } from 'react'

interface KpiMetric {
  label: string
  value: string
  delta: number
  sub: string
}

const PERIOD_DATA: Record<'today' | 'week' | 'month', [KpiMetric, KpiMetric]> = {
  today: [
    { label: '오늘 매출', value: '4.8백만', delta: 12, sub: '어제 대비 +51만' },
    { label: '주문', value: '312건', delta: 8, sub: '객단가 15,380원' },
  ],
  week: [
    { label: '이번 주 매출', value: '3,240만', delta: 18, sub: '지난주 대비 +490만' },
    { label: '주문', value: '2,184건', delta: 11, sub: '재구매율 41%' },
  ],
  month: [
    { label: '이번 달 매출', value: '1.28억', delta: -4, sub: '전월 대비 -520만' },
    { label: '주문', value: '8,410건', delta: 5, sub: '신규 유입 +640건' },
  ],
}

export function KpiCardDemo() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today')
  const [selectedCard, setSelectedCard] = useState<number>(0)

  const metrics = PERIOD_DATA[period]

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-[#E5E8EB] bg-white p-4 shadow-xs">
        <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#F2F4F6] p-3">
          {metrics.map((item, idx) => {
            const isUp = item.delta >= 0
            const isSelected = selectedCard === idx
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setSelectedCard(idx)}
                className={`rounded-2xl bg-white p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-[#3182F6] shadow-sm'
                    : 'border border-[#E5E8EB]/70 hover:border-[#B8D4FE]'
                }`}
              >
                <p className="text-xs font-medium text-[#8B95A1]">{item.label}</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-[#191F28]">
                  {item.value}
                </p>
                <div className="mt-3 flex items-center justify-between gap-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      isUp
                        ? 'bg-[#E8F3FF] text-[#3182F6]'
                        : 'bg-[#FFEBEE] text-[#F04452]'
                    }`}
                  >
                    {isUp ? '▲' : '▼'} {Math.abs(item.delta)}%
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-2xl bg-[#F9FAFB] px-4 py-2.5 text-xs">
          <span className="font-medium text-[#8B95A1]">{metrics[selectedCard].label} 요약</span>
          <span className="font-bold text-[#191F28]">{metrics[selectedCard].sub}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white px-3.5 py-2.5">
        <span className="text-xs font-medium text-[#8B95A1]">집계 기간</span>
        <div className="flex gap-1.5">
          {[
            { key: 'today', label: '오늘' },
            { key: 'week', label: '이번 주' },
            { key: 'month', label: '이번 달' },
          ].map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPeriod(p.key as 'today' | 'week' | 'month')}
              className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
                period === p.key
                  ? 'bg-[#3182F6] text-white'
                  : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
