# resume-ai — 작업 진행 현황

## ⚠️ 세션 규칙 (필수)
> **기능 하나 완성될 때마다 즉시:**
> 1. `PROGRESS.md` 작업 내역 및 다음 할 일 업데이트
> 2. 변경 파일 전체 GitHub 커밋 & 푸시
> 3. `README.md` 변경 내용 반영 (기능 추가·수정 시)
>
> **다음 세션 시작 시:** 이 파일을 먼저 읽고 이어서 작업

---

## 프로젝트 개요
- **목적**: JuneYoung Kim 개발자 경력기술서 사이트 (이력서 링크 첨부용)
- **GitHub**: https://github.com/sky14786/resume-ai
- **스택**: 순수 HTML / CSS / JS (빌드 툴 없음)
- **배포**: Cloudflare Pages 완료 → https://juneyoung.pages.dev

---

## 버전 현황

> **⚠️ 2026-06-16 번호 재정렬**: 기존 v7,v8,v13,v14,v15,v16,v17 → v1~v7로 순서대로 재명명함(git mv, 내용은 그대로). 아래는 새 번호 기준. 이 표 이전에 존재했던 옛 v1~v6(루트 타임라인, Bento Grid, 네오브루탈리즘 Kinetic Typography 등)는 훨씬 이전에 이미 폐기된 디자인이며 번호만 재사용된 것 — 서로 다른 내용이니 혼동 주의.
>
> **현재 어느 버전이 메인 방향인지 미확정** — v2(Impeccable 완성), v3(White Glass), v5/v6/v7(신규 테마) 등이 동시에 존재. 다음 세션에서 정리 필요.

| 새 번호 | 이전 번호 | 테마 | 비고 |
|---|---|---|---|
| v1 | v7 | 라이트 테마, pill nav, 7색 테마 스위처 | Architecture Lightbox, 병원 항목 보강 |
| v2 | v8 | Neobrutalism (크림+바이올렛+틸) | v1(구v7) 클론 + Impeccable 풀 워크플로우(harden/adapt/optimize/distill/polish), DESIGN.md/PRODUCT.md 포함. KakaoTalk 링크 미교체 |
| v3 | v13 | White Glass — 순백+인디고+글래스모피즘 | redstone-preview.png 프리뷰 포함 |
| v4 | v14 | Clean Minimal White | 순백+인디고, rounded 카드 |
| v5 | v15 | Heavy Editorial | Barlow Condensed 800, 빨강 액센트 `#dc2626`, 카드 없음 |
| v6 | v16 | Spatial Cards Dark | 다크 `#0c0c0e`, 인디고 `#818cf8`, blur nav |
| v7 | v17 | Ruled Paper | 룰드 라인 배경, 인디고 좌측 border |

**로컬 미리보기 (Docker, F 드라이브 기준)**
> 2026-06-16: 포트별 컨테이너 7개 방식 → 컨테이너 1개 + 경로 분기 방식으로 전환.
```bash
docker run -d --name resume-ai -p 5000:80 -v "F:/ai/resume-ai:/usr/share/nginx/html:ro" nginx:alpine
# http://localhost:5000/v1/ ~ http://localhost:5000/v7/ (포트 동일, 경로로만 구분)
```

---

## 완료된 작업

### 이번 세션 완료 (2026-06-16) — 버전 전환 위젯 + 컬러 기본값 정리
- [x] v1, v2 기본 accent 컬러 Violet → Lime로 되돌림 (`--accent`/`--accent2`/`--ar`)
- [x] v1, v2 컬러 테마 스위처(`#theme-sw`) 임시 숨김 — `display:none`만 적용, 코드/기능은 그대로 보존 (나중에 다시 노출 가능)
- [x] v1~v7 전체에 **버전 전환 위젯**(`#version-sw`) 추가 — 화면 우하단 고정, 숫자 배지(1~7) 클릭 시 같은 탭에서 `../vN/` 경로로 즉시 이동
  - v1/v2: 기존 `.tsw-dot` 컬러 스위처와 같은 자리/스타일 패턴 재사용
  - v3/v4: White Glass/Minimal 글래스모피즘 톤에 맞춰 `--card-bg`/`--shadow-card` 사용
  - v5: Heavy Editorial 플랫 스타일에 맞춰 `--line`/`--red`만 사용 (블러 없음)
  - v6: Spatial Cards Dark 다크 배경에 맞춰 `--surface`/`--border-h` 사용
  - v7: Ruled Paper 톤에 맞춰 `--rule`/`--accent` 사용
  - 7개 버전 모두 인쇄(`@media print`) 시 숨김 처리
