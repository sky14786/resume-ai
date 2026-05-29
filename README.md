# JuneYoung Kim — Developer Portfolio

![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-deployed-F38020?style=flat&logo=cloudflare&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-zero%20dependencies-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

> 백엔드 엔지니어 5년 경력의 개발자 포트폴리오 사이트.  
> 순수 HTML / CSS / JavaScript — 빌드 툴, 프레임워크, 패키지 의존성 없이 동작합니다.

---

## ✦ Live

**[→ juneyoung.pages.dev](https://juneyoung.pages.dev)**

---

## ✦ 이 프로젝트에 대하여

코드를 직접 작성하는 대신, **AI(Claude Sonnet, Anthropic)와의 자연어 대화**만으로 설계부터 배포까지 진행한 실험적 프로젝트입니다.

디자인 방향 수립, 컬러 시스템 결정, 레이아웃 설계, 인터랙션 구현, GitHub 커밋, Cloudflare 배포 — 모든 과정이 대화로 이루어졌습니다.

> *"앞으로의 개발이 어떤 방식으로 바뀔 수 있는지를 직접 실험해보고 싶었습니다."*

---

## ✦ 디자인 시스템

Neobrutalism 기반의 라이트 테마. 두꺼운 선, 오프셋 그림자, 날카로운 모서리가 특징입니다.

| 역할 | 값 | 용도 |
|------|-----|------|
| Background | `#faf9f6` | 웜 크림 베이스 |
| Primary Accent | `#a3e635` | Lime — 주요 강조, hover 그림자 |
| Secondary Accent | `#0891b2` | Teal — 날짜, 섹션 번호, 레이블 |
| Border / Shadow | `#0c0c0c` | 네오브루탈리즘 다크 선 |

---

## ✦ 구현된 기능

### 인터랙션
| 기능 | 구현 방식 |
|------|-----------|
| Kinetic Typography | 글자 단위 스크램블 → resolve 애니메이션 |
| Scroll Reveal | `IntersectionObserver` — 카드 좌우 슬라이드 인 |
| Stat Counter | `requestAnimationFrame` 기반 easing 카운트업 |
| Custom Cursor | `mousemove` 이벤트 + CSS transition |
| Floating Pill Nav | `max-width` CSS 트랜지션 + `backdrop-filter: blur` |
| Scroll Progress Bar | 실시간 스크롤 퍼센트 → width |
| Scroll Spy | `IntersectionObserver` — 현재 섹션 nav 하이라이트 |

### UI / 콘텐츠
| 기능 | 구현 방식 |
|------|-----------|
| Command Palette | `Ctrl+K` 단축키, 키보드 탐색, 퍼지 검색 |
| Architecture Diagram | 인라인 SVG — 런타임 JS 제로, hover 펼침 |
| Color Theme Switcher | CSS Custom Properties + `setProperty()` 실시간 교체 |
| PDF 출력 | `@media print` — 라이트 테마 그대로 출력, 그림자만 제거 |
| Email Obfuscation | JS 실행 후 DOM 삽입 — 크롤러 차단 |
| Featured Card | `grid-column: 1/-1` 풀와이드 + 2열 내부 레이아웃 |

---

## ✦ 버전 히스토리

```
v1  TERM / DARK / CYBER 3테마, 세로 타임라인
v2  Bento Grid + 앰버 테마
v3  Neobrutalism, Kinetic Typography, Command Palette
v4  대형 타이포그래피, 터미널 블록, 비주얼 강화
v5  favicon, OG 태그, PDF 출력, 임팩트 칩, Nav 스크롤 스파이
v6  2컬러 계층 (Lime + Cyan), 대표 프로젝트 피처드 카드
v7  라이트 테마, 플로팅 Pill 네브바, 컬러 스위처 ← 현재 배포
```

---

## ✦ 로컬 실행

별도 설치 없이 `npx serve`만으로 즉시 실행됩니다.

```bash
git clone https://github.com/sky14786/resume-ai.git
cd resume-ai

npx serve v7 --listen 3600
# → http://localhost:3600
```

---

## ✦ 배포 구조

```
GitHub (main push)
    └─→ Cloudflare Pages (자동 빌드/배포)
            └─→ juneyoung.pages.dev
```

- 빌드 명령: 없음 (정적 파일 직접 서빙)
- 배포 디렉토리: `/v7`
- `main` 브랜치 push → 1~2분 내 자동 반영

---

## ✦ 기술 스택

```
Language  HTML5 · CSS3 · Vanilla JavaScript (ES2022+)
Font      Inter · JetBrains Mono (Google Fonts)
Hosting   Cloudflare Pages
CI/CD     GitHub → Cloudflare Pages (자동 배포)
Tools     npx serve (로컬 개발)
```

---

<p align="center">
  Designed & built with <a href="https://claude.ai">Claude (Anthropic)</a>
</p>
