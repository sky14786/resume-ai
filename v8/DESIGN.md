---
name: JuneYoung Kim — Backend Engineer
description: 날카롭고 무겁고 독특한 백엔드 엔지니어의 현장 문서. 채용 결정을 돕는 경력기술서 사이트.
colors:
  bg: "#faf9f6"
  surface: "#ffffff"
  ink: "#0c0c0c"
  muted: "#888888"
  dim: "#d5d0c8"
  accent-violet: "#7c3aed"
  accent-violet-deep: "#6d28d9"
  accent-teal: "#0891b2"
  border: "#0c0c0c"
  terminal-bg: "#0d0d0d"
  terminal-green: "#22c55e"
typography:
  display:
    fontFamily: "'Inter', sans-serif"
    fontSize: "clamp(60px, 9vw, 110px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Inter', sans-serif"
    fontSize: "clamp(28px, 4vw, 40px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Inter', sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "'Inter', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.10em"
rounded:
  none: "0px"
  xs: "3px"
  pill: "100px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "28px"
  xl: "40px"
  section: "100px"
components:
  btag:
    backgroundColor: "rgba(124, 58, 237, 0.10)"
    textColor: "#0c0c0c"
    rounded: "0px"
    padding: "3px 10px"
  btag-hover:
    backgroundColor: "rgba(124, 58, 237, 0.22)"
    textColor: "#0c0c0c"
    rounded: "0px"
    padding: "3px 10px"
  btag-ai:
    backgroundColor: "rgba(124, 58, 237, 0.18)"
    textColor: "#7c3aed"
    rounded: "0px"
    padding: "3px 10px"
  brut-card:
    backgroundColor: "#ffffff"
    textColor: "#0c0c0c"
    rounded: "0px"
    padding: "0"
  brut-card-featured:
    backgroundColor: "#ffffff"
    textColor: "#0c0c0c"
    rounded: "0px"
    padding: "0"
  cmd-trigger:
    backgroundColor: "transparent"
    textColor: "#888888"
    rounded: "0px"
    padding: "6px 12px"
---

# Design System: JuneYoung Kim — Backend Engineer

## 1. Overview

**Creative North Star: "The Field Manual"**

이 사이트는 포트폴리오가 아니라 현장 교범이다. 장애 대응 기록, 시스템 구성도, 수치로 증명된 경력 — 채용 담당자가 5분 안에 결정을 내리기 위한 문서. 모든 픽셀은 정보를 전달하거나 구조를 드러내기 위해 존재한다. 장식을 위해 존재하는 요소는 없다.

표면은 크림 네오브루탈리즘이다 — 흰 카드, 짙은 테두리, 오프셋 섀도우. 그러나 시스템은 깊이를 가진다. 아키텍처 다이어그램은 터미널 블랙 위에 라임 그린 회로로 나타나고, 로그 패널은 호버 시 확장되어 날 JSON을 드러낸다. 이 설계는 하나의 메시지를 전달한다: 이 페이지를 만든 엔지니어는 시스템의 모든 레이어를 이해한다.

이 시스템이 명시적으로 거부하는 것: 포트폴리오 사이트식 연극(파티클, 3D, 글래스모피즘), SaaS 히어로-메트릭 템플릿(큰 그라디언트 숫자 + "지금 시작하기"), AI 기본값으로서의 크림 배경. 크림은 여기서 의도적 선택이다 — 다크 모드의 반대가 아니라, 낮 시간 오피스에서 검토되는 문서의 톤.

**Key Characteristics:**
- 구조적 정직성으로서의 네오브루탈리즘 테두리와 오프셋 섀도우
- 두 개의 타입 역할: Inter(질량·계층) + JetBrains Mono(데이터·레이블·타임스탬프)
- 세부 컨텍스트에서만 드러나는 보조 터미널 세계(아키텍처, 로그, 모달)
- 시간·순서 데이터에는 Teal; 주요 액션과 강조에는 Violet
- 카드와 태그에 border-radius 없음; pill은 플로팅 nav에만

## 2. Colors: The Document and The Terminal

두 개의 세계가 한 페이지를 공유한다. 문서 표면(크림 + 네오브루탈리즘)과 터미널 레이어(near-black + 라임 그린). 둘은 충돌하지 않는다 — 터미널 세계는 내장된 기술 컴포넌트 안에서만 드러난다.

### Primary
- **Deep Violet** `#7c3aed`: 주요 액션 색상. 피처드 카드 오프셋 섀도우, 활성 태그 테두리, 스크롤 프로그레스 바, 통계 카운터, 모든 인터랙티브 강조에 사용. 전체 화면의 10% 이하를 차지하며, 희소성이 무게를 만든다.

### Secondary
- **Precision Teal** `#0891b2`: 순서와 시간을 나타내는 색. 타임스탬프, 섹션 인덱스(01/02/03), 날짜 기간 레이블에만 사용. 소형 모노 크기에서 가독성 확보됨.

