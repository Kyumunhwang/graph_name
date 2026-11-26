import { useState } from 'react'

interface ProductSpark {
  id: string
  name: string
  price: string
  delta7d: number
  delta30d: number
  series7d: number[]
  series30d: number[]
}

const PRODUCTS: ProductSpark[] = [
  {
    id: 'cardigan',
    name: '니트 가디건',
    price: '32,000원',
    delta7d: 12,
    delta30d: 24,
    series7d: [22, 29, 25, 42, 39, 54, 64],
    series30d: [18, 22, 31, 29, 44, 52, 68],
  },
  {
    id: 'padding',
    name: '패딩 점퍼',
    price: '58,000원',
    delta7d: -8,
    delta30d: -14,
    series7d: [64, 56, 59, 45, 48, 34, 28],
    series30d: [74, 70, 62, 55, 49, 38, 30],
  },
  {
    id: 'denim',
    name: '코튼 슬랙스',
    price: '44,000원',
    delta7d: 5,
    delta30d: 9,
    series7d: [34, 32, 38, 36, 41, 40, 46],
    series30d: [30, 35, 33, 39, 42, 44, 48],
  },
]

function SparkSvg({
  points,
  positive,
  onHoverPoint,
}: {
  points: number[]
  positive: boolean
  onHoverPoint: (val: number | null, idx: number | null) => void
}) {
  const W = 88
  const H = 28
  const min = Math.min(...points)
  const max = Math.max(...points)
  const color = positive ? '#3182F6' : '#F04452'

  const coords = points.map((p, idx) => ({
    x: 4 + (idx / (points.length - 1)) * (W - 8),
    y: H - 4 - ((p - min) / (max - min || 1)) * (H - 8),
    val: p,
  }))

  const d = coords.map((c, idx) => `${idx === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')

  return (
    <svg
      width={W}
      height={H}
      className="overflow-visible"
      onMouseLeave={() => onHoverPoint(null, null)}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={coords[coords.length - 1].x}
        cy={coords[coords.length - 1].y}
        r="2.5"
        fill={color}
      />
      {coords.map((c, idx) => (
        <rect
          key={idx}
          x={c.x - 6}
          y={0}
          width={12}
          height={H}
          fill="transparent"
          className="cursor-pointer"
          onMouseEnter={() => onHoverPoint(c.val, idx)}
        />
      ))}
    </svg>
  )
}

export function SparklineDemo() {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d')
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-[#8B95A1]">출고 사례</span>
          <span className="text-[11px] font-semibold text-[#3182F6]">
            {hoveredInfo ?? '선 위에 마우스를 올려보세요'}
          </span>
        </div>

        <div className="divide-y divide-[#F2F4F6]">
          {PRODUCTS.map((item) => {
            const delta = period === '7d' ? item.delta7d : item.delta30d
            const points = period === '7d' ? item.series7d : item.series30d
            const isPos = delta >= 0
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-3.5 first:pt-1 last:pb-1"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#191F28]">{item.name}</p>
                  <p className="mt-0.5 text-xs text-[#8B95A1]">{item.price}</p>
                </div>

                <SparkSvg
                  points={points}
                  positive={isPos}
                  onHoverPoint={(val, idx) => {
                    if (val === null || idx === null) {
                      setHoveredInfo(null)
                    } else {
                      setHoveredInfo(`${item.name} · ${idx + 1}구간 ${val}건`)
                    }
                  }}
                />

                <span
                  className={`w-12 text-right text-xs font-bold ${
                    isPos ? 'text-[#3182F6]' : 'text-[#F04452]'
                  }`}
                >
                  {isPos ? `+${delta}%` : `${delta}%`}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white px-3.5 py-2.5">
        <span className="text-xs font-medium text-[#8B95A1]">비교 기간</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setPeriod('7d')}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
              period === '7d' ? 'bg-[#3182F6] text-white' : 'bg-[#F2F4F6] text-[#4E5968]'
            }`}
          >
            최근 7일
          </button>
          <button
            type="button"
            onClick={() => setPeriod('30d')}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
              period === '30d' ? 'bg-[#3182F6] text-white' : 'bg-[#F2F4F6] text-[#4E5968]'
            }`}
          >
            최근 30일
          </button>
        </div>
      </div>
    </div>
  )
}
