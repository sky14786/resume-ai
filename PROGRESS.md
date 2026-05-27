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

### v5 (`/v5/`) ⭐ 현재 진행 방향
- **기반**: v4 복사 후 기능 강화
- **추가된 기능** (2026-05-28):
  - favicon.svg (JY 로고, lime #a3e635)
  - OG 태그 (title/description/type/twitter:card)
  - PDF 버튼 (nav 우측, `window.print()`)
  - Print CSS (`@media print`) — 흰 배경, 아치 다이어그램 자동 펼침
  - 카드별 임팩트 칩 (`.bstat`): 10개병원/100만가입자/350대서버 등
  - Nav 스크롤 스파이 (IntersectionObserver, active underline)
- **로컬 서버**: `npx serve resume-ai/v5` (port 3400)

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

1. **v5 브라우저 시각 검증** ← 반드시 먼저
   - `npx serve resume-ai/v5` 또는 launch.json `resume-ai-v5` (port 3400)
   - 브라우저에서 `http://localhost:3400` 직접 열어야 함
   - 확인 항목: PDF 버튼 동작, 임팩트 칩 위치, 스크롤 스파이 active 표시, 파비콘

2. **KakaoTalk 링크 교체**
   - v5: `v5/index.html` `href="KAKAO_LINK_HERE"` → 실제 링크로 교체

3. ~~**나머지 아키텍처 다이어그램 2개**~~ ✅ 완료 (2026-05-27)
   - 병원 앱: CLIENT → APP(NGINX / API SERVER / PAYMENT) → INFRA(DOCKER / PACEMAKER[HA] / MARIADB / MONITORING)
   - 3BB IPTV: EXT(CMS / STB) → APP(RABBITMQ / API / REDIS) → DATA(MYSQL / JENKINS / DBS)
   - PACEMAKER+DB 점선 HA 클러스터 박스 추가

4. **Cloudflare Pages 배포**
   - GitHub 저장소 연결 → 자동 배포
   - 배포 대상 디렉토리: `/v5`
   - 커스텀 도메인 연결

### 이후 작업
- [ ] 모바일 반응형 세부 점검 (v5 기준)
- [ ] OG image 추가 (og:image 1200×630 PNG)
- [ ] v2 footer GitHub 링크 업데이트 (`sky14786`로 이미 맞음, 확인만)

---

## 파일 구조

```
resume-ai/
├── index.html         # v1 메인
├── style.css          # v1 스타일 (3 테마)
├── script.js          # v1 JS
├── v2/
│   ├── index.html     # v2 (Bento Grid + Amber)
│   ├── style.css
│   └── script.js
├── v3/                # 백업 (안정 버전)
│   ├── index.html     # About/Contact/아키텍처 다이어그램 포함
│   ├── style.css
│   ├── script.js
│   └── arch-sample.svg  # SVG 단독 테스트 파일
├── v4/                # ⭐ 현재 메인 방향
│   ├── index.html     # v3 + 섹션 bg숫자 + 강화된 About/Contact
│   ├── style.css
│   └── script.js
├── PROGRESS.md        # 이 파일
└── LICENSE
```

---

## 로컬 개발 서버

```bash
# v3 (안정 백업)
npx serve resume-ai/v3    # port 3200

# v4 (현재 작업 버전) ⭐
npx serve resume-ai/v4    # port 3300

# launch.json 위치: E:\AI\.claude\launch.json
# 서버명: resume-ai-v3 / resume-ai-v4
# ⚠️ v3/v4 모두 프리뷰 iframe 스크린샷 불가 — 브라우저 직접 열어야 함
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
