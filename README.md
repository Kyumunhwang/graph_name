# UI/UX 데이터 시각화 패턴 라이브러리

무거운 외부 차트 패키지 의존성 없이 **순수 React + SVG + Tailwind CSS**로 구현한 9가지 데이터 시각화 패턴 쇼케이스 및 코드 스니펫 라이브러리입니다.

## 포함된 9가지 패턴

| 번호 | 패턴명 | 영문명 | 카테고리 |
| :--- | :--- | :--- | :--- |
| 01 | 막대 그래프 | Bar chart | 비교 · 분포 |
| 02 | 선 그래프 | Line chart | 추세 · 시계열 |
| 03 | 도넛 차트 | Donut chart | 비율 · 구성 |
| 04 | 스파크라인 | Sparkline | 마이크로 차트 · 리스트 |
| 05 | 게이지 | Gauge | 점수 · 상태 진단 |
| 06 | 진행 링 | Progress ring | 목표 · 달성률 |
| 07 | 히트맵 | Heatmap | 밀도 · 패턴 |
| 08 | KPI 카드 | KPI card | 핵심 지표 · 요약 |
| 09 | 누적 막대 | Stacked bar | 구성 · 합계 비교 |

## 기술 스택

- **Frontend**: React 18, TypeScript, Vite 6
- **Styling**: Tailwind CSS v4
- **Icons**: `lucide-react`
- **Charts**: Pure React + Inline SVG + CSS Transitions (외부 차트 라이브러리 없음)

## 로컬 실행 및 빌드

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (포트 3009)
npm run dev:chart-showcase

# 프로덕션 빌드 (dist 폴더 생성)
npm run build
```

## GitHub 업로드 방법

```bash
git add .
git commit -m "feat: add 9 pure SVG data visualization pattern showcase"
git remote add origin https://github.com/Kyumunhwang/graph_name.git
git push -u origin main
```

## Render Static Site 호스팅 설정

루트 경로의 [`render.yaml`](./render.yaml) Blueprint 파일을 그대로 사용하거나, Render 대시보드에서 **Static Site** 생성 시 아래 값을 입력하세요.

- **Repository**: `Kyumunhwang/graph_name`

- **Build Command**: `npm ci && npm run build`
- **Publish Directory**: `dist`
- **Rewrite Rule (SPA)**: `/*` → `/index.html` (`Rewrite`)