### Neutral
- **Pressed Ink** `#0c0c0c`: 모든 카드 테두리와 네오브루탈리즘 섀도우. 본문 텍스트와 동일한 값 — 테두리가 곧 타입 시스템의 일부.
- **Body Cream** `#faf9f6`: 페이지 배경. 따뜻하지만 감상적이지 않음.
- **Card White** `#ffffff`: 카드 표면. 배경에서 카드를 들어올리는 것은 고도(shadow)가 아닌 테두리.
- **Muted Slate** `#888888`: 보조 텍스트, 메타데이터, 비활성 레이블.
- **Dim Stone** `#d5d0c8`: 구분선, 비활성 테두리, kbd 배경.

### Terminal Layer (전용 컴포넌트 한정)
- **Terminal Black** `#0d0d0d`: 아키텍처 SVG 배경, Grafana 모달 배경.
- **Live Green** `#22c55e`: 라이브 데이터 신호 펄스 인디케이터에만 사용.

**The Two-World Rule.** 터미널 레이어(near-black 배경, 라임 액센트)는 내장 기술 컴포넌트 안에서만 존재한다. 터미널 색상을 문서 표면으로 유출하지 않는다.

**The One-Violet Rule.** Violet `#7c3aed`은 전체 화면의 10% 이하. 섀도우, 배지, 프로그레스 바로 분산된다. 한 요소에 집중되면 시스템이 무너진다.

## 3. Typography

**Display Font:** Inter (Google Fonts, sans-serif)
**Label/Mono Font:** JetBrains Mono (Google Fonts, monospace)

**Character:** Inter를 900 weight으로 사용하면 구조적이고 직접적으로 읽힌다 — 엔지니어 이름이 하중을 받는 구조체처럼. JetBrains Mono는 데이터 인접 콘텐츠 전체를 담당한다: 타임스탬프, 섹션 인덱스, 코드, 터미널 레이블. 두 폰트는 도메인이 겹치지 않기 때문에 페어링이 작동한다.

### Hierarchy
| Role | Family | Weight | Size | Leading | Tracking |
|---|---|---|---|---|---|
| Display | Inter | 900 | clamp(60px, 9vw, 110px) | 0.95 | -0.04em |
| Headline | Inter | 800 | clamp(28px, 4vw, 40px) | 1.1 | -0.02em |
| Title | Inter | 700 | 16px | 1.3 | — |
| Body | Inter | 400 | 13–16px | 1.5–1.8 | — |
| Label | JetBrains Mono | 400–800 | 9–13px | — | 0.05–0.14em |

**The Mono Domain Rule.** JetBrains Mono는 본문에 쓰지 않는다. 허용 범위: 섹션 인덱스, 타임스탬프·날짜, 기술 태그, 키보드 힌트, 터미널·로그 콘텐츠, nav 로고. 본문 텍스트는 항상 Inter.

**The Weight Rule.** 강조는 굵기와 크기로 한다. 그라디언트 텍스트(`background-clip: text`)는 금지.

## 4. Elevation

시스템은 기본적으로 평평하다 — 주변광 섀도우 없음. 깊이는 네오브루탈리즘 오프셋 섀도우 패턴으로 전달된다: blur 없는 하드 섀도우, 동일 방향 5–8px 오프셋, `--shadow` `#0c0c0c` 또는 `--accent` `#7c3aed` 사용.

### Shadow Vocabulary
| Name | Value | Usage |
|---|---|---|
| Standard offset | `5px 5px 0 #0c0c0c` | 기본 카드. 하드하고 구조적. |
| Accent offset | `8px 8px 0 #7c3aed` | 피처드 카드, hover 상태. |
| Hover amplified | `8–12px 8–12px 0 #7c3aed` + `translate(-3px,-3px)` | 카드 hover: 이동과 섀도우 성장이 결합. |
| Nav pill | `0 4px 32px rgba(0,0,0,.07), 3px 3px 0 #0c0c0c` | 플로팅 nav만 — ambient + offset 혼합 유일 예외. |

**The No-Blur Rule.** box-shadow blur는 nav pill의 ambient 컴포넌트를 제외하고 항상 0이다. 다른 곳의 소프트 섀도우는 시스템에서 벗어난 것이다.

## 5. Components

### Neobrutalism Card (.brut-card)
시스템의 주요 컨테이너. 날카로운 모서리, 짙은 테두리, 오프셋 섀도우.

- **Shape:** 0px radius (항상 직각)
- **Border:** `2px solid #0c0c0c`
- **Default shadow:** `5px 5px 0 #0c0c0c`
- **Hover:** `translate(-3px, -3px)` + shadow `8px 8px 0 #7c3aed`
- **Featured variant:** rest 상태에서 violet 오프셋 섀도우; 우상단에 star 배지 (JetBrains Mono 9px, violet bg)
- **Interior watermark:** 80px 900-weight ghost year number (6% opacity) — hover 시 violet tint로 전환

