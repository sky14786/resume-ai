# resume-ai — 작업 진행 현황

## ⚠️ 세션 규칙 (필수)
> **매 작업 세션 종료 전 반드시:**
> 1. `PROGRESS.md` 작업 내역 및 다음 할 일 업데이트
> 2. 변경 파일 전체 GitHub 커밋 & 푸시
> 3. 다음 세션 시작 시 이 파일을 먼저 읽고 이어서 작업

---

## 프로젝트 개요
- **목적**: JuneYoung Kim 개발자 경력기술서 사이트 (이력서 링크 첨부용)
- **GitHub**: https://github.com/sky14786/resume-ai
- **스택**: 순수 HTML / CSS / JS (빌드 툴 없음)
- **배포 예정**: Cloudflare Pages + 커스텀 도메인

---

## 버전 현황

### v1 (루트 `/`)
- **테마**: TERM / DARK / CYBER 3가지 스위칭
- **레이아웃**: 세로 타임라인
- **로컬 서버**: `npx serve resume-ai`

### v2 (`/v2/`)
- **테마**: 단일 앰버(황금) 테마
- **레이아웃**: Bento Grid (비대칭 카드)
- **로컬 서버**: `npx serve resume-ai/v2`

### v3 (`/v3/`)
- **테마**: 단일 Lime (#a3e635) 네오브루탈리즘
- **레이아웃**: 2열 그리드 Career, 섹션 번호 레이블
- **주요 기능**: Kinetic Typography, Custom Cursor, Command Palette, Scroll Storytelling, Neobrutalism 카드
- **추가된 기능** (이번 세션):
  - MAI-WACS 카드 아키텍처 다이어그램 (SVG 인라인)
    - PC: 카드 hover 시 슬라이드 다운
    - 모바일: 버튼 클릭 토글 (`@media (hover:none) and (pointer:coarse)`)
    - 모바일 가로 스크롤 (`overflow-x:auto`, `min-width:600px`)
  - About 섹션 (03) 추가
  - Contact 섹션 (04) 추가 — GitHub / Email(obfuscated) / KakaoTalk
  - Nav에 Contact 링크 추가
- **로컬 서버**: `npx serve resume-ai/v3` (port 3200)
- **⚠️ 주의**: 프리뷰 iframe 스크린샷 불가 (무한 애니메이션 + cursor:none) — 브라우저 직접 열어야 함

### v7 (`/v7/`) ⭐ 현재 진행 방향
- **기반**: v6 복사 후 라이트 테마 전환
- **추가된 기능** (2026-05-28):
  - 라이트 테마 (`#faf9f6` 크림 배경, 흰 카드, 다크 테두리/그림자)
  - 보조 컬러 틸 (`--cyan: #0891b2`) — 날짜·섹션번호·레이블
  - 카드 기본 그림자 `#0c0c0c` → hover 시 라임으로 전환 (네오브루탈리즘)
  - 플로팅 pill 네브바 — 스크롤 80px 시 중앙 pill 형태로 전환 (`max-width` 트랜지션 + backdrop-filter)
  - 컬러 테마 스위처 (우측 하단 고정) — Lime / Indigo / Orange / Forest / Crimson 실시간 전환
  - Print CSS 대폭 단순화 — 라이트 테마라 색상 오버라이드 불필요, 그림자만 제거
  - SVG 다이어그램: 다크 패널 유지 (라이트 카드 안 dark screen 대비 효과)
- **로컬 서버**: `npx serve resume-ai/v7 --listen 3600` (port 3600)
- **서버 재시작 방법**: 포트 점유 프로세스 종료 후 재기동

### v6 (`/v6/`) — 다크 테마 + 2컬러 버전
- **기반**: v5 복사 후 컬러 계층화
- **추가된 기능** (2026-05-28):
  - 보조 컬러 시안 (`--cyan: #22d3ee`) 추가 — 날짜·섹션번호 분리
  - 대표 프로젝트 카드 풀 와이드 (`grid-column: 1/-1`) + 내부 2열 레이아웃
  - `★ 대표 프로젝트` 배지
- **로컬 서버**: `npx serve resume-ai/v6 --listen 3500` (port 3500)

### v5 (`/v5/`)
- **기반**: v4 복사 후 기능 강화
- **추가된 기능** (2026-05-28):
  - favicon.svg (JY 로고, lime #a3e635)
  - OG 태그 (title/description/type/twitter:card)
  - PDF 버튼 (nav 우측, `window.print()`)
  - Print CSS (`@media print`) — 흰 배경, 아치 다이어그램 자동 펼침
  - 카드별 임팩트 칩 (`.bstat`): 10개병원/100만가입자/350대서버 등
  - Nav 스크롤 스파이 (IntersectionObserver, active underline)
- **로컬 서버**: `npx serve resume-ai/v5 --listen 3400` (port 3400)

### v4 (`/v4/`) — 백업
- **기반**: v3 복사 후 비주얼 강화
- **추가된 기능** (이번 세션):
  - 모든 섹션 배경에 거대 섹션 번호 장식 (`01` ~ `04`, rgba 투명)
  - About 섹션 완전 리디자인:
    - 거대 quote (clamp 28~52px) + lime 왼쪽 보더
    - 배경 반투명 `"` 장식 문자 (100~200px)
    - 터미널 블록 (● ● ● + `$` 프롬프트 + 깜빡이는 커서)
  - Contact 섹션 완전 리디자인:
    - `ALWAYS` (lime outline) / `OPEN.` (white solid) 대형 타이포
    - clamp 56~120px 압도적 텍스트
- **로컬 서버**: `npx serve resume-ai/v4` (port 3300)
- **⚠️ 주의**: v3와 동일하게 브라우저 직접 열어야 함

> **현재 방향**: v4 기반으로 계속 진행. v3는 백업으로 유지.

---

## 완료된 작업

### v1 / v2 / v3 기본 구조 (이전 세션)
- [x] v1: 3테마, 타이핑 애니메이션, Career/Skills/Footer
- [x] v2: Bento Grid, spotlight, 앰버 테마
- [x] v3: Neobrutalism, Kinetic Typography, Custom Cursor, Command Palette, Scroll Storytelling

### 이번 세션 완료
- [x] MAI-WACS 카드 — 아키텍처 다이어그램 SVG 인라인 삽입
- [x] PC hover / 모바일 click 반응형 다이어그램 토글
- [x] 모바일 가로 스크롤 대응 (min-width: 600px)
- [x] SVG 노드 크기 및 폰트 확대 (130×60 → 150×70, 9px → 11px)
- [x] About 섹션 (03) — v3/v4 모두
- [x] Contact 섹션 (04) — GitHub / Email obfuscated / KakaoTalk 플레이스홀더
- [x] v4 신규 생성 — 비주얼 강화 (섹션 bg 숫자, 대형 quote, 터미널 블록, ALWAYS OPEN. 타이포)
- [x] launch.json에 v4 서버 추가 (port 3300)

---

## 다음 작업 (TODO)

### 🔜 다음 세션 우선순위

1. **v7 컬러 테마 확정**
   - `http://localhost:3600` 열고 우측 하단 스위처로 색상 선택
   - 확정 후 선택 컬러를 기본값으로 CSS 변수 고정, 스위처 제거

2. **KakaoTalk 링크 교체**
   - v7: `v7/index.html` `href="KAKAO_LINK_HERE"` → 실제 링크로 교체

3. **Cloudflare Pages 배포**
   - GitHub 저장소 연결 → 자동 배포
   - 배포 대상 디렉토리: `/v7` (현재 방향)
   - 커스텀 도메인 연결

### 이후 작업
- [ ] 모바일 반응형 세부 점검 (v7 기준)
- [ ] OG image 추가 (og:image 1200×630 PNG)
- [ ] 확정 전까지 v7 컬러 스위처 유지

---

## 파일 구조

```
resume-ai/
├── index.html         # v1 메인
├── style.css
├── script.js
├── v2/                # Bento Grid + Amber
├── v3/                # 백업
├── v4/                # 백업
├── v5/                # 기능 완성본 (다크)
├── v6/                # 다크 + 2컬러 + 피처드 카드
├── v7/                # ⭐ 현재 방향 — 라이트 테마 + pill nav + 컬러 스위처
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── favicon.svg
├── PROGRESS.md
└── LICENSE
```

---

## 로컬 개발 서버

```bash
# v7 (현재 작업 버전) ⭐ — 포트 점유 시 먼저 kill 후 기동
npx serve resume-ai/v7 --listen 3600   # http://localhost:3600

# 포트 강제 해제 (PowerShell)
# Get-NetTCPConnection -LocalPort 3600 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }

# 이전 버전 참고용
# npx serve resume-ai/v6 --listen 3500
# npx serve resume-ai/v5 --listen 3400
```

---

## 주요 구현 메모

### 아키텍처 다이어그램 (v3/v4 공통)
- SVG 인라인 삽입 (Mermaid.js 대신 → 런타임 JS 제로, 경량)
- ViewBox: `800×360`, 노드 `150×70`, 폰트 11px/9px
- PC: `@media (hover:hover) and (pointer:fine)` → 카드 hover 시 max-height 전개
- 모바일: `@media (hover:none) and (pointer:coarse)` → 버튼 클릭 + `overflow-x:auto`

### Email Obfuscation (v3/v4 공통)
```js
const u = 'sky14786', d = 'gmail.com';
// HTML에 이메일 없음, JS 실행 후에만 DOM에 삽입 → 크롤러 차단
```

### v3 Custom Cursor
- `mousemove` 이벤트로 dot/ring 위치 업데이트
- ⚠️ RAF 루프 사용 시 프리뷰 스크린샷 불가 → mousemove 방식 사용

### v3 Kinetic Typography (decode)
- 글자별 `<span class="char">` 분리
- 무작위 문자로 scramble 후 실제 글자로 resolve
- 단어별 delay 차이 (word1: 200ms, word2: 700ms)
