import { useState } from 'react'

export function GaugeDemo() {
  const [score, setScore] = useState<number>(84)
  const clamped = Math.max(0, Math.min(100, score))

  const radius = 64
  const semiCircumference = Math.PI * radius
  const activeLength = (clamped / 100) * semiCircumference
  const needleAngle = -90 + (clamped / 100) * 180

  const statusText =
    clamped >= 80 ? '매우 양호' : clamped >= 50 ? '보통 수준' : '점검 필요'
  const activeColor = clamped >= 50 ? '#3182F6' : '#F04452'

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-center rounded-3xl border border-[#E5E8EB] bg-white p-6 shadow-xs">
        <div className="mb-1 flex w-full items-center justify-between">
          <span className="text-xs font-medium text-[#8B95A1]">실시간 서비스 지수</span>
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-bold"
            style={{
              backgroundColor: clamped >= 50 ? '#E8F3FF' : '#FFEBEE',
              color: activeColor,
            }}
          >
            {statusText}
          </span>
        </div>

        <svg viewBox="0 0 180 116" className="w-56">
          {/* Background Track */}
          <path
            d="M 26 94 A 64 64 0 0 1 154 94"
            fill="none"
            stroke="#E5E8EB"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Active Arc */}
          <path
            d="M 26 94 A 64 64 0 0 1 154 94"
            fill="none"
            stroke={activeColor}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${activeLength} ${semiCircumference}`}
            className="transition-all duration-500 ease-out"
          />

          {/* Needle */}
          <g
            transform={`translate(90, 94) rotate(${needleAngle})`}
            className="transition-transform duration-500 ease-out"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-48"
              stroke="#333D4B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="6.5" fill="#333D4B" />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>
        </svg>

        <p className="mt-1 text-sm font-semibold text-[#4E5968]">
          현재 만족도{' '}
          <span className="text-base font-bold" style={{ color: activeColor }}>
            {clamped}점
          </span>
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-2.5 rounded-2xl border border-[#E5E8EB] bg-white px-4 py-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#4E5968]">점수 조절 슬라이더</span>
          <span className="font-mono font-bold text-[#3182F6]">{clamped} / 100</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={clamped}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full cursor-pointer accent-[#3182F6]"
        />
        <div className="flex justify-between gap-1.5 pt-0.5">
          {[
            { label: '주의 38점', val: 38 },
            { label: '양호 72점', val: 72 },
            { label: '최상 98점', val: 98 },
          ].map((preset) => (
            <button
              key={preset.val}
              type="button"
              onClick={() => setScore(preset.val)}
              className="flex-1 rounded-xl bg-[#F2F4F6] py-1.5 text-xs font-semibold text-[#4E5968] hover:bg-[#E5E8EB]"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