### Tech Tags (.btag)
기술 스택 레이블용 스퀘어 칩.

- **Shape:** 0px radius
- **Font:** JetBrains Mono 12px, letter-spacing 0.02em
- **Rest:** `rgba(124, 58, 237, 0.10)` bg + `1px solid rgba(124, 58, 237, 0.40)` border
- **Hover:** `rgba(124, 58, 237, 0.22)` bg
- **AI variant (.btag-ai):** full-opacity violet border, violet text, semi-bold

### Navigation
두 상태: 문서(투명, 전체 폭) → pill(플로팅, 블러, 중앙).

- **Document state:** transparent bg, 테두리·섀도우 없음
- **Pill state (scroll > 80px):** max-width 620px, border-radius 100px, cream bg 92% + `backdrop-filter: blur(20px)`, 얇은 black 테두리, 네오브루탈리즘 오프셋 섀도우
- **Logo:** JetBrains Mono 800, violet period
- **Links:** Inter 13px, letter-spacing 0.05em, muted → ink on hover

### Command Palette
- **Shape:** 0px radius
- **Border:** `2px solid #0c0c0c` + `6px 6px 0 #0c0c0c` offset
- **Background:** card white `#ffffff`
- **Input:** transparent bg, Inter 15px, placeholder muted

### Section Label
- **Structure:** teal mono index + Inter 800 headline + gradient divider
- **Index:** JetBrains Mono 12px, teal `#0891b2`, letter-spacing 0.10em
- **Divider:** `linear-gradient(90deg, #d5d0c8, transparent)`, 2px height

### Architecture Diagram (Signature Component)
카드 내 내장 터미널 세계. 짙은 SVG 패널, JetBrains Mono 레이블, 라임 그린 `#a3e635` 구조선·노드 테두리. 데스크탑: hover 시 확장. 모바일: 항상 표시. 클릭 시 lightbox 모달. 이 컴포넌트에서만 terminal-bg와 lime이 허용된다.

## 6. Do's and Don'ts

### Do:
- **Do** 모든 카드, 입력, 태그, non-pill 컨테이너에 0px border-radius 사용.
- **Do** 짙은 테두리와 네오브루탈리즘 오프셋 섀도우를 항상 쌍으로 사용 — 테두리 없는 섀도우, 섀도우 없는 테두리는 미완성.
- **Do** 모든 메타데이터(날짜, 인덱스, 기술 레이블, kbd 힌트, 터미널 콘텐츠)에 JetBrains Mono; 본문·헤딩에는 Inter.
- **Do** violet accent를 인터랙티브 강조, 주요 상태 배지, 피처드 카드 섀도우에 한정. 화면의 10% 이하.
- **Do** 터미널 레이어(dark bg, 라임 액센트)를 내장 기술 컴포넌트 안에만 유지.
- **Do** hover 시 `translate(-3px, -3px)` + growing shadow offset을 항상 결합 — 둘 중 하나만 단독으로 쓰지 않음.
- **Do** 경력 서술은 수치·사실·결과로 직접 표현 — "효율적인", "최적화된" 같은 모호한 수식어 제거.

### Don't:
- **Don't** 그라디언트 텍스트(`background-clip: text`) 사용. 강조는 weight 또는 size.
- **Don't** 카드, 입력, 태그에 3px 초과 border-radius. pill(100px)은 nav 전용.
- **Don't** blur 있는 소프트 box-shadow를 카드나 버튼에 적용. 하드 오프셋만.
- **Don't** 세 번째 액센트 색상 도입. 시스템은 두 개: violet(주요 액션·강조)과 teal(데이터·시간). Live green `#22c55e`은 라이브 데이터 펄스 인디케이터에만.
- **Don't** JetBrains Mono를 본문 카피에 사용.
- **Don't** 포트폴리오 쇼케이스처럼 만들기(파티클, 3D, 글래스모피즘, 과도한 애니메이션). 이것은 현장 교범이지 쇼릴이 아님.
- **Don't** `border-left` 사이드 스트라이프 액센트를 카드나 콜아웃에 반복. `.proj-ai-note`의 left-border는 레거시 잔재 — 패턴을 복제하지 않음.
- **Don't** 크림/웜-베이지 배경을 신규 섹션에 추가. 크림(`#faf9f6`)은 페이지 본문 색상이며 섹션 색상이 아님.
- **Don't** SaaS 히어로 메트릭 템플릿(큰 그라디언트 숫자 + 작은 레이블 + "지금 시작하기") 구조를 재사용. 현재 stats는 hero 내 지지 증거이지 독립 섹션이 아님.
- **Don't** 모든 섹션에 아이콘 + 제목 + 설명 카드 3열 구조 반복. 그것이 AI의 문법이다.
