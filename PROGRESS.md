# resume-ai — 작업 진행 현황

## 프로젝트 개요
- **목적**: JuneYoung Kim 개발자 경력기술서 포트폴리오 사이트
- **GitHub**: https://github.com/sky14786/resume-ai
- **스택**: 순수 HTML / CSS / JS (빌드 툴 없음)
- **배포 예정**: Cloudflare Pages + 커스텀 도메인

---

## 버전 현황

### v1 (루트 `/`)
- **테마**: TERM / DARK / CYBER 3가지 스위칭
- **레이아웃**: 세로 타임라인
- **포인트 색상**: 그린 / 인디고 / 핑크
- **배경 효과**: 매트릭스 레인(TERM), Animated blob, 스캔라인
- **로컬 서버**: `npx serve resume-ai` (port autoassign)

### v2 (`/v2/`)
- **테마**: 단일 앰버(황금) 테마
- **레이아웃**: Bento Grid (비대칭 카드)
- **포인트 색상**: Amber #f59e0b
- **배경 효과**: 마우스 따라다니는 spotlight, 카드 내부 glow
- **특이사항**: 숫자 카운터 애니메이션, 상단 고정 nav, 연도 큰 숫자 장식
- **로컬 서버**: `npx serve resume-ai/v2` (port autoassign)

> **현재 미결**: v1 / v2 중 하나로 방향 결정 필요 (또는 혼합)

---

## 완료된 작업

### v1 기본 구조
- [x] 3가지 테마 스위칭 (TERM / DARK / CYBER) — CSS 변수 기반, localStorage 저장
- [x] 타이핑 애니메이션 (Typed.js CDN)
- [x] Hero 섹션 (이름, 타이핑, 설명, 통계 카드)
- [x] Career 타임라인 4개 프로젝트
- [x] Skills 섹션 (6개 카테고리)
- [x] Footer

### v1 디자인 업그레이드
- [x] Glassmorphism 카드 (backdrop-filter: blur)
- [x] Animated gradient blob 배경 (테마별)
- [x] Scroll progress bar (상단 gradient 선)
- [x] CSS 애니메이션 기반 카드 fadeUp (IntersectionObserver 제거)
- [x] TERM: 매트릭스 레인 캔버스 + 스캔라인 오버레이
- [x] CYBER: 사이버 그리드 배경 + 타이틀 글리치 효과
- [x] Hero greeting pill 스타일 배지
- [x] Section title 뒤 fade-out 구분선

### v2 신규 제작
- [x] Bento Grid 레이아웃 (hero + stat cards + keyword card)
- [x] 마우스 spotlight 효과 (전역 + 카드 내부)
- [x] 숫자 카운터 애니메이션 (easeOutCubic)
- [x] 상단 고정 nav (스크롤 시 border 표시)
- [x] Scroll progress bar
- [x] Career 카드 — 연도 큰 숫자 배경 장식
- [x] Skills 태그 클라우드 (크기/색상 분류)
- [x] 앰버 단일 테마

---

## 다음 작업 (TODO)

### 방향 결정
- [ ] v1 / v2 중 메인 버전 선택 (또는 혼합)

### 배포
- [ ] Cloudflare Pages 연결 (GitHub 저장소 → 자동 배포)
- [ ] 커스텀 도메인 연결

### 콘텐츠
- [ ] 연락처 / 이메일 추가 여부 재검토
- [ ] GitHub 링크 본인 프로필로 업데이트 (v2 footer)
- [ ] 회사명 / 프로젝트 상세 내용 추가 검토

### 개선 가능 항목
- [ ] 모바일 반응형 세부 점검
- [ ] OG 태그 (SNS 공유 썸네일) 추가
- [ ] favicon 추가

---

## 파일 구조

```
resume-ai/
├── index.html       # v1 메인
├── style.css        # v1 스타일 (3 테마)
├── script.js        # v1 JS (테마 스위칭, 매트릭스, Typed.js)
├── v2/
│   ├── index.html   # v2 메인 (Bento Grid)
│   ├── style.css    # v2 스타일 (앰버 단일 테마)
│   └── script.js    # v2 JS (spotlight, counter, nav)
├── PROGRESS.md      # 이 파일
└── LICENSE
```

---

## 로컬 개발 서버

```
# v1
npx serve resume-ai

# v2
npx serve resume-ai/v2

# launch.json 위치: E:\AI\.claude\launch.json
# 서버명: resume-ai / resume-ai-v2
```

---

## 주요 구현 메모

### v1
**테마 스위칭**
- `document.documentElement`의 `data-theme` 속성으로 제어
- `localStorage`에 마지막 테마 저장

**매트릭스 레인**
- `<canvas id="matrix-canvas">` — TERM 테마일 때만 opacity: 0.3
- `startMatrix()` / `stopMatrix()` 로 테마 전환 시 on/off

**Career 카드 가시성**
- IntersectionObserver 제거, CSS `@keyframes fadeUp` + `animation-delay` 로 교체
- 이유: iframe/preview 환경에서 observer 불안정

### v2
**마우스 spotlight**
- `--mx`, `--my` CSS 변수로 마우스 위치 전달
- `body::before` + `radial-gradient`로 전역 spotlight
- 카드별로도 `--cx`, `--cy` 따로 받아 내부 glow 구현

**숫자 카운터**
- `IntersectionObserver` threshold 0.5로 뷰포트 진입 시 시작
- `easeOutCubic` 이징 적용, duration 1200ms