- [x] 로컬 도커(`http://localhost:5000/v1/`~`/v7/`)에서 7개 전부 정상 응답 확인
- [x] 버전 전환 위젯 레이아웃/라벨 수정: v3~v7만 세로 배치였던 불일치 발견 → 7개 전부 가로(`flex-direction:row`) 배치로 통일, 숫자 단독("1") → "v1" 텍스트 필 배지로 변경 (원형 → border-radius 4~8px 사각/필 모양)
- [x] v3~v7 위젯 테두리 대비 개선: 카드용 반투명/연한 색(`--card-border`/`--line`/`--border-h`/`--rule`) → 본문 텍스트색(`--text-primary`/`--ink`/`--text`) 풀오파시티로 교체, v1/v2와 동일하게 또렷하게 보이도록
- [x] v3~v7에 v1/v2(`.tsw-panel`)와 같은 **감싸는 패널** 추가 (`.vsw-panel`) — 배지들이 개별로 흩어져 있던 것을 배경+테두리+그림자가 있는 패널 안에 담아 "떠 있는" 느낌으로 통일. 버전별 그림자 표현: v3/v4 `var(--shadow-card)`, v5/v7 오프셋 하드 섀도, v6 다크 드롭 섀도
- [x] v5/v6/v7 redstone 프리뷰 이미지 404 수정 — 재명명 전 `../v14/redstone-preview.png` 참조가 그대로 남아있던 것을 `../v4/`로 수정 (v14→v4 재명명 시 누락된 경로)
- [x] 재명명 사이드이펙트 전체 점검 — v3 푸터 "v13", v4 푸터 "v14" 텍스트 잔존 수정 (`v13-shadow` SVG 필터 ID는 파일 내부 자체 참조라 문제없어 그대로 둠)
- [x] v5/v6 "전체 대시보드 ↗" 오버레이 클릭 무동작 버그 수정 — CSS는 클릭 가능하게(`cursor:pointer`, hover) 돼있었지만 JS 핸들러가 없었음. 처음엔 새 탭으로 열도록 했다가, v1~v4와의 일관성을 위해 **모달 형태로 재변경**
- [x] v5/v6에 v1~v4와 동일한 Grafana 모달(hero+stat 4패널 그리드, backdrop, ESC/X/배경클릭 닫기) 추가 — `role="dialog" aria-modal="true"`, 포커스 이동(열때 닫기버튼/닫을때 트리거로 복원) 포함. v7은 프리뷰 카드 없이 단순 외부 링크라 모달 대상에서 제외(새 탭 유지)
- [x] 파비콘 404 수정 — v3~v7에 `<link rel="icon">` 자체가 없어서 브라우저가 사이트 루트 `/favicon.ico`를 자동 요청하다 404 나던 것. resume-ai 루트에 `favicon.svg`(v1과 동일, JY 모노그램) 추가 + v3~v7 `<head>`에 `<link rel="icon" href="../favicon.svg">` 명시
- [x] Grafana NoData 원인 확인 — resume-ai 문제가 아니라 metric-stream의 generator/consumer 컨테이너가 `profiles:[production]`에 묶여 있어 시작이 안 된 상태였음(9일치 데이터 누락). `docker compose -f docker-compose.yml -f docker-compose.local.yml --profile production up -d generator consumer`로 재기동, 실시간 적재 재개 확인
- [x] Grafana 로컬/운영 분기 불일치 발견 및 통일 — v1/v2만 완전 분기(프리뷰+모달), v3/v4는 모달만 분기(프리뷰는 항상 운영 URL), v5/v6는 분기 전혀 없었음(운영 URL 하드코딩). v3/v4/v5/v6 전부 `<script>` 최상단에 v1/v2와 동일한 `isLocal` 전역 치환 IIFE 추가해 통일 (`iframe[data-src]` 전체 대상, gpanel 클래스 없어도 적용되도록 일반화). v7은 iframe 없는 단순 링크 구조라 분기 불필요
- [x] v3~v7 구분자 규칙(`·` → `,`) 일괄 적용 — 가운뎃점 51/46/17/18/87개 → 전부 0개. 카드 안내문구 "설계·기획"은 "설계, 기획"으로
- [x] v3~v7 경력/프로젝트 문구를 v1 기준으로 통일 — 같은 사실(예: Slave binlog 복제 중단)이 버전마다 다르게 적혀 있던 것 확인 후 전부 v1 문장으로 교체. 제목(해외→태국 IPTV), 부제 role 접두사(`Backend Engineer, ` 등) 제거, 기간 구분자(`~`→`—`), 통계/태그 개수(v1엔 없는 항목 제거), em dash(about 섹션 "—") → 콤마로 정리. v2는 사용자 요청 범위 밖이라 그대로 둠

