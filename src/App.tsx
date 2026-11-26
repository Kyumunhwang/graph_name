import { useState } from 'react'
import { AlertCircle, CheckCircle2, Lightbulb, Menu, X } from 'lucide-react'
import { CHART_PATTERNS, type ChartPatternId } from './data/chartPatterns'
import { Sidebar } from './components/layout/Sidebar'
import { DeviceFrame } from './components/preview/DeviceFrame'
import { OverviewGrid } from './components/preview/OverviewGrid'
import { CodeViewer } from './components/code/CodeViewer'
import { BarChartDemo } from './components/preview/demos/BarChartDemo'
import { LineChartDemo } from './components/preview/demos/LineChartDemo'
import { DonutChartDemo } from './components/preview/demos/DonutChartDemo'
import { SparklineDemo } from './components/preview/demos/SparklineDemo'
import { GaugeDemo } from './components/preview/demos/GaugeDemo'
import { ProgressRingDemo } from './components/preview/demos/ProgressRingDemo'
import { HeatmapDemo } from './components/preview/demos/HeatmapDemo'
import { KpiCardDemo } from './components/preview/demos/KpiCardDemo'
import { StackedBarDemo } from './components/preview/demos/StackedBarDemo'

function renderDemo(id: ChartPatternId) {
  switch (id) {
    case 'bar-chart':
      return <BarChartDemo />
    case 'line-chart':
      return <LineChartDemo />
    case 'donut-chart':
      return <DonutChartDemo />
    case 'sparkline':
      return <SparklineDemo />
    case 'gauge':
      return <GaugeDemo />
    case 'progress-ring':
      return <ProgressRingDemo />
    case 'heatmap':
      return <HeatmapDemo />
    case 'kpi-card':
      return <KpiCardDemo />
    case 'stacked-bar':
      return <StackedBarDemo />
  }
}

export default function App() {
  const [selectedId, setSelectedId] = useState<ChartPatternId | 'overview'>('overview')
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  const activePattern =
    selectedId === 'overview'
      ? null
      : (CHART_PATTERNS.find((p) => p.id === selectedId) ?? CHART_PATTERNS[0])

  const handleSelect = (id: ChartPatternId | 'overview') => {
    setSelectedId(id)
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6] text-[#191F28] lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-[#E5E8EB] bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3182F6] text-xs font-bold text-white">
            UI
          </span>
          <span className="text-sm font-bold text-[#191F28]">차트 패턴 라이브러리</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="rounded-xl bg-[#F2F4F6] p-2 text-[#4E5968]"
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="w-72 bg-white shadow-2xl">
            <Sidebar selectedId={selectedId} onSelect={handleSelect} />
          </div>
          <button
            type="button"
            className="flex-1 bg-black/30"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="메뉴 닫기"
          />
        </div>
      )}

      {/* Left Sidebar (Desktop) */}
      <div className="hidden lg:block lg:h-full">
        <Sidebar selectedId={selectedId} onSelect={handleSelect} />
      </div>

      {/* Center Live Preview Pane */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
        {selectedId === 'overview' || !activePattern ? (
          <OverviewGrid onSelectPattern={handleSelect} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Pattern Title Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-xl bg-[#3182F6] px-2.5 py-0.5 text-xs font-bold text-white">
                    {activePattern.number}
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#4E5968] border border-[#E5E8EB]">
                    {activePattern.category}
                  </span>
                  <span className="text-xs font-medium text-[#8B95A1]">
                    {activePattern.englishTitle}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#191F28]">
                  {activePattern.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-[#4E5968]">
                  {activePattern.summary}
                </p>
              </div>
            </div>

            {/* Interactive Device Preview */}
            <DeviceFrame title={activePattern.title} subtitle={activePattern.englishTitle}>
              {renderDemo(activePattern.id)}
            </DeviceFrame>

            {/* UX Design Guide */}
            <section className="rounded-3xl border border-[#E5E8EB] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-[#191F28]">실무 UX 설계 가이드</h3>
                <div className="flex flex-wrap gap-1.5">
                  {activePattern.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F2F4F6] px-2.5 py-0.5 text-[11px] font-semibold text-[#4E5968]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#3182F6]">
                    <CheckCircle2 className="h-4 w-4" />
                    언제 사용하나요?
                  </div>
                  <ul className="space-y-1.5 text-xs leading-relaxed text-[#4E5968]">
                    {activePattern.uxGuide.whenToUse.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[#3182F6]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#F9FAFB] p-4">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#191F28]">
                    <Lightbulb className="h-4 w-4 text-[#3182F6]" />
                    핵심 디자인 원칙
                  </div>
                  <ul className="space-y-1.5 text-xs leading-relaxed text-[#4E5968]">
                    {activePattern.uxGuide.principles.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-[#3182F6]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-[#E8F3FF]/60 px-4 py-3 text-xs leading-relaxed text-[#333D4B]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#3182F6]" />
                <div>
                  <span className="font-bold text-[#191F28]">주의사항: </span>
                  {activePattern.uxGuide.caution}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Right Code Viewer Pane (shown when a specific pattern is selected) */}
      {activePattern && <CodeViewer pattern={activePattern} />}
    </div>
  )
}
