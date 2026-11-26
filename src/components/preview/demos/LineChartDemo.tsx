import { useState } from 'react'

interface LinePoint {
  label: string
  value: number
}

const DATASETS: Record<'orders' | 'dau', { title: string; unit: string; points: LinePoint[] }> = {
  orders: {
    title: '이번 주 주문',
    unit: '건',
    points: [
      { label: '월', value: 18 },
      { label: '화', value: 34 },
      { label: '수', value: 28 },
      { label: '목', value: 58 },
      { label: '금', value: 50 },
      { label: '토', value: 82 },
      { label: '일', value: 76 },
    ],
  },
  dau: {
    title: '일별 활성 사용자',
    unit: '명',
    points: [
      { label: '월', value: 420 },
      { label: '화', value: 480 },
      { label: '수', value: 510 },
      { label: '목', value: 495 },
      { label: '금', value: 640 },
      { label: '토', value: 720 },
      { label: '일', value: 790 },
    ],
  },
}

function buildSmoothPath(coords: { x: number; y: number }[]) {
  if (coords.length === 0) return ''
  return coords.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`
    const prev = coords[idx - 1]
    const cx = (prev.x + pt.x) / 2
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`
  }, '')
}

export function LineChartDemo() {
  const [datasetKey, setDatasetKey] = useState<'orders' | 'dau'>('orders')
  const [smooth, setSmooth] = useState<boolean>(false)
  const [hoverIdx, setHoverIdx] = useState<number>(6)

  const dataset = DATASETS[datasetKey]
  const W = 280
  const H = 132
  const padX = 14
  const padY = 18
  const minVal = Math.min(...dataset.points.map((p) => p.value)) * 0.7
  const maxVal = Math.max(...dataset.points.map((p) => p.value)) * 1.12

  const coords = dataset.points.map((p, idx) => ({
    ...p,
    x: padX + (idx / (dataset.points.length - 1)) * (W - padX * 2),
    y: padY + (1 - (p.value - minVal) / (maxVal - minVal || 1)) * (H - padY * 2),
  }))

  const linePath = smooth
    ? buildSmoothPath(coords)
    : coords.map((c, idx) => `${idx === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ')

  const areaPath = `${linePath} L ${coords[coords.length - 1].x} ${H - padY} L ${coords[0].x} ${H - padY} Z`
  const active = coords[hoverIdx] ?? coords[coords.length - 1]

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-xs">
        <div className="mb-2 flex items-baseline justify-between">
          <div>
            <p className="text-xs font-medium text-[#8B95A1]">{dataset.title}</p>
            <p className="mt-0.5 text-xl font-bold text-[#191F28]">
              {active.value.toLocaleString()}
              {dataset.unit}
            </p>
          </div>
          <span className="rounded-full bg-[#E8F3FF] px-2.5 py-1 text-[11px] font-bold text-[#3182F6]">
            {active.label}요일
          </span>
        </div>

        <div className="relative mt-1 rounded-2xl bg-[#F9FAFB] px-2 pt-2 pb-1">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
            <defs>
              <linearGradient id="demoLineArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3182F6" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#3182F6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Baseline Grid */}
            <line
              x1={padX}
              y1={H - padY}
              x2={W - padX}
              y2={H - padY}
              stroke="#E5E8EB"
              strokeWidth="1"
            />

            <path d={areaPath} fill="url(#demoLineArea)" className="transition-all duration-300" />
            <path
              d={linePath}
              fill="none"
              stroke="#3182F6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />

            {/* Hover Guide Line */}
            <line
              x1={active.x}
              y1={padY - 4}
              x2={active.x}
              y2={H - padY}
              stroke="#B8D4FE"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />

            {/* Active Point */}
            <circle cx={active.x} cy={active.y} r="8" fill="#3182F6" fillOpacity="0.16" />
            <circle
              cx={active.x}
              cy={active.y}
              r="4.5"
              fill="#3182F6"
              stroke="#FFFFFF"
              strokeWidth="2.2"
            />

            {/* X-axis Labels */}
            {coords.map((c, idx) => (
              <text
                key={c.label}
                x={c.x}
                y={H - 3}
                textAnchor="middle"
                fontSize="10"
                fontWeight={idx === hoverIdx ? '700' : '500'}
                fill={idx === hoverIdx ? '#191F28' : '#8B95A1'}
              >
                {c.label}
              </text>
            ))}

            {/* Invisible Hit Targets */}
            {coords.map((c, idx) => (
              <rect
                key={`hit-${c.label}`}
                x={c.x - 18}
                y={0}
                width={36}
                height={H}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoverIdx(idx)}
                onClick={() => setHoverIdx(idx)}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#E5E8EB] bg-white px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setDatasetKey('orders')
              setHoverIdx(6)
            }}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
              datasetKey === 'orders'
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
            }`}
          >
            이번 주 주문
          </button>
          <button
            type="button"
            onClick={() => {
              setDatasetKey('dau')
              setHoverIdx(6)
            }}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
              datasetKey === 'dau'
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
            }`}
          >
            활성 사용자
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSmooth((s) => !s)}
          className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
            smooth ? 'bg-[#E8F3FF] text-[#3182F6]' : 'bg-[#F2F4F6] text-[#4E5968]'
          }`}
        >
          {smooth ? '곡선 보간 ON' : '직선 연결'}
        </button>
      </div>
    </div>
  )
}