### v1 / v2 / v3 기본 구조 (이전 세션)
- [x] v1: 3테마, 타이핑 애니메이션, Career/Skills/Footer
- [x] v2: Bento Grid, spotlight, 앰버 테마
- [x] v3: Neobrutalism, Kinetic Typography, Custom Cursor, Command Palette, Scroll Storytelling

### 이전 세션 완료
- [x] MAI-WACS 카드 — 아키텍처 다이어그램 SVG 인라인 삽입
- [x] PC hover / 모바일 click 반응형 다이어그램 토글
- [x] 모바일 가로 스크롤 대응 (min-width: 600px)
- [x] SVG 노드 크기 및 폰트 확대 (130×60 → 150×70, 9px → 11px)
- [x] About 섹션 (03) — v3/v4 모두
- [x] Contact 섹션 (04) — GitHub / Email obfuscated / KakaoTalk 플레이스홀더
- [x] v4 신규 생성 — 비주얼 강화 (섹션 bg 숫자, 대형 quote, 터미널 블록, ALWAYS OPEN. 타이포)
- [x] v5/v6/v7 신규 생성 — 기능·테마 단계적 강화
- [x] Cloudflare Pages 배포 완료 → https://juneyoung.pages.dev

### 이번 세션 완료 (2026-05-29)
- [x] v7 og:url 추가 (`https://juneyoung.pages.dev`)
- [x] Hero stat 서브텍스트 추가 (Experience / 3BB IPTV / MAI-WACS)
- [x] 병원 앱 경력 항목 보강 (Shell Script, Nginx, Pacemaker HA)
- [x] SVG 다이어그램 개선 (서브타이틀, 내부망 경계, 화살표)
- [x] Architecture Lightbox (SVG 클릭 확대 모달)
- [x] About 메타 배지 (available 상태 + 위치)
- [x] 테마 스위처 Olive / Violet 추가 (총 7개)
- [x] PROGRESS.md / 메모리 업데이트 + GitHub 커밋·푸시

### 이번 세션 완료 (2026-06-15)
- [x] xavierchoi_skills 플러그인 설치 (`C:\Users\June\.claude\settings.json` + git clone)
  - frontend-for-opus-4-5, vs-design-diverge, experts, resume-coach, git-pr-autofix (5개)
- [x] v15 신규 생성 — Heavy Editorial 디자인
  - Barlow Condensed 800 + Inter, 흰 배경 `#ffffff`, 빨강 액센트 `#dc2626`
  - 카드 없음 · border-top 구분선 · 태그 슬래시 분리 · 섹션 ghost 텍스트
- [x] v16 신규 생성 — Spatial Cards Dark 디자인
  - Inter only, 다크 배경 `#0c0c0e`, 인디고 `#818cf8` 액센트
  - card border-radius 12px + hover elevation, blur nav, green 라이브 dot
- [x] v17 신규 생성 — Ruled Paper 디자인
  - repeating-linear-gradient 32px 룰드 라인 배경, 인디고 좌측 border

### 이번 세션 완료 (2026-06-15) — v8 Impeccable 전체 워크플로우
- [x] v8 신규 생성 (v7 클론) + Impeccable 스킬 init 설정 (`.agents/skills/` 정크션)
- [x] v8 DESIGN.md 작성 — Google Stitch 포맷, YAML frontmatter, 6섹션
  - North Star "The Field Manual", Two-World Rule, One-Violet Rule, No-Blur Rule
  - 컴포넌트 스펙: brutCard, btag, navPill, sectionLabel, cmdPalette, architectureDiagram
