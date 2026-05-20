# resume-ai — 작업 진행 현황

## 프로젝트 개요
- **목적**: JuneYoung Kim 개발자 경력기술서 포트폴리오 사이트
- **GitHub**: https://github.com/sky14786/resume-ai
- **스택**: 순수 HTML / CSS / JS (빌드 툴 없음)
- **배포 예정**: Cloudflare Pages + 커스텀 도메인

---

## 완료된 작업

### 기본 구조
- [x] 3가지 테마 스위칭 (TERM / DARK / CYBER) — CSS 변수 기반, localStorage 저장
- [x] 타이핑 애니메이션 (Typed.js CDN)
- [x] Hero 섹션 (이름, 타이핑, 설명, 통계 카드)
- [x] Career 타임라인 4개 프로젝트
- [x] Skills 섹션 (6개 카테고리)
- [x] Footer

### 디자인 업그레이드
- [x] Glassmorphism 카드 (backdrop-filter: blur)
- [x] Animated gradient blob 배경 (테마별)
- [x] Scroll progress bar (상단 gradient 선)
- [x] CSS 애니메이션 기반 카드 fadeUp (IntersectionObserver 제거)
- [x] TERM: 매트릭스 레인 캔버스 + 스캔라인 오버레이
- [x] CYBER: 사이버 그리드 배경 + 타이틀 글리치 효과
- [x] Hero greeting pill 스타일 배지
- [x] Section title 뒤 fade-out 구분선

---

## 다음 작업 (TODO)

### 배포
- [ ] Cloudflare Pages 연결 (GitHub 저장소 → 자동 배포)
- [ ] 커스텀 도메인 연결

### 콘텐츠
- [ ] 연락처 / 이메일 추가 (Footer 또는 별도 섹션)
- [ ] GitHub 링크 본인 프로필로 업데이트
- [ ] 회사명 / 프로젝트 상세 내용 추가 검토

### 개선 가능 항목
- [ ] 모바일 반응형 세부 점검
- [ ] OG 태그 (SNS 공유 썸네일) 추가
- [ ] favicon 추가
- [ ] 페이지 로딩 속도 점검

---

## 파일 구조

```
resume-ai/
├── index.html       # 전체 구조 + 콘텐츠
├── style.css        # 테마 변수 + 컴포넌트 스타일
├── script.js        # 테마 스위칭, 매트릭스 레인, Typed.js, scroll progress
├── PROGRESS.md      # 이 파일 — 작업 진행 현황
└── LICENSE          # MIT
```

---

## 주요 구현 메모

**테마 스위칭**
- `document.documentElement`의 `data-theme` 속성으로 제어
- `localStorage`에 마지막 테마 저장

**매트릭스 레인**
- `<canvas id="matrix-canvas">` — TERM 테마일 때만 opacity: 0.3으로 표시
- `startMatrix()` / `stopMatrix()` 로 테마 전환 시 on/off

**Career 카드 가시성**
- IntersectionObserver 제거, CSS `@keyframes fadeUp` + `animation-delay`로 교체
- 이유: iframe/preview 환경에서 observer 불안정

**Glassmorphism 카드**
- `background: var(--bg-card)` — 각 테마에서 rgba 반투명값
- `backdrop-filter: blur()` — 테마별 blur 강도 다름
- hover 시 `::before` pseudo로 내부 gradient shimmer
