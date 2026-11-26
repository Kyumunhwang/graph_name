import { useState } from 'react'
import { Shuffle } from 'lucide-react'

const INITIAL_MATRIX = [
  [3, 2, 2, 1, 2, 0, 3],
  [2, 2, 1, 2, 1, 0, 3],
  [2, 1, 2, 2, 0, 3, 3],
  [2, 2, 1, 1, 0, 3, 3],
]

const PALETTE = ['#F2F4F6', '#D0E4FF', '#7BB0FB', '#3182F6']
const DAYS = ['월', '화', '수', '목', '금', '토', '일']
const LEVEL_LABELS = ['활동 없음', '보통', '활발함', '매우 활발함']

export function HeatmapDemo() {
  const [matrix, setMatrix] = useState<number[][]>(INITIAL_MATRIX)
  const [selected, setSelected] = useState<{ week: number; day: number; level: number }>({
    week: 2,
    day: 5,
    level: 3,
  })
  const [minFilter, setMinFilter] = useState<number>(0)

  const handleShuffle = () => {
    const next = matrix.map((row) => row.map(() => Math.floor(Math.random() * 4)))
    setMatrix(next)
    setSelected({ week: 0, day: 0, level: next[0][0] })
  }

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-[#8B95A1]">최근 4주 활동 히트맵</p>
            <p className="mt-0.5 text-sm font-bold text-[#191F28]">
              {selected.week + 1}주차 {DAYS[selected.day]}요일 ·{' '}
              <span className="text-[#3182F6]">{LEVEL_LABELS[selected.level]}</span>
            </p>
          </div>
          <span className="rounded-full bg-[#E8F3FF] px-2.5 py-1 text-[11px] font-bold text-[#3182F6]">
            Lv.{selected.level}
          </span>
        </div>

        {/* Day Header */}
        <div className="mb-1.5 grid grid-cols-7 gap-2 text-center">
          {DAYS.map((day) => (
            <span key={day} className="text-[11px] font-medium text-[#8B95A1]">
              {day}
            </span>
          ))}
        </div>

        {/* 7x4 Matrix */}
        <div className="grid grid-cols-7 gap-2">
          {matrix.map((row, wIdx) =>
            row.map((level, dIdx) => {
              const isSelected = selected.week === wIdx && selected.day === dIdx
              const dimmed = level < minFilter
              return (
                <button
                  key={`${wIdx}-${dIdx}`}
                  type="button"
                  onMouseEnter={() => setSelected({ week: wIdx, day: dIdx, level })}
                  onClick={() => setSelected({ week: wIdx, day: dIdx, level })}
                  style={{
                    backgroundColor: PALETTE[level],
                    opacity: dimmed ? 0.25 : 1,
                  }}
                  className={`aspect-square w-full rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none ${
                    isSelected ? 'ring-2 ring-[#191F28] ring-offset-2' : ''
                  }`}
                  aria-label={`${wIdx + 1}주차 ${DAYS[dIdx]}요일 활동 수준 ${level}`}
                />
              )
            }),
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-[#8B95A1]">
          <span>셀을 클릭해 상세 확인</span>
          <div className="flex items-center gap-1.5">
            <span>적음</span>
            {PALETTE.map((c, idx) => (
              <button
                key={c}
                type="button"
                onClick={() => setMinFilter((prev) => (prev === idx ? 0 : idx))}
                className={`h-3.5 w-3.5 rounded-sm transition-transform ${
                  minFilter === idx && idx > 0 ? 'scale-125 ring-1 ring-[#191F28]' : ''
                }`}
                style={{ backgroundColor: c }}
                title={`레벨 ${idx} 이상 필터`}
              />
            ))}
            <span>많음</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMinFilter(0)}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
              minFilter === 0 ? 'bg-[#3182F6] text-white' : 'bg-[#F2F4F6] text-[#4E5968]'
            }`}
          >
            전체 보기
          </button>
          <button
            type="button"
            onClick={() => setMinFilter(2)}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold ${
              minFilter === 2 ? 'bg-[#3182F6] text-white' : 'bg-[#F2F4F6] text-[#4E5968]'
            }`}
          >
            활발 이상만
          </button>
        </div>

        <button
          type="button"
          onClick={handleShuffle}
          className="inline-flex items-center gap-1 rounded-xl bg-[#E8F3FF] px-2.5 py-1 text-xs font-semibold text-[#3182F6] hover:bg-[#D0E4FF]"
        >
          <Shuffle className="h-3 w-3" />
          패턴 섞기
        </button>
      </div>
    </div>
  )
}
