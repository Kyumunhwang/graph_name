import { useState } from 'react'
import { Check, Code2, Copy, FileCode } from 'lucide-react'
import type { ChartPattern } from '../../data/chartPatterns'

interface CodeViewerProps {
  pattern: ChartPattern
}

export function CodeViewer({ pattern }: CodeViewerProps) {
  const [tab, setTab] = useState<'react' | 'html'>('react')
  const [copied, setCopied] = useState<boolean>(false)

  const code = tab === 'react' ? pattern.reactCode : pattern.htmlCode
  const lines = code.split('\n')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <aside className="flex h-full w-full flex-col border-l border-[#E5E8EB] bg-white xl:w-[440px] xl:shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F2F4F6] px-5 py-4">
        <div>
          <p className="text-xs font-bold text-[#191F28]">복사용 소스 코드</p>
          <p className="text-[11px] text-[#8B95A1]">
            외부 차트 패키지 없이 바로 붙여넣기 가능 · {lines.length}줄
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            copied
              ? 'bg-[#03B26C] text-white shadow-xs'
              : 'bg-[#3182F6] text-white hover:bg-[#1B64DA] shadow-[0_2px_8px_rgba(49,130,246,0.25)]'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              복사 완료!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              코드 복사
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#F2F4F6] px-5 py-2.5">
        <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-[#F2F4F6] p-1">
          <button
            type="button"
            onClick={() => setTab('react')}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-semibold transition-all ${
              tab === 'react'
                ? 'bg-white text-[#191F28] shadow-xs'
                : 'text-[#8B95A1] hover:text-[#4E5968]'
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-[#3182F6]" />
            React + Tailwind
          </button>
          <button
            type="button"
            onClick={() => setTab('html')}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-semibold transition-all ${
              tab === 'html'
                ? 'bg-white text-[#191F28] shadow-xs'
                : 'text-[#8B95A1] hover:text-[#4E5968]'
            }`}
          >
            <FileCode className="h-3.5 w-3.5 text-[#3182F6]" />
            순수 HTML + CSS + JS
          </button>
        </div>
      </div>

      {/* Code Block */}
      <div className="flex-1 overflow-auto bg-[#191F28] p-4 text-[12px] leading-relaxed text-[#E5E8EB]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/5">
                <td className="w-8 select-none pr-3 text-right font-mono text-[11px] text-[#6B7684]">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-[12px] text-[#F2F4F6]">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  )
}