- [x] v8 `.impeccable/design.json` sidecar 생성 — 토널 램프, 그림자 어휘, 모션 패턴, 컴포넌트 HTML/CSS 스니펫, z-index 스케일
- [x] v8 `/audit` 실행 → 12/20 Acceptable (P0×2, P1×6, P2×7, P3×4)
- [x] v8 `harden` — `:focus-visible` 전역 규칙, `prefers-reduced-motion` 완전 대응
  - `.anim-ready` opt-in 패턴 (콘텐츠 opacity 게이팅 버그 해소)
  - ARIA dialog (`role="dialog" aria-modal="true"`) — cmd palette, arch lightbox, Grafana modal
  - `createFocusTrap()` 유틸리티 + 모든 모달에 포커스 트랩/복원 적용
  - 대비 수정: `--text-body: #555` (7.9:1), `--text-meta: #666` (5.5:1) 신규 토큰
  - skip-nav, gstatic preconnect, SVG 키보드 접근(tabindex+Enter), iframe title, KakaoTalk 플레이스홀더
- [x] v8 `adapt` — 모바일 nav-center 숨김, touch targets 44px (pointer:coarse), hero-stats flex-wrap
- [x] v8 `optimize` — arch-lightbox 소프트 그림자 → 네오브루탈리즘 오프셋 그림자
- [x] v8 `distill` — border-left 사이드 스트라이프 금지 적용
  - `.proj-ai-note`: border-left 제거 → 전체 테두리 + 배경 틴트
  - `.about-quote-big`: border-left 제거 → 기존 `::before` 큰따옴표 시각 요소로 대체
- [x] v8 `polish` — `.clink-disabled` 스타일 추가, 나머지 대비 정리

### 이번 세션 완료 (2026-06-14)
- [x] `D:\ai\CLAUDE.md` — 미커밋 목록 제거, 설치된 Claude Code 도구 섹션 추가
- [x] Impeccable 스킬 설치 (`~/.claude/skills/impeccable/`, `~/.claude/agents/impeccable-manual-edit-applier.md`)
- [x] `D:\ai\.claude\skills\impeccable-guide.md` — Impeccable 전체 커맨드·워크플로우 가이드 파일 생성
- [x] humanize-korean 플러그인 (`im-not-ai` 마켓플레이스) 설치 완료

### 이번 세션 완료 (2026-06-13)
- [x] v13 신규 생성 — White Glass 테마 (순백 배경, 인디고 액센트, 글래스모피즘)
- [x] v13 arch-zoom-hint 위치 하단→상단 우측 이동 (레이어 라벨 겹침 해소)
- [x] v13 `.career-year` 중복 연도 pill 제거 (`.career-period`만 유지)
- [x] v13 docker-compose 예시 코드 블록 제거 (metric-stream·redstone 카드)
- [x] v13 Grafana 모달 lightbox 복원 + 로컬/프로덕션 URL 자동 전환
- [x] v13 redstone-preview.png 이미지 프리뷰 복원
- [x] v13 IPTV SVG DB 클러스터 추가 (메인 M/S/S, API HISTORY M/S, 채널이력 M/S)
- [x] v13 IPTV SVG 겹침 해소, viewBox 490→378, 프리뷰 max-height 200px

### 이번 세션 완료 (2026-06-12, 세션 3)
- [x] 전 프로젝트 `/humanizer` 2차 적용 (resume-ai v7, redstone README):
  - IPTV li-ctx em dash 제거
  - WACS 카드 제목 `전면 재구축` → `재구축`
  - 어드민 불릿 em dash → 콤마
  - Projects 안내 `직접 수행` → `본인`, metric-stream 불릿 `직접` 제거 + `(AI 구현)` 명시
  - redstone 불릿 `직접 운영` + em dash 정리
  - About 터미널 `전면 안정화` → `안정화`, em dash 2개 제거
  - redstone README `관리자 —` → `관리자:`

### 이번 세션 완료 (2026-06-12, 세션 2)
- [x] 경력 불릿 AI 투 표현 제거 + 문체 개선 (`/humanizer` 적용):
  - 병원: em dash 2개 제거, `직접` 제거
  - IPTV: `미자동화로` → `수동 관리로`, em dash 제거, `분기별 전체 서버 점검` → `장애 예방 점검`
  - WACS: `전면 재구축` → `재구축`, `지표 임계치` → `수집 지표 기준치`

