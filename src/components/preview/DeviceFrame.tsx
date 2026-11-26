import { useState, type ReactNode } from 'react'
import { Monitor, Smartphone, Wifi, Battery } from 'lucide-react'

interface DeviceFrameProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function DeviceFrame({ title, subtitle, children }: DeviceFrameProps) {
  const [viewport, setViewport] = useState<'mobile' | 'web'>('mobile')

  return (
    <div className="flex flex-col rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Frame Toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-[#03B26C]" />
          <span className="text-xs font-bold text-[#191F28]">라이브 인터랙티브 프리뷰</span>
          {subtitle && (
            <span className="hidden text-xs text-[#8B95A1] sm:inline">· {subtitle}</span>
          )}
        </div>

        <div className="inline-flex rounded-xl bg-[#F2F4F6] p-1">
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              viewport === 'mobile'
                ? 'bg-white text-[#191F28] shadow-xs'
                : 'text-[#8B95A1] hover:text-[#4E5968]'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            모바일 앱
          </button>
          <button
            type="button"
            onClick={() => setViewport('web')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              viewport === 'web'
                ? 'bg-white text-[#191F28] shadow-xs'
                : 'text-[#8B95A1] hover:text-[#4E5968]'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            웹 대시보드
          </button>
        </div>
      </div>

      {/* Stage Area */}
      <div className="flex items-center justify-center rounded-2xl bg-[#F2F4F6] px-4 py-7 sm:px-8">
        {viewport === 'mobile' ? (
          <div className="w-full max-w-[376px] overflow-hidden rounded-[32px] border-[6px] border-[#191F28] bg-[#F2F4F6] shadow-[0_18px_40px_rgba(25,31,40,0.14)]">
            {/* Mobile Status Bar */}
            <div className="flex items-center justify-between bg-white px-5 pt-2.5 pb-2 text-[11px] font-bold text-[#191F28]">
              <span>9:41</span>
              <div className="h-3.5 w-16 rounded-full bg-[#191F28]" />
              <div className="flex items-center gap-1 text-[#191F28]">
                <Wifi className="h-3 w-3" />
                <Battery className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* App Header */}
            <div className="border-b border-[#F2F4F6] bg-white px-5 pb-3 pt-1">
              <p className="text-[11px] font-medium text-[#8B95A1]">리포트 요약</p>
              <h3 className="text-[15px] font-bold text-[#191F28]">{title}</h3>
            </div>

            {/* Mobile Content */}
            <div className="p-3.5">{children}</div>

            {/* Home Indicator */}
            <div className="flex justify-center bg-[#F2F4F6] pb-2.5 pt-1">
              <div className="h-1 w-24 rounded-full bg-[#D1D6DB]" />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[540px] overflow-hidden rounded-2xl border border-[#E5E8EB] bg-[#F2F4F6] shadow-[0_12px_30px_rgba(25,31,40,0.08)]">
            {/* Browser Top Bar */}
            <div className="flex items-center justify-between border-b border-[#E5E8EB] bg-white px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="rounded-md bg-[#F2F4F6] px-3 py-0.5 text-[11px] font-medium text-[#8B95A1]">
                analytics.service.kr/{title.replace(/\s+/g, '-')}
              </span>
              <span className="w-10" />
            </div>
            <div className="p-5">{children}</div>
          </div>
        )}
      </div>
    </div>
  )
}
