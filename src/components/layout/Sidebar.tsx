import { LayoutGrid, Sparkles } from 'lucide-react'
import { CHART_PATTERNS, type ChartPatternId } from '../../data/chartPatterns'

interface SidebarProps {
  selectedId: ChartPatternId | 'overview'
  onSelect: (id: ChartPatternId | 'overview') => void
}

export function Sidebar({ selectedId, onSelect }: SidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-[#E5E8EB] bg-white lg:w-[272px] lg:shrink-0">
      {/* Brand Header */}
      <div className="border-b border-[#F2F4F6] px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3182F6] text-white shadow-[0_4px_12px_rgba(49,130,246,0.28)]">
            <Sparkles className="h-4.5 w-4.5" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-[#191F28]">
              차트 패턴 라이브러리
            </h1>
            <p className="text-[11px] font-medium text-[#8B95A1]">
              순수 React + SVG · Zero Deps
            </p>
          </div>
        </div>

        {/* Overview Button */}
        <button
          type="button"
          onClick={() => onSelect('overview')}
          className={`mt-4 flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-left text-[13px] font-semibold transition-all ${
            selectedId === 'overview'
              ? 'bg-[#3182F6] text-white shadow-[0_4px_12px_rgba(49,130,246,0.25)]'
              : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]/70 hover:text-[#191F28]'
          }`}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            전체 한눈에 보기
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
              selectedId === 'overview'
                ? 'bg-white/20 text-white'
                : 'bg-white text-[#8B95A1]'
            }`}
          >
            9종
          </span>
        </button>
      </div>

      {/* Pattern Menu List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="차트 패턴 목차">
        <p className="mb-2 px-2.5 text-[11px] font-semibold tracking-wide text-[#8B95A1]">
          데이터 시각화 패턴 01–09
        </p>
        <ul className="space-y-1">
          {CHART_PATTERNS.map((pattern) => {
            const isActive = selectedId === pattern.id
            return (
              <li key={pattern.id}>
                <button
                  type="button"
                  onClick={() => onSelect(pattern.id)}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-all ${
                    isActive
                      ? 'bg-[#E8F3FF] text-[#191F28]'
                      : 'text-[#4E5968] hover:bg-[#F2F4F6]/80 hover:text-[#191F28]'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold transition-colors ${
                      isActive
                        ? 'bg-[#3182F6] text-white'
                        : 'bg-[#F2F4F6] text-[#3182F6] group-hover:bg-white'
                    }`}
                  >
                    {pattern.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-[13.5px] leading-tight ${
                        isActive ? 'font-bold text-[#191F28]' : 'font-semibold text-[#333D4B]'
                      }`}
                    >
                      {pattern.title}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-[#8B95A1]">
                      {pattern.englishTitle}
                    </p>
                  </div>
                  {isActive && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3182F6]" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="border-t border-[#F2F4F6] px-5 py-3.5 text-[11px] text-[#8B95A1]">
        <div className="flex items-center justify-between">
          <span>Primary Accent</span>
          <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-[#4E5968]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3182F6]" />
            #3182F6
          </span>
        </div>
      </div>
    </aside>
  )
}
