# resume-ai

> **이 프로젝트는 AI(Claude)와의 대화를 통해 설계 및 구현되었습니다.**

JuneYoung Kim의 개발자 경력기술서 사이트입니다.  
순수 HTML / CSS / JavaScript로 제작되었으며, 빌드 툴이나 프레임워크 없이 동작합니다.

---

## 버전

| 버전 | 테마 | 특징 |
|------|------|------|
| v1 | TERM / DARK / CYBER | 3가지 테마 스위칭, 세로 타임라인 |
| v2 | 앰버(Amber) | Bento Grid 레이아웃 |
| v3 | Lime 네오브루탈리즘 | Kinetic Typography, Command Palette |
| v4 | Lime 네오브루탈리즘 | 대형 타이포, 터미널 블록, 비주얼 강화 |
| v5 | Lime 네오브루탈리즘 | favicon, OG태그, PDF 출력, 임팩트 칩 |
| v6 | Lime + Cyan 다크 | 2컬러 계층, 대표 프로젝트 카드 |
| **v7** | **라이트 테마** | **플로팅 pill 네브바, 컬러 스위처, PDF 최적화** |

현재 배포 버전: **v7**

---

## 주요 기능

- **Kinetic Typography** — 글자 스크램블 후 등장하는 히어로 타이틀
- **Custom Cursor** — 라임 커스텀 커서
- **Command Palette** — `⌘K` / `Ctrl+K` 로 섹션 이동
- **Scroll Reveal** — 카드 스크롤 진입 시 좌우 슬라이드 인
- **아키텍처 다이어그램** — SVG 인라인 삽입, hover 시 펼침
- **플로팅 Pill 네브바** — 스크롤 시 중앙 pill 형태로 전환
- **컬러 테마 스위처** — Lime / Indigo / Orange / Forest / Crimson 실시간 전환
- **PDF 출력** — `@media print` 최적화, 화면과 거의 동일하게 출력
- **Email Obfuscation** — JS 실행 후 이메일 삽입으로 크롤러 차단

---

## 기술 스택

- HTML5 / CSS3 / Vanilla JavaScript
- 빌드 툴 없음 (Zero dependencies)
- 폰트: Inter, JetBrains Mono (Google Fonts)
- 배포: Cloudflare Pages

---

## 로컬 실행

```bash
# v7 (현재 버전)
npx serve v7 --listen 3600
# → http://localhost:3600
```

---

## 배포

GitHub `main` 브랜치에 push 시 Cloudflare Pages가 자동 배포합니다.  
배포 디렉토리: `/v7`

---

## 만든 방법

코드 한 줄 직접 작성하지 않고, **Claude(Anthropic)**와의 대화만으로 설계·구현·배포까지 진행했습니다.  
디자인 방향 결정, 컬러 선택, 기능 추가 모두 자연어 대화로 이루어졌습니다.