### 이번 세션 완료 (2026-06-12)
- [x] `CLAUDE.md` 신규 생성 — 글쓰기 스타일 가이드 (AI 투 표현 지양, 구분자 규칙, 팩트 확인 주의사항)
- [x] `/humanizer` 스킬 설치 — `C:\Users\June\.claude\commands\humanizer.md` (다음 세션부터 사용 가능)
- [x] `.bstat` 태그 폰트 10px → 12px, 패딩 확대 (가독성 개선)
- [x] 경력 불릿 전체 AI 표현 제거 + 자연스러운 문체로 개선:
  - 병원: `인계받은` 제거, `디스크 풀` → `disk full`, `파악하던 구조` → `상황`, `로그 적재` → `로그`
  - IPTV: 파티션 불릿 2개로 분리 (쓰기 부하 이전 / 파티션 자동화), `해외` → `태국`
  - WACS: `의도적 장애 테스트` → `장애 테스트`, `(PostgreSQL)` 괄호 제거
- [x] IPTV DB 이전 불릿 실제 원인으로 재작성: `쓰기 부하` → `Slave binlog 불일치로 복제 중단`
- [x] 면접 준비 파일(`C:\major\interview_progress.md`) 참조하여 이력서 내용 검증
  - Redis 불릿: 원인 불명확 → 현행 유지
  - 결제 API 중복 호출: 이력서에 넣기 부적절 → 제외
  - 무중단 전환 스토리: 사실 아님(Slave 중지) → 추가 안 함

### 이번 세션 완료 (2026-06-11)
- [x] `.btag` 태그 폰트 사이즈 10px → 12px, 패딩 확대 (가독성 개선)
- [x] `·` → `,` 전체 교체 (list 구분자). 복합어(`개발/운영`, `생성/삭제`, `이메일/SMS` 등)는 `/`로 처리

### 이번 세션 완료 (2026-06-10)
- [x] WACS SVG 아키텍처 다이어그램 전면 재설계
  - 수집서버(Telegraf) + KAFKA + FLINK를 하나의 서버 그룹 박스로 묶음 (PACEMAKER HA 컨테이너 박스)
  - 350 SERVERS → 수집서버 → KAFKA → FLINK → POSTGRESQL 흐름 시각화
  - MONITORING ↔ API SERVER ↔ POSTGRESQL ↔ SPRING BATCH 오른쪽 배치
  - PACEMAKER 별도 노드 제거 → 컨테이너 박스 레이블로 통합
  - 불필요한 레이어 라벨(USER/APP/INFRA) 및 레이어 배경 rect 제거

### 이번 세션 완료 (2026-06-08)
- [x] Grafana 모달 네오브루탈리즘 리디자인
  - 모달 박스: accent color 2px 테두리 + 6px offset 그림자
  - 헤더: LIVE 배지 pillbox 스타일, 타이틀 20→26px, title-row flex 레이아웃
  - 메타바 추가: arch flow 텍스트 + 서버/리전/로그량 뱃지
  - timeseries 높이 360→420px (stat grid 4열 유지 — 2×2 시도 후 원복)
- [x] 병원 카드 경력 불릿 before/after 구조 전면 재작성
  - 문제 상황(`.li-ctx` muted) + `→ 해결` 2줄 구조로 전환
  - 잘못 추가된 항목 3개 제거: Nginx/SSL(실제 없던 작업), Pacemaker HA(WACS 오삽입), 무중단이관 태그(근거 없음)
  - 최종 5개: MySQL 복제 재동기화 / mysqldump 백업 자동화 / Docker binlog 디스크풀 해소 / PG사 모듈 단계별 로그 / 헬스체크 API 이중인증

### 이번 세션 완료 (2026-06-05 세션 2)
- [x] `·` → `,` 전체 교체 — index.html(27곳), og-image.svg, og-preview.html
- [x] 익명화 완료 — og-image.svg, og-preview.html, index.html `MAI-WACS` → `모니터링 시스템` (3곳), `3BB IPTV` → `해외 IPTV`
- [x] 크롤링 차단 — `v7/robots.txt` 생성 + `<meta name="robots" content="noindex, nofollow"/>` 추가
- [x] Contact 섹션 정리 — `ALWAYS OPEN.` 타이포 및 설명 문구 제거, 링크 카드만 유지. 관련 CSS(.contact-statement/.cs-line/.cs-outline/.contact-desc) 전부 제거
- [x] Grafana 익명 접근 수정 — `metric-stream/docker-compose.yml`에 `GF_AUTH_ANONYMOUS_ORG_ROLE=Viewer` 추가 (d-solo 패널 302 리다이렉트 해결)

