import { ArrowUpRight } from 'lucide-react'
import { CHART_PATTERNS, type ChartPatternId } from '../../data/chartPatterns'

interface OverviewGridProps {
  onSelectPattern: (id: ChartPatternId) => void
}

function PatternThumbnail({ id }: { id: ChartPatternId }) {
  switch (id) {
    case 'bar-chart':
      return (
        <div className="flex h-28 w-full items-end justify-center gap-2.5 px-6 pb-2 pt-4">
          {[42, 65, 50, 92, 58].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`w-5 rounded-t-md ${i === 3 ? 'bg-[#3182F6]' : 'bg-[#E5EFFE]'}`}
            />
          ))}
        </div>
      )
    case 'line-chart':
      return (
        <div className="flex h-28 w-full flex-col justify-between p-3">
          <span className="text-[10px] font-medium text-[#8B95A1]">이번 주 주문</span>
          <svg viewBox="0 0 180 76" className="h-20 w-full overflow-visible">
            <defs>
              <linearGradient id="thumbLineG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3182F6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3182F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 4 64 L 34 46 L 64 52 L 94 24 L 124 32 L 154 8 L 174 12 L 174 72 L 4 72 Z"
              fill="url(#thumbLineG)"
            />
            <path
              d="M 4 64 L 34 46 L 64 52 L 94 24 L 124 32 L 154 8 L 174 12"
              fill="none"
              stroke="#3182F6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="174" cy="12" r="3.5" fill="#3182F6" stroke="#fff" strokeWidth="1.5" />
          </svg>
        </div>
      )
    case 'donut-chart':
      return (
        <div className="flex h-28 items-center justify-center">
          <div className="relative h-20 w-20">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="#3182F6"
                strokeWidth="14"
                strokeDasharray="132 213.6"
              />
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="#8BB8FA"
                strokeWidth="14"
                strokeDasharray="48 213.6"
                strokeDashoffset="-132"
              />
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="none"
                stroke="#E5E8EB"
                strokeWidth="14"
                strokeDasharray="34 213.6"
                strokeDashoffset="-180"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#191F28]">
              62%
            </span>
          </div>
        </div>
      )
    case 'sparkline':
      return (
        <div className="flex h-28 w-full flex-col justify-center gap-2.5 px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#191F28]">니트 가디건</p>
              <p className="text-[9px] text-[#8B95A1]">32,000원</p>
            </div>
            <svg width="56" height="18">
              <path
                d="M2 15 L14 10 L26 12 L38 6 L54 3"
                fill="none"
                stroke="#3182F6"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[10px] font-bold text-[#3182F6]">+12%</span>
          </div>
          <div className="h-px bg-[#F2F4F6]" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#191F28]">패딩 점퍼</p>
              <p className="text-[9px] text-[#8B95A1]">58,000원</p>
            </div>
            <svg width="56" height="18">
              <path
                d="M2 3 L14 6 L26 5 L38 11 L54 15"
                fill="none"
                stroke="#F04452"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[10px] font-bold text-[#F04452]">-8%</span>
          </div>
        </div>
      )
    case 'gauge':
      return (
        <div className="flex h-28 flex-col items-center justify-center">
          <svg viewBox="0 0 140 84" className="w-32">
            <path
              d="M 20 68 A 50 50 0 0 1 120 68"
              fill="none"
              stroke="#E5E8EB"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 20 68 A 50 50 0 0 1 120 68"
              fill="none"
              stroke="#3182F6"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="124 157"
            />
            <g transform="translate(70,68) rotate(48)">
              <line x1="0" y1="0" x2="0" y2="-34" stroke="#333D4B" strokeWidth="2.8" strokeLinecap="round" />
              <circle cx="0" cy="0" r="4.5" fill="#333D4B" />
            </g>
          </svg>
          <p className="text-[10px] font-semibold text-[#4E5968]">
            현재 만족도 <span className="font-bold text-[#3182F6]">98점</span>
          </p>
        </div>
      )
    case 'progress-ring':
      return (
        <div className="flex h-28 items-center justify-center gap-4 px-4">
          <div className="relative h-16 w-16 shrink-0">
            <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
              <circle cx="36" cy="36" r="27" fill="none" stroke="#E5E8EB" strokeWidth="7" />
              <circle
                cx="36"
                cy="36"
                r="27"
                fill="none"
                stroke="#3182F6"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="169.6"
                strokeDashoffset="47"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#191F28]">
              72%
            </span>
          </div>
          <div>
            <p className="text-[10px] text-[#8B95A1]">이번 달 목표</p>
            <p className="text-xs font-bold text-[#191F28]">5건 중 4건</p>
          </div>
        </div>
      )
    case 'heatmap': {
      const cells = [
        3, 2, 2, 1, 2, 0, 3,
        2, 2, 1, 2, 1, 0, 3,
        2, 1, 2, 2, 0, 3, 3,
        2, 2, 1, 1, 0, 3, 3,
      ]
      const colors = ['#F2F4F6', '#D0E4FF', '#7BB0FB', '#3182F6']
      return (
        <div className="flex h-28 items-center justify-center px-6">
          <div className="grid w-full max-w-[168px] grid-cols-7 gap-1.5">
            {cells.map((lv, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-[4px]"
                style={{ backgroundColor: colors[lv] }}
              />
            ))}
          </div>
        </div>
      )
    }
    case 'kpi-card':
      return (
        <div className="flex h-28 items-center justify-center px-3">
          <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-[#F2F4F6] p-2">
            <div className="rounded-lg bg-white p-2.5">
              <p className="text-[9px] text-[#8B95A1]">오늘 매출</p>
              <p className="mt-0.5 text-sm font-bold text-[#191F28]">4.8백만</p>
              <span className="mt-1 inline-block rounded-full bg-[#E8F3FF] px-1.5 py-0.5 text-[9px] font-bold text-[#3182F6]">
                ▲ 12%
              </span>
            </div>
            <div className="rounded-lg bg-white p-2.5">
              <p className="text-[9px] text-[#8B95A1]">주문</p>
              <p className="mt-0.5 text-sm font-bold text-[#191F28]">312건</p>
              <span className="mt-1 inline-block rounded-full bg-[#E8F3FF] px-1.5 py-0.5 text-[9px] font-bold text-[#3182F6]">
                ▲ 8%
              </span>
            </div>
          </div>
        </div>
      )
    case 'stacked-bar':
      return (
        <div className="flex h-28 items-end justify-center gap-3.5 px-6 pb-3 pt-4">
          {[58, 80, 72, 96].map((h, idx) => (
            <div
              key={idx}
              style={{ height: `${h}%` }}
              className="flex w-5 flex-col-reverse overflow-hidden rounded-t-md"
            >
              <div className="h-[48%] w-full bg-[#3182F6]" />
              <div className="h-[30%] w-full bg-[#75AAFC]" />
              <div className="h-[22%] w-full bg-[#D1E3FE]" />
            </div>
          ))}
        </div>
      )
  }
}

export function OverviewGrid({ onSelectPattern }: OverviewGridProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#E8F3FF] px-3 py-1 text-xs font-bold text-[#3182F6]">
            9가지 핵심 시각화 패턴
          </span>
          <h2 className="mt-2.5 text-2xl font-bold tracking-tight text-[#191F28]">
            프로덕트 데이터 시각화 쇼케이스
          </h2>
          <p className="mt-1 text-sm text-[#4E5968]">
            카드를 클릭하면 인터랙티브 데모와 React · HTML 복사 코드를 즉시 확인할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CHART_PATTERNS.map((pattern) => (
          <button
            key={pattern.id}
            type="button"
            onClick={() => onSelectPattern(pattern.id)}
            className="group flex flex-col rounded-3xl border border-[#E5E8EB]/80 bg-white p-4 text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3182F6]/40 hover:shadow-[0_12px_28px_rgba(49,130,246,0.10)] focus:outline-none"
          >
            {/* Preview Box matching reference */}
            <div className="w-full overflow-hidden rounded-2xl border border-[#F2F4F6] bg-[#FCFDFF]">
              <PatternThumbnail id={pattern.id} />
            </div>

            {/* Footer Title */}
            <div className="mt-3.5 flex items-start justify-between px-1">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#3182F6]">{pattern.number}</span>
                  <span className="text-[15px] font-bold text-[#191F28]">{pattern.title}</span>
                </div>
                <p className="mt-0.5 text-xs font-medium text-[#8B95A1]">
                  {pattern.englishTitle}
                </p>
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F6] text-[#8B95A1] transition-colors group-hover:bg-[#3182F6] group-hover:text-white">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
