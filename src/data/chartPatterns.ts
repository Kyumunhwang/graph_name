export type ChartPatternId =
  | 'bar-chart'
  | 'line-chart'
  | 'donut-chart'
  | 'sparkline'
  | 'gauge'
  | 'progress-ring'
  | 'heatmap'
  | 'kpi-card'
  | 'stacked-bar'

export interface UxGuide {
  whenToUse: string[]
  principles: string[]
  caution: string
}

export interface ChartPattern {
  id: ChartPatternId
  number: string
  title: string
  englishTitle: string
  category: string
  summary: string
  tags: string[]
  uxGuide: UxGuide
  reactCode: string
  htmlCode: string
}

export const CHART_PATTERNS: ChartPattern[] = [
  {
    id: 'bar-chart',
    number: '01',
    title: '막대 그래프',
    englishTitle: 'Bar chart',
    category: '비교 · 분포',
    summary: '항목 간 크기를 직관적으로 비교하고, 핵심 강조 막대 하나에 시선을 집중시키는 수직 막대 차트입니다.',
    tags: ['항목 비교', '포커스 하이라이트', '라운드 캡'],
    uxGuide: {
      whenToUse: [
        '요일별, 월별, 카테고리별 수치의 크고 작음을 한눈에 비교할 때',
        '전체 흐름 속에서 최고치나 현재 기간(오늘/이번 주) 하나만 강조하고 싶을 때',
      ],
      principles: [
        '비강조 막대는 연한 틴트(#E8F3FF), 핵심 막대만 프라이머리 블루(#3182F6)를 사용해 시각적 위계를 분리합니다.',
        '상단 모서리에 6~8px 라운딩을 적용하고, 기준선(0)은 얇은 헤어라인으로 정리해 답답함을 없앱니다.',
      ],
      caution: '막대 개수가 8개를 넘어가면 모바일 화면에서 레이블이 겹치므로 가로 스크롤이나 상위 N개 묶음을 권장합니다.',
    },
    reactCode: `import React, { useState } from 'react';

interface BarItem {
  label: string;
  value: number;
  highlight?: boolean;
}

const DATA: BarItem[] = [
  { label: '월', value: 48 },
  { label: '화', value: 68 },
  { label: '수', value: 54 },
  { label: '목', value: 92, highlight: true },
  { label: '금', value: 62 },
];

export function BarChart() {
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const maxVal = Math.max(...DATA.map((d) => d.value));

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-[#E5E8EB]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-[#8B95A1]">주간 방문 현황</p>
          <p className="text-lg font-bold text-[#191F28]">
            {DATA[activeIndex].label}요일 · {DATA[activeIndex].value}만 건
          </p>
        </div>
        <span className="rounded-full bg-[#E8F3FF] px-2.5 py-1 text-xs font-semibold text-[#3182F6]">
          최고 기록
        </span>
      </div>

      <div className="flex h-44 items-end justify-between gap-3 pt-4">
        {DATA.map((item, idx) => {
          const isActive = idx === activeIndex;
          const heightPct = Math.round((item.value / maxVal) * 100);
          return (
            <button
              key={item.label}
              type="button"
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => setActiveIndex(idx)}
              className="group flex flex-1 flex-col items-center gap-2 focus:outline-none"
            >
              <span
                className={\`text-[11px] font-semibold transition-opacity \${
                  isActive ? 'text-[#3182F6] opacity-100' : 'text-[#8B95A1] opacity-0 group-hover:opacity-100'
                }\`}
              >
                {item.value}
              </span>
              <div className="flex h-32 w-full items-end">
                <div
                  style={{ height: \`\${heightPct}%\` }}
                  className={\`w-full rounded-t-lg transition-all duration-300 \${
                    isActive
                      ? 'bg-[#3182F6] shadow-[0_4px_12px_rgba(49,130,246,0.28)]'
                      : 'bg-[#E8F3FF] group-hover:bg-[#C9E2FF]'
                  }\`}
                />
              </div>
              <span className={\`text-xs font-medium \${isActive ? 'text-[#191F28] font-bold' : 'text-[#8B95A1]'}\`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #F2F4F6; padding: 24px; }
    .card { max-width: 340px; background: #fff; border-radius: 24px; padding: 24px; border: 1px solid #E5E8EB; }
    .title { font-size: 12px; color: #8B95A1; margin: 0 0 4px; }
    .metric { font-size: 18px; font-weight: 700; color: #191F28; margin: 0 0 20px; }
    .bars { display: flex; align-items: flex-end; gap: 12px; height: 140px; }
    .col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
    .track { width: 100%; height: 112px; display: flex; align-items: flex-end; }
    .bar { width: 100%; border-radius: 8px 8px 0 0; background: #E8F3FF; transition: height .35s ease, background .2s ease; }
    .col.active .bar { background: #3182F6; box-shadow: 0 4px 12px rgba(49,130,246,.28); }
    .label { font-size: 12px; color: #8B95A1; font-weight: 500; }
    .col.active .label { color: #191F28; font-weight: 700; }
  </style>
</head>
<body>
  <div class="card">
    <p class="title">주간 방문 현황</p>
    <p class="metric" id="metric">목요일 · 92만 건</p>
    <div class="bars" id="bars"></div>
  </div>
  <script>
    const data = [
      { label: '월', value: 48 },
      { label: '화', value: 68 },
      { label: '수', value: 54 },
      { label: '목', value: 92 },
      { label: '금', value: 62 }
    ];
    let active = 3;
    const max = Math.max(...data.map(d => d.value));
    const barsEl = document.getElementById('bars');
    const metricEl = document.getElementById('metric');
    function render() {
      barsEl.innerHTML = '';
      data.forEach((d, i) => {
        const col = document.createElement('div');
        col.className = 'col' + (i === active ? ' active' : '');
        col.innerHTML = \`<div class="track"><div class="bar" style="height:\${(d.value/max)*100}%"></div></div><span class="label">\${d.label}</span>\`;
        col.onmouseenter = () => { active = i; metricEl.textContent = \`\${d.label}요일 · \${d.value}만 건\`; render(); };
        barsEl.appendChild(col);
      });
    }
    render();
  </script>
</body>
</html>`,
  },
  {
    id: 'line-chart',
    number: '02',
    title: '선 그래프',
    englishTitle: 'Line chart',
    category: '추세 · 시계열',
    summary: '시간에 따른 연속적인 상승·하락 추세와 마지막 지점의 현재 상태를 에어리어 그라데이션과 함께 표현합니다.',
    tags: ['시계열 추세', '에어리어 채우기', '터미널 닷'],
    uxGuide: {
      whenToUse: [
        '일별 주문량, 자산 변동, 트래픽 추이 등 연속적인 시간 흐름을 보여줄 때',
        '추세의 방향성과 현재 시점의 도달 위치를 명확하게 인지시켜야 할 때',
      ],
      principles: [
        '선 아래쪽에 연한 블루 그라데이션(#3182F6 16% → 0%)을 깔아 시각적 안정감과 부피감을 줍니다.',
        '모든 점을 찍기보다 마지막 포인트(현재)만 흰 테두리 + 블루 닷으로 강조하고, 호버 시 해당 좌표를 따라가는 툴팁을 제공합니다.',
      ],
      caution: '데이터 간격이 불규칙하거나 급격한 등락이 많다면 과도한 곡선 보간(Bezier)이 실제 수치를 왜곡할 수 있습니다.',
    },
    reactCode: `import React, { useState } from 'react';

interface Point {
  label: string;
  value: number;
}

const POINTS: Point[] = [
  { label: '월', value: 18 },
  { label: '화', value: 34 },
  { label: '수', value: 29 },
  { label: '목', value: 58 },
  { label: '금', value: 51 },
  { label: '토', value: 79 },
  { label: '일', value: 74 },
];

export function LineChart() {
  const [hoverIdx, setHoverIdx] = useState<number>(POINTS.length - 1);
  const W = 280;
  const H = 130;
  const padX = 14;
  const padY = 16;
  const max = Math.max(...POINTS.map((p) => p.value)) * 1.1;
  const min = 0;

  const coords = POINTS.map((p, i) => ({
    x: padX + (i / (POINTS.length - 1)) * (W - padX * 2),
    y: padY + (1 - (p.value - min) / (max - min)) * (H - padY * 2),
    ...p,
  }));

  const linePath = coords.map((c, i) => \`\${i === 0 ? 'M' : 'L'} \${c.x} \${c.y}\`).join(' ');
  const areaPath = \`\${linePath} L \${coords[coords.length - 1].x} \${H - padY} L \${coords[0].x} \${H - padY} Z\`;
  const active = coords[hoverIdx];

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-[#E5E8EB]">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs font-medium text-[#8B95A1]">이번 주 주문</span>
        <span className="text-sm font-bold text-[#3182F6]">
          {active.label}요일 {active.value}건
        </span>
      </div>

      <svg viewBox={\`0 0 \${W} \${H}\`} className="w-full overflow-visible">
        <defs>
          <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3182F6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3182F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#lineAreaGrad)" />
        <path d={linePath} fill="none" stroke="#3182F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1={active.x} y1={padY} x2={active.x} y2={H - padY} stroke="#D1E3FE" strokeDasharray="3 3" />
        <circle cx={active.x} cy={active.y} r="5" fill="#3182F6" stroke="#FFFFFF" strokeWidth="2.5" />
        {coords.map((c, idx) => (
          <rect
            key={c.label}
            x={c.x - 16}
            y={0}
            width={32}
            height={H}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoverIdx(idx)}
          />
        ))}
      </svg>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background: #F2F4F6; padding: 24px; }
    .card { max-width: 340px; background: #fff; border-radius: 24px; padding: 24px; border: 1px solid #E5E8EB; }
    .head { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
    .sub { color: #8B95A1; }
    .val { color: #3182F6; font-weight: 700; }
  </style>
</head>
<body>
  <div class="card">
    <div class="head"><span class="sub">이번 주 주문</span><span class="val" id="val">일요일 74건</span></div>
    <svg id="chart" viewBox="0 0 280 130" width="100%"></svg>
  </div>
  <script>
    const pts = [18, 34, 29, 58, 51, 79, 74];
    const labels = ['월','화','수','목','금','토','일'];
    const svg = document.getElementById('chart');
    const valEl = document.getElementById('val');
    const W = 280, H = 130, px = 14, py = 16, max = 88;
    const coords = pts.map((v, i) => ({
      x: px + (i / (pts.length - 1)) * (W - px * 2),
      y: py + (1 - v / max) * (H - py * 2),
      v, l: labels[i]
    }));
    const dLine = coords.map((c, i) => (i ? 'L' : 'M') + c.x + ' ' + c.y).join(' ');
    const dArea = dLine + \` L \${coords[coords.length-1].x} \${H-py} L \${coords[0].x} \${H-py} Z\`;
    svg.innerHTML = \`
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3182F6" stop-opacity=".22"/><stop offset="100%" stop-color="#3182F6" stop-opacity="0"/></linearGradient></defs>
      <path d="\${dArea}" fill="url(#g)" />
      <path d="\${dLine}" fill="none" stroke="#3182F6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle id="dot" cx="\${coords[6].x}" cy="\${coords[6].y}" r="5" fill="#3182F6" stroke="#fff" stroke-width="2.5" />
    \`;
    coords.forEach(c => {
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', c.x - 16); r.setAttribute('y', 0); r.setAttribute('width', 32); r.setAttribute('height', H);
      r.setAttribute('fill', 'transparent'); r.style.cursor = 'pointer';
      r.onmouseenter = () => {
        document.getElementById('dot').setAttribute('cx', c.x);
        document.getElementById('dot').setAttribute('cy', c.y);
        valEl.textContent = \`\${c.l}요일 \${c.v}건\`;
      };
      svg.appendChild(r);
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'donut-chart',
    number: '03',
    title: '도넛 차트',
    englishTitle: 'Donut chart',
    category: '비율 · 구성',
    summary: '전체 대비 각 항목이 차지하는 비중을 원형 링으로 나타내고, 중앙 여백에 핵심 비율(%)을 배치합니다.',
    tags: ['비율 구성', '중앙 지표', 'SVG Stroke'],
    uxGuide: {
      whenToUse: [
        '포트폴리오 자산 배분, 결제 수단 비중, 트래픽 유입 채널 등 전체 합이 100%인 구성을 보여줄 때',
        '파이 차트 대신 중앙 공간에 대표 수치를 함께 요약하고 싶을 때',
      ],
      principles: [
        '세그먼트는 3~4개 이하로 제한하고, 주력 항목(#3182F6) → 보조 항목(#7BB0FB) → 기타(#E5E8EB) 순으로 시계 방향 배치합니다.',
        '세그먼트 호버 시 해당 조각의 두께를 살짝 키우고 중앙 텍스트를 해당 항목 수치로 동적 전환합니다.',
      ],
      caution: '5개 이상의 미세한 조각이 생기면 비교가 어려워지므로 누적 막대나 수평 리스트형 막대로 대체하세요.',
    },
    reactCode: `import React, { useState } from 'react';

interface Segment {
  label: string;
  value: number;
  color: string;
}

const SEGMENTS: Segment[] = [
  { label: '간편결제', value: 62, color: '#3182F6' },
  { label: '신용카드', value: 23, color: '#8BB8FA' },
  { label: '계좌이체', value: 15, color: '#E5E8EB' },
];

export function DonutChart() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  let accumulated = 0;

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-[#E5E8EB] flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          {SEGMENTS.map((seg, idx) => {
            const dash = (seg.value / 100) * circumference;
            const offset = -accumulated;
            accumulated += dash;
            const isActive = idx === activeIdx;
            return (
              <circle
                key={seg.label}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={isActive ? 18 : 15}
                strokeDasharray={\`\${dash} \${circumference - dash}\`}
                strokeDashoffset={offset}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setActiveIdx(idx)}
              />
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-[#191F28]">{SEGMENTS[activeIdx].value}%</span>
          <span className="text-[11px] font-medium text-[#8B95A1]">{SEGMENTS[activeIdx].label}</span>
        </div>
      </div>

      <div className="mt-4 flex w-full justify-center gap-4">
        {SEGMENTS.map((seg, idx) => (
          <button
            key={seg.label}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={\`flex items-center gap-1.5 text-xs font-medium transition-opacity \${
              idx === activeIdx ? 'text-[#191F28] font-bold' : 'text-[#8B95A1]'
            }\`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
            {seg.label}
          </button>
        ))}
      </div>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background: #F2F4F6; padding: 24px; }
    .card { max-width: 320px; background: #fff; border-radius: 24px; padding: 24px; border: 1px solid #E5E8EB; text-align: center; }
    .ring-wrap { position: relative; width: 140px; height: 140px; margin: 0 auto; }
    .center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; }
    .pct { font-size: 22px; font-weight: 700; color: #191F28; }
    .lbl { font-size: 11px; color: #8B95A1; }
  </style>
</head>
<body>
  <div class="card">
    <div class="ring-wrap">
      <svg viewBox="0 0 120 120" width="140" height="140" style="transform: rotate(-90deg)">
        <circle cx="60" cy="60" r="44" fill="none" stroke="#3182F6" stroke-width="16" stroke-dasharray="171.4 276.46" stroke-dashoffset="0" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="#8BB8FA" stroke-width="15" stroke-dasharray="63.6 276.46" stroke-dashoffset="-171.4" />
        <circle cx="60" cy="60" r="44" fill="none" stroke="#E5E8EB" stroke-width="15" stroke-dasharray="41.5 276.46" stroke-dashoffset="-235" />
      </svg>
      <div class="center"><span class="pct">62%</span><span class="lbl">간편결제</span></div>
    </div>
  </div>
</body>
</html>`,
  },
  {
    id: 'sparkline',
    number: '04',
    title: '스파크라인',
    englishTitle: 'Sparkline',
    category: '마이크로 차트 · 리스트',
    summary: '테이블이나 상품·종목 리스트 행(Row) 내부에 삽입해 최근 흐름과 등락률을 한 줄로 요약하는 초소형 차트입니다.',
    tags: ['인라인 트렌드', '등락률 컬러', '고밀도 UI'],
    uxGuide: {
      whenToUse: [
        '상품별 판매 추이, 종목 시세, 키워드 검색량 등 다수의 항목을 리스트 형태로 나열할 때',
        '축 눈금 없이 상승/하락의 방향성만 빠르게 스캔하게 만들고 싶을 때',
      ],
      principles: [
        '상승은 블루(#3182F6), 하락은 코랄 레드(#F04452)로 선 색상과 등락률(+12%, -8%) 텍스트를 일치시킵니다.',
        '스파크라인 자체는 높이를 24~32px로 슬림하게 유지해 행 높이가 과도하게 커지지 않게 합니다.',
      ],
      caution: '축이 생략되므로 서로 다른 행의 스파크라인 높이를 절대값으로 비교하는 오해를 방지하려면 우측 수치(+12%)를 반드시 병기하세요.',
    },
    reactCode: `import React from 'react';

interface SparkRow {
  name: string;
  price: string;
  delta: number;
  points: number[];
}

const ROWS: SparkRow[] = [
  { name: '니트 가디건', price: '32,000원', delta: 12, points: [20, 28, 25, 40, 38, 52, 60] },
  { name: '패딩 점퍼', price: '58,000원', delta: -8, points: [62, 55, 58, 42, 46, 32, 26] },
];

function MiniSpark({ points, positive }: { points: number[]; positive: boolean }) {
  const W = 80;
  const H = 26;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * W;
      const y = H - 3 - ((p - min) / (max - min || 1)) * (H - 6);
      return \`\${i === 0 ? 'M' : 'L'} \${x} \${y}\`;
    })
    .join(' ');

  return (
    <svg width={W} height={H} className="overflow-visible">
      <path d={d} fill="none" stroke={positive ? '#3182F6' : '#F04452'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SparklineList() {
  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-sm border border-[#E5E8EB] divide-y divide-[#F2F4F6]">
      {ROWS.map((row) => {
        const isPos = row.delta >= 0;
        return (
          <div key={row.name} className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1">
            <div>
              <p className="text-sm font-bold text-[#191F28]">{row.name}</p>
              <p className="text-xs text-[#8B95A1]">{row.price}</p>
            </div>
            <MiniSpark points={row.points} positive={isPos} />
            <span className={\`w-12 text-right text-xs font-bold \${isPos ? 'text-[#3182F6]' : 'text-[#F04452]'}\`}>
              {isPos ? \`+\${row.delta}%\` : \`\${row.delta}%\`}
            </span>
          </div>
        );
      })}
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background: #F2F4F6; padding: 24px; }
    .card { max-width: 340px; background: #fff; border-radius: 24px; padding: 20px; border: 1px solid #E5E8EB; }
    .row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #F2F4F6; }
    .row:last-child { border-bottom: none; }
    .name { font-size: 14px; font-weight: 700; color: #191F28; }
    .price { font-size: 12px; color: #8B95A1; margin-top: 2px; }
    .delta { font-size: 13px; font-weight: 700; width: 44px; text-align: right; }
    .up { color: #3182F6; } .down { color: #F04452; }
  </style>
</head>
<body>
  <div class="card">
    <div class="row">
      <div><div class="name">니트 가디건</div><div class="price">32,000원</div></div>
      <svg width="78" height="24"><path d="M2 20 L15 14 L28 16 L41 9 L54 11 L67 4 L76 2" fill="none" stroke="#3182F6" stroke-width="2" stroke-linecap="round"/></svg>
      <div class="delta up">+12%</div>
    </div>
    <div class="row">
      <div><div class="name">패딩 점퍼</div><div class="price">58,000원</div></div>
      <svg width="78" height="24"><path d="M2 4 L15 7 L28 6 L41 13 L54 11 L67 18 L76 21" fill="none" stroke="#F04452" stroke-width="2" stroke-linecap="round"/></svg>
      <div class="delta down">-8%</div>
    </div>
  </div>
</body>
</html>`,
  },
  {
    id: 'gauge',
    number: '05',
    title: '게이지',
    englishTitle: 'Gauge',
    category: '점수 · 상태 진단',
    summary: '반원 아크(Arc)와 바늘 포인터를 통해 현재 점수나 시스템 부하, 만족도 수준을 계기판처럼 직관적으로 전달합니다.',
    tags: ['반원 아크', '바늘 포인터', '점수 요약'],
    uxGuide: {
      whenToUse: [
        '신용 점수, 고객 만족도(NPS), 서버 CPU 점유율 등 0~100 범위의 단일 상태 점수를 진단할 때',
        '사용자가 현재 위치가 양호한 구간인지 즉각 체감해야 할 때',
      ],
      principles: [
        '전체 트랙은 뉴트럴 그레이(#E5E8EB), 채워진 구간은 블루(#3182F6)로 대비를 두고 끝단을 둥글게(round linecap) 처리합니다.',
        '바늘은 어두운 차콜(#333D4B)로 명확히 구분하고, 하단에 "현재 만족도 98점"처럼 레이블과 강조 숫자를 배치합니다.',
      ],
      caution: '한 화면에 게이지를 3개 이상 나열하면 시선이 분산되므로 핵심 지표 1~2개에만 사용하세요.',
    },
    reactCode: `import React, { useState } from 'react';

export function GaugeChart() {
  const [score, setScore] = useState<number>(82);
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 64;
  const semiCircumference = Math.PI * radius;
  const activeLength = (clamped / 100) * semiCircumference;
  const angleDeg = -90 + (clamped / 100) * 180;

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-[#E5E8EB] flex flex-col items-center">
      <svg viewBox="0 0 180 115" className="w-52">
        {/* Track Arc */}
        <path
          d="M 26 92 A 64 64 0 0 1 154 92"
          fill="none"
          stroke="#E5E8EB"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Active Arc */}
        <path
          d="M 26 92 A 64 64 0 0 1 154 92"
          fill="none"
          stroke="#3182F6"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={\`\${activeLength} \${semiCircumference}\`}
          className="transition-all duration-500 ease-out"
        />
        {/* Needle */}
        <g transform={\`translate(90, 92) rotate(\${angleDeg})\`} className="transition-transform duration-500 ease-out">
          <line x1="0" y1="0" x2="0" y2="-48" stroke="#333D4B" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="0" cy="0" r="6" fill="#333D4B" />
        </g>
      </svg>

      <p className="mt-1 text-sm font-semibold text-[#4E5968]">
        현재 만족도 <span className="font-bold text-[#3182F6]">{clamped}점</span>
      </p>

      <input
        type="range"
        min={0}
        max={100}
        value={clamped}
        onChange={(e) => setScore(Number(e.target.value))}
        className="mt-4 w-full accent-[#3182F6]"
      />
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background: #F2F4F6; padding: 24px; }
    .card { max-width: 320px; background: #fff; border-radius: 24px; padding: 24px; border: 1px solid #E5E8EB; text-align: center; }
    .caption { font-size: 14px; font-weight: 600; color: #4E5968; margin-top: 6px; }
    .score { color: #3182F6; font-weight: 700; }
  </style>
</head>
<body>
  <div class="card">
    <svg viewBox="0 0 180 115" width="210">
      <path d="M 26 92 A 64 64 0 0 1 154 92" fill="none" stroke="#E5E8EB" stroke-width="16" stroke-linecap="round"/>
      <path id="arc" d="M 26 92 A 64 64 0 0 1 154 92" fill="none" stroke="#3182F6" stroke-width="16" stroke-linecap="round" stroke-dasharray="165 201" />
      <g id="needle" transform="translate(90,92) rotate(57)">
        <line x1="0" y1="0" x2="0" y2="-48" stroke="#333D4B" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="6" fill="#333D4B"/>
      </g>
    </svg>
    <div class="caption">현재 만족도 <span class="score" id="label">82점</span></div>
    <input id="slider" type="range" min="0" max="100" value="82" style="width:100%; margin-top:14px; accent-color:#3182F6;" />
  </div>
  <script>
    const s = document.getElementById('slider');
    const arc = document.getElementById('arc');
    const needle = document.getElementById('needle');
    const label = document.getElementById('label');
    const maxLen = Math.PI * 64;
    s.oninput = () => {
      const v = Number(s.value);
      arc.setAttribute('stroke-dasharray', \`\${(v/100)*maxLen} \${maxLen}\`);
      needle.setAttribute('transform', \`translate(90,92) rotate(\${-90 + (v/100)*180})\`);
      label.textContent = v + '점';
    };
  </script>
</body>
</html>`,
  },
  {
    id: 'progress-ring',
    number: '06',
    title: '진행 링',
    englishTitle: 'Progress ring',
    category: '목표 · 달성률',
    summary: '목표 대비 현재 달성률을 원형 링과 간결한 텍스트("5건 중 4건")의 2단 조합으로 보여주는 패턴입니다.',
    tags: ['목표 달성률', '태스크 완료', '컴팩트 카드'],
    uxGuide: {
      whenToUse: [
        '이번 달 목표 달성, 온보딩 체크리스트 완료율, 일일 운동량 등 명확한 완수 목표가 있을 때',
        '카드 높이를 줄이면서 가로 공간을 효율적으로 쓰고 싶을 때',
      ],
      principles: [
        '좌측에 진행 링(중앙 퍼센트), 우측에 목표 제목과 분수형 카운트("5건 중 4건")를 배치하면 정보 밀도와 가독성이 균형을 이룹니다.',
        '진행 끝부분에 `strokeLinecap="round"`를 적용해 부드러운 마감을 줍니다.',
      ],
      caution: '여러 개의 세그먼트를 비교해야 한다면 진행 링이 아니라 도넛 차트를 선택해야 합니다.',
    },
    reactCode: `import React, { useState } from 'react';

export function ProgressRingCard() {
  const [done, setDone] = useState<number>(4);
  const total = 5;
  const pct = Math.round((done / total) * 100);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-[#E5E8EB] flex items-center justify-between gap-5">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
          <circle cx="48" cy="48" r={radius} fill="none" stroke="#E5E8EB" strokeWidth="9" />
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="none"
            stroke="#3182F6"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-[#191F28]">
          {pct}%
        </span>
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium text-[#8B95A1]">이번 달 목표</p>
        <p className="mt-1 text-base font-bold text-[#191F28]">
          {total}건 중 {done}건
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setDone((d) => Math.max(0, d - 1))}
            className="rounded-lg bg-[#F2F4F6] px-2.5 py-1 text-xs font-semibold text-[#4E5968] hover:bg-[#E5E8EB]"
          >
            -1건
          </button>
          <button
            type="button"
            onClick={() => setDone((d) => Math.min(total, d + 1))}
            className="rounded-lg bg-[#E8F3FF] px-2.5 py-1 text-xs font-semibold text-[#3182F6] hover:bg-[#D0E4FF]"
          >
            +1건
          </button>
        </div>
      </div>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background: #F2F4F6; padding: 24px; }
    .card { max-width: 320px; background: #fff; border-radius: 24px; padding: 24px; border: 1px solid #E5E8EB; display: flex; align-items: center; gap: 20px; }
    .ring { position: relative; width: 88px; height: 88px; }
    .pct { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #191F28; }
    .sub { font-size: 12px; color: #8B95A1; margin: 0; }
    .main { font-size: 16px; font-weight: 700; color: #191F28; margin: 4px 0 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="ring">
      <svg viewBox="0 0 96 96" width="88" height="88" style="transform: rotate(-90deg)">
        <circle cx="48" cy="48" r="36" fill="none" stroke="#E5E8EB" stroke-width="9"/>
        <circle cx="48" cy="48" r="36" fill="none" stroke="#3182F6" stroke-width="9" stroke-linecap="round" stroke-dasharray="226.2" stroke-dashoffset="45.2"/>
      </svg>
      <div class="pct">80%</div>
    </div>
    <div>
      <p class="sub">이번 달 목표</p>
      <p class="main">5건 중 4건</p>
    </div>
  </div>
</body>
</html>`,
  },
  {
    id: 'heatmap',
    number: '07',
    title: '히트맵',
    englishTitle: 'Heatmap',
    category: '밀도 · 패턴',
    summary: '시간대·요일별 활동 빈도를 일정한 간격의 사각 셀과 4단계 블루 명도 스케일로 시각화하는 매트릭스 차트입니다.',
    tags: ['활동 밀도', '4단계 컬러', '그리드 매트릭스'],
    uxGuide: {
      whenToUse: [
        '4주간 출석/커밋 이력, 시간대별 주문 몰림 현상 등 2차원 매트릭스 밀도를 파악할 때',
        '연속적인 패턴과 공백일을 한눈에 찾고 싶을 때',
      ],
      principles: [
        '단일 색상 계열(모노크롬 블루 4단계: #F2F4F6 → #D0E4FF → #7BB0FB → #3182F6)을 사용해 색각 이상자도 강도를 구분할 수 있게 합니다.',
        '각 셀에 4~6px 모서리 라운딩을 적용해 딱딱한 테이블 느낌을 지웁니다.',
      ],
      caution: '색상 단계를 6단계 이상으로 세분화하면 인접 단계 구분이 모호해지므로 4~5단계가 최적입니다.',
    },
    reactCode: `import React, { useState } from 'react';

const MATRIX = [
  [3, 2, 2, 1, 2, 0, 3],
  [2, 2, 1, 2, 1, 0, 3],
  [2, 1, 2, 2, 0, 3, 3],
  [2, 2, 1, 1, 0, 3, 3],
];

const COLORS = ['#F2F4F6', '#D0E4FF', '#7BB0FB', '#3182F6'];
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export function HeatmapChart() {
  const [selected, setSelected] = useState<{ week: number; day: number; level: number } | null>(null);

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-[#E5E8EB]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-[#8B95A1]">최근 4주 활동 빈도</span>
        <span className="text-xs font-semibold text-[#3182F6]">
          {selected ? \`\${selected.week + 1}주차 \${DAYS[selected.day]} · Lv.\${selected.level}\` : '셀을 선택해 보세요'}
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {MATRIX.map((row, wIdx) =>
          row.map((level, dIdx) => (
            <button
              key={\`\${wIdx}-\${dIdx}\`}
              type="button"
              onMouseEnter={() => setSelected({ week: wIdx, day: dIdx, level })}
              onClick={() => setSelected({ week: wIdx, day: dIdx, level })}
              style={{ backgroundColor: COLORS[level] }}
              className="aspect-square w-full rounded-md transition-transform duration-150 hover:scale-110 focus:outline-none"
              aria-label={\`\${wIdx + 1}주차 \${DAYS[dIdx]}요일 활동 수준 \${level}\`}
            />
          ))
        )}
      </div>

      <div className="mt-4 flex items-center justify-end gap-1.5 text-[11px] text-[#8B95A1]">
        <span>적음</span>
        {COLORS.map((c) => (
          <span key={c} className="h-3 w-3 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        <span>많음</span>
      </div>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background: #F2F4F6; padding: 24px; }
    .card { max-width: 320px; background: #fff; border-radius: 24px; padding: 24px; border: 1px solid #E5E8EB; }
    .grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 12px; }
    .cell { aspect-ratio: 1; border-radius: 6px; transition: transform .15s; cursor: pointer; }
    .cell:hover { transform: scale(1.1); }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size:12px; color:#8B95A1;">최근 4주 활동 빈도</div>
    <div class="grid" id="grid"></div>
  </div>
  <script>
    const levels = [3,2,2,1,2,0,3, 2,2,1,2,1,0,3, 2,1,2,2,0,3,3, 2,2,1,1,0,3,3];
    const palette = ['#F2F4F6', '#D0E4FF', '#7BB0FB', '#3182F6'];
    const grid = document.getElementById('grid');
    levels.forEach(lv => {
      const el = document.createElement('div');
      el.className = 'cell';
      el.style.background = palette[lv];
      grid.appendChild(el);
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'kpi-card',
    number: '08',
    title: 'KPI 카드',
    englishTitle: 'KPI card',
    category: '핵심 지표 · 요약',
    summary: '대시보드 최상단에서 가장 중요한 숫자 1~2개와 전기 대비 증감 배지를 가장 간결한 타이포그래피로 전달합니다.',
    tags: ['대시보드 상단', '증감 배지', '숫자 계층'],
    uxGuide: {
      whenToUse: [
        '오늘 매출, 신규 주문, 활성 사용자 등 의사결정에 즉각 필요한 1차 핵심 숫자를 배치할 때',
        '모바일 화면에서 2열 그리드로 나란히 비교해야 할 때',
      ],
      principles: [
        '라벨(12px #8B95A1) → 큰 숫자(22~28px Bold #191F28) → 증감 알약 배지(▲ 12%)의 3단 수직 리듬을 유지합니다.',
        '등락 배지는 연한 배경 틴트(#E8F3FF 또는 #FFEBEE)를 사용해 숫자보다 과하게 튀지 않으면서 상태만 전달합니다.',
      ],
      caution: '카드 하나에 보조 지표를 3개 이상 넣으면 핵심 숫자의 주목도가 떨어집니다.',
    },
    reactCode: `import React from 'react';

interface KpiItem {
  label: string;
  value: string;
  change: number;
}

const KPIS: KpiItem[] = [
  { label: '오늘 매출', value: '4.8백만', change: 12 },
  { label: '주문', value: '312건', change: 8 },
];

export function KpiCardPair() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3 rounded-3xl bg-[#F2F4F6] p-3">
      {KPIS.map((item) => {
        const up = item.change >= 0;
        return (
          <div key={item.label} className="rounded-2xl bg-white p-4 shadow-sm border border-[#E5E8EB]/60">
            <p className="text-xs font-medium text-[#8B95A1]">{item.label}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-[#191F28]">{item.value}</p>
            <span
              className={\`mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold \${
                up ? 'bg-[#E8F3FF] text-[#3182F6]' : 'bg-[#FFEBEE] text-[#F04452]'
              }\`}
            >
              {up ? '▲' : '▼'} {Math.abs(item.change)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background: #fff; padding: 24px; }
    .wrap { max-width: 340px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #F2F4F6; padding: 12px; border-radius: 24px; }
    .kpi { background: #fff; border-radius: 18px; padding: 16px; }
    .lbl { font-size: 12px; color: #8B95A1; margin: 0; }
    .val { font-size: 22px; font-weight: 700; color: #191F28; margin: 8px 0 12px; }
    .badge { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 999px; background: #E8F3FF; color: #3182F6; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="kpi"><p class="lbl">오늘 매출</p><p class="val">4.8백만</p><span class="badge">▲ 12%</span></div>
    <div class="kpi"><p class="lbl">주문</p><p class="val">312건</p><span class="badge">▲ 8%</span></div>
  </div>
</body>
</html>`,
  },
  {
    id: 'stacked-bar',
    number: '09',
    title: '누적 막대',
    englishTitle: 'Stacked bar',
    category: '구성 · 합계 비교',
    summary: '전체 합계의 추이와 각 세부 항목(채널·세그먼트)의 기여도를 톤온톤(Tone-on-Tone) 블루 레이어로 동시에 표현합니다.',
    tags: ['합계 + 구성', '톤온톤 블루', '시리즈 토글'],
    uxGuide: {
      whenToUse: [
        '월별 총매출을 비교하면서 동시에 채널별(모바일/웹/오프라인) 기여도를 함께 보여주고 싶을 때',
        '단순 막대 그래프보다 한 단계 깊은 구성 분석이 필요할 때',
      ],
      principles: [
        '무지개색 다중 팔레트 대신 동일 계열의 명도 차이(#3182F6 / #6FA8FA / #CFE2FF)를 쓰면 프로덕트 톤이 깔끔하게 유지됩니다.',
        '가장 비중이 크거나 기준이 되는 핵심 세그먼트를 바닥(기준선 0)에 두어야 수치 비교가 정확합니다.',
      ],
      caution: '누적 구간이 4개를 초과하면 중간 구간의 높이 변화 파악이 어려워집니다. 2~3개 구성으로 제한하세요.',
    },
    reactCode: `import React, { useState } from 'react';

interface StackItem {
  label: string;
  mobile: number;
  web: number;
  store: number;
}

const STACK_DATA: StackItem[] = [
  { label: '1분기', mobile: 34, web: 22, store: 16 },
  { label: '2분기', mobile: 44, web: 26, store: 20 },
  { label: '3분기', mobile: 40, web: 25, store: 18 },
  { label: '4분기', mobile: 52, web: 28, store: 22 },
];

export function StackedBarChart() {
  const [hoverIdx, setHoverIdx] = useState<number>(3);
  const maxSum = Math.max(...STACK_DATA.map((d) => d.mobile + d.web + d.store));

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-[#E5E8EB]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-[#8B95A1]">채널별 누적 실적</span>
        <span className="text-xs font-bold text-[#3182F6]">
          {STACK_DATA[hoverIdx].label} 총{' '}
          {STACK_DATA[hoverIdx].mobile + STACK_DATA[hoverIdx].web + STACK_DATA[hoverIdx].store}억
        </span>
      </div>

      <div className="flex h-40 items-end justify-between gap-4">
        {STACK_DATA.map((d, idx) => {
          const total = d.mobile + d.web + d.store;
          const totalPct = (total / maxSum) * 100;
          return (
            <button
              key={d.label}
              type="button"
              onMouseEnter={() => setHoverIdx(idx)}
              className="flex flex-1 flex-col items-center gap-2 focus:outline-none"
            >
              <div className="flex h-32 w-full items-end">
                <div
                  style={{ height: \`\${totalPct}%\` }}
                  className="flex w-full flex-col-reverse overflow-hidden rounded-t-lg transition-all duration-300"
                >
                  <div style={{ height: \`\${(d.mobile / total) * 100}%\` }} className="w-full bg-[#3182F6]" />
                  <div style={{ height: \`\${(d.web / total) * 100}%\` }} className="w-full bg-[#75AAFC]" />
                  <div style={{ height: \`\${(d.store / total) * 100}%\` }} className="w-full bg-[#D1E3FE]" />
                </div>
              </div>
              <span className={\`text-xs font-medium \${idx === hoverIdx ? 'font-bold text-[#191F28]' : 'text-[#8B95A1]'}\`}>
                {d.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
    htmlCode: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background: #F2F4F6; padding: 24px; }
    .card { max-width: 340px; background: #fff; border-radius: 24px; padding: 24px; border: 1px solid #E5E8EB; }
    .bars { display: flex; align-items: flex-end; gap: 16px; height: 136px; margin-top: 16px; }
    .col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .stack { width: 100%; display: flex; flex-direction: column-reverse; border-radius: 8px 8px 0 0; overflow: hidden; }
    .s1 { background: #3182F6; } .s2 { background: #75AAFC; } .s3 { background: #D1E3FE; }
    .lbl { font-size: 12px; color: #8B95A1; }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size:12px; color:#8B95A1;">채널별 누적 실적</div>
    <div class="bars">
      <div class="col"><div class="stack" style="height:76px"><div class="s1" style="height:48%"></div><div class="s2" style="height:30%"></div><div class="s3" style="height:22%"></div></div><span class="lbl">1분기</span></div>
      <div class="col"><div class="stack" style="height:98px"><div class="s1" style="height:49%"></div><div class="s2" style="height:29%"></div><div class="s3" style="height:22%"></div></div><span class="lbl">2분기</span></div>
      <div class="col"><div class="stack" style="height:90px"><div class="s1" style="height:48%"></div><div class="s2" style="height:30%"></div><div class="s3" style="height:22%"></div></div><span class="lbl">3분기</span></div>
      <div class="col"><div class="stack" style="height:112px"><div class="s1" style="height:51%"></div><div class="s2" style="height:27%"></div><div class="s3" style="height:22%"></div></div><span class="lbl">4분기</span></div>
    </div>
  </div>
</body>
</html>`,
  },
]