### 이번 세션 완료 (2026-06-05)
- [x] **Projects 섹션 신규 추가** (02번 — Skills→03, About→04, Contact→05 재정렬)
  - metric-stream 카드 구성 (제목·설명·태그·불릿 4개)
  - Grafana d-solo iframe 카드 프리뷰 (timeseries 풀와이드, 클릭 오버레이)
  - 모달 lightbox 구현 — 헤더(LIVE·프로젝트명·스택·GitHub) + timeseries + stat 4개 한 줄
  - LIVE 레이블에 "임의 생성 로그 기반 실시간 통계" 표기
  - Career ↔ Projects 섹션 구분선 추가
- [x] Nav에 Projects 링크 추가, 커맨드 팔레트에 metric-stream 항목 추가
- [x] 불릿 문장 간결하게 재작성 (기술 스펙 나열 → 기능 중심 설명)

### 이번 세션 완료 (2026-06-02)
- [x] 아키텍처 SVG 노드 라벨 실제 구성에 맞게 수정
  - 병원: `PATIENT APP` → `USER`, `DB PRIMARY` → `DB 1`, `DB REPLICA` → `DB 2`, 서브텍스트 `도메인 URI`
  - IPTV: `L4 SWITCH` → `LB SWITCH (물리 · Physical)`, API SERVER 숫자(×20) 제거
- [x] PROGRESS.md 세션 규칙에 README 업데이트 조건 추가
- [x] OG image 추가 — `v7/og-image.svg` 생성 + `og:image` 메타 태그 적용 (og-preview.html 참고용 포함)
- [x] 어드민 카드 bstat (`첫 투입 프로젝트` / `6개월`) 제거
- [x] IPTV 카드 — 해외 협력사 단독 담당 경험 항목 추가 (출장 횟수·국가명 제거, 역할 중심)
- [x] NDA 대응 — 고객사명 전체 익명화
  - 성모병원·경희대병원 → `대형 병원 10개소` (카드 서브텍스트, SVG 자막)
  - 3BB GIGA IPTV → `해외 IPTV 플랫폼` (카드 제목, SVG, 커맨드 팔레트, Hero stat)
  - 해외 협력사(태국) → `해외 협력사` (국가명 제거)

---

## 다음 작업 (TODO)

### 🔜 다음 세션 우선순위

1. **v2(구 v8) KakaoTalk 링크 교체**
   - `v2/index.html` 에 `<!-- TODO: KAKAO_LINK_HERE를 실제 오픈채팅 URL로 교체 -->` 주석 있음
   - `.clink-disabled` → 실제 URL 넣고 `clink-disabled` 클래스 제거

2. **metric-stream GCP 배포 후 Grafana 모달 URL 교체**
   - 플랫폼: GCP e2-micro (1GB RAM, 상시 무료)
   - Kafka HEAP: `-Xmx256m`, generator/consumer: `-Xmx128m`
   - 배포 완료 후 localhost:3000 → 공개 URL로 교체 + nginx + SSL

### 이후 작업
- [ ] 모바일 Nav 과밀 점검 (로고 + 3링크 + PDF + CMD 버튼 — 375px 이하 겹침 가능)
- [ ] OG image PNG 변환 — 카카오톡 SVG 미지원 시 `og-preview.html` 스크린샷으로 교체

---

## 파일 구조

```
resume-ai/
├── index.html         # 구버전 잔존 (루트, 사용 안 함)
├── style.css
├── script.js
├── v1/                # 라이트 테마 + pill nav + 컬러 스위처 (구 v7)
├── v2/                # Neobrutalism + Impeccable 완성본, DESIGN.md/PRODUCT.md (구 v8)
├── v3/                # White Glass — 순백+인디고+글래스모피즘 (구 v13)
├── v4/                # Clean Minimal White (구 v14)
├── v5/                # Heavy Editorial — Barlow Condensed, 빨강 액센트 (구 v15)
├── v6/                # Spatial Cards Dark (구 v16)
├── v7/                # Ruled Paper (구 v17)
├── PROGRESS.md
└── LICENSE
```

---

## 로컬 개발 서버 (Docker, F 드라이브 기준)

```bash
docker run -d --name resume-v1 -p 5001:80 -v "F:/ai/resume-ai/v1:/usr/share/nginx/html:ro" nginx:alpine
# v2~v7도 동일 패턴으로 포트 5002~5007
```
