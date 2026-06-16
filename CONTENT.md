# resume-ai — 경력 콘텐츠 기준 문서

> 모든 버전(v1~v7)의 경력/프로젝트 텍스트가 서로 다르게 적혀 있던 것을 발견하고,
> **v2 본문을 사실 검증 기준**으로 삼아 정리한 문서. 2026-06-16.
>
> **사용 방법**: 다른 버전(v1, v3~v7)의 경력/프로젝트 섹션을 고칠 때 이 문서를 기준으로 맞춘다.
> 디자인/레이아웃(태그 나열 방식, 통계 배지 개수 표현 등)은 버전마다 달라도 되지만,
> **사실과 문장 내용은 이 문서를 따른다.**

---

## 미해결 항목 (반영 보류)

- **WACS "이메일/SMS" 불릿** — v1/v2 모두 "수집 지표 기준치 초과 시 알림 자동 발송"을 구현했다고 되어 있는데, 본인이 "이건 내가 안 했는데?"라고 확인함. 실제로 한 일이 무엇인지 확인 후 반영 필요.
- **어드민 섹션 구조** — "전부 신규 개발이라 before/after 구조보다 성과 중심이 맞을 수도" — 구조 변경 여부 미결정.

---

## 1. 다기관 병원 환자중심 앱 (2025.08 — 2026.02)

- **부제**: 대형 병원 10개소 유지보수
- **스택**: Spring Boot, MariaDB, Docker, Shell Script, Nginx, Pacemaker
- **통계**: 10개 병원 / 6개월

**불릿 (before → after)**
1. MySQL 복제 단절 상태로 운영 중 → SLAVE STATUS 에러 분석 후 순차 스킵으로 복제 재동기화
2. 백업 체계 없이 운영되던 DB → mysqldump + cron으로 정기 백업 자동화
3. Docker binlog 누적으로 disk full 발생 → 파일 truncate로 즉시 해소
4. 결제 실패 원인을 로그 없이 추론으로만 파악하던 상황 → PG사 모듈 교체 시 단계별 로그 추가, 이후 원인 추적 가능
5. 라이브 서비스 장애 시 상태 파악 수단 없음 → 헬스체크, 리소스 조회 API 개발 (IP 화이트리스트 + 서버별 해시 키 이중 인증)

---

## 2. 태국 IPTV 플랫폼 (2021.01 — 2025.12)

> 카드 제목에는 "태국" 표기 허용(익명화 예외), 어드민 카드 제목은 "해외 IPTV 플랫폼 어드민" 유지.

- **부제**: 가입자 100만 규모 플랫폼, 5년 개발/운영
- **스택**: Spring Boot, Redis, RabbitMQ, MySQL
- **통계**: 100만 가입자 / 5년 운영

**불릿**
1. 팀장/레드마인/고객사 DM 등 다채널로 유입되는 요구사항 수신, 경중 판단 후 선조치 또는 보고 후 실행
2. 고객사 담당자와 1:1 소통 (현지 출장, AI 번역 활용), 단독 판단 가능한 건 선조치 후 보고
3. 외부 시스템(STB, CMS, DBS) API 유지보수 및 변경 대응
4. (before→after) Slave DB에서 파티션 DDL 실행 → binlog 불일치로 복제 중단 → 해당 테이블 별도 DB로 물리 이전, Master에서만 DDL 실행하도록 재구성
5. (before→after) DB 파티션 생성/삭제 수동 관리로 디스크 포화 반복 → 파티션 자동 생성/삭제 설정으로 디스크 운영 정상화
6. (before→after) Redis 캐시 구성은 있었으나 write-through 미적용, 캐시 미스 빈발 → write-through 전략 적용으로 미스율 감소, 응답 속도 안정화
7. 분기별 전체 서버 리소스(CPU, 메모리, 디스크) 및 프로세스 구동 여부 점검, 보고서 제출

---

## 3. 모니터링 시스템 재구축 (2022.06 — 2023.10)

- **부제**: 350대 서버 30초 단위 실시간 로그 수집 파이프라인
- **스택**: Kafka, Flink, Docker, PostgreSQL, React, DRBD, Pacemaker
- **통계**: 350대 서버 / 30초 단위 수집

**불릿**
1. (before→after) 미사용 상태로 방치된 수집 시스템 → AI 기반 장애 예측 목적으로 Telegraf → Kafka → Flink 파이프라인 재구축
2. (before→after) 전체 수집 데이터 조회로 Chart.js 렌더링 지연 → 집계 단위 조정으로 사용 가능한 수준으로 개선
3. (before→after) pgpool HA 구성했으나 장애 테스트 시 다운타임 과다 → DRBD + Pacemaker로 전환, DB 무중단 HA 운영
4. ⚠️ 수집 지표 기준치 초과 시 이메일/SMS 알림 UI 및 발송 API 연동 구현 — **사실 확인 필요(보류)**
5. React 기반 실시간 모니터링 대시보드 개발 (에러 발생 서버 수, 전체 서버 수, 에러율 시각화)

---

## 4. 해외 IPTV 플랫폼 어드민 (2020.07 — 2021.01)

> ⚠️ 신규 개발 위주라 before/after 구조보다 성과 중심 서술이 더 맞을 수 있음 — 구조 변경 여부 미결정.

- **부제**: 관리자 시스템 개발
- **스택**: Spring Boot, JSP, jQuery, MySQL

**불릿**
1. Spring Boot + JSP 기반 어드민 MVC 아키텍처 설계 및 전체 구현
2. 콘텐츠 뷰어, 사용자 관리, 환경설정, STB 단말 현황 기능 개발
3. 광고 활성화, 결제 수단 관리 UI 구현
4. jQuery AJAX 비동기 처리, 페이지 전환 없이 실시간 데이터 갱신

---

## 5. Projects — metric-stream (2026, 개인 토이 프로젝트)

- **부제**: 실시간 서버 API 로그 수집 파이프라인
- **스택**: AI 구현, Kafka, Spring Boot, PostgreSQL, Grafana, Docker, Java 17

**불릿**
1. API 로그를 실시간 수집해 저장, 조회까지 이어지는 파이프라인 구성 (AI 구현)
2. 분당 900건 규모 로그를 자동 생성해 파이프라인 전 구간 동작 검증
3. Grafana 대시보드로 요청량, 에러율, 응답시간 실시간 모니터링
4. Docker Compose 한 명령으로 Kafka, DB, Grafana 전체 인프라 구동

## 6. Projects — redstone (2025, 개인 토이 프로젝트)

- **부제**: 게임 아이템 거래 커뮤니티 포털
- **스택**: AI 구현, Node.js, Express, MongoDB, Docker, Nginx

**불릿**
1. 게임 아이템 매매 게시판, 쪽지함, 관리자 패널 전체 기능 단독 설계/구현
2. Express 세션 기반 인증, MongoDB 데이터 저장, Discord 계정 연동
3. Docker Compose + Nginx 서브패스 라우팅으로 단일 도메인 멀티 서비스 배포
4. 홈서버(VirtualBox VM) 운영 (SSL 자동 갱신, 재부팅 자동 복구)

---

## 7. Skills

- **Core**: Spring Boot, Java
- **DB**: MySQL, MariaDB, PostgreSQL, Redis
- **Stream**: Kafka, Flink, RabbitMQ
- **Infra**: Docker, Nginx, Jenkins, Shell Script, Cron, DRBD
- **Front**: React, JSP, jQuery

---

## 8. About

> 인용구: "낯선 시스템도 스스로 파악하고, 끝까지 책임지는 방식으로 일해왔습니다."
> (v1은 "문서화되지 않은 시스템을 인계받아 처음부터 혼자 분석하고,..." 로 표현이 다름 — v2 기준으로 통일)

- 인계 직후 운영 리스크 확인 → 안정화
- 설계, 배포, 장애 대응, 전체 스택 단독 운영
- 신기술보다 운영 안정성, 문제 해결 속도 우선
- SI/솔루션 출신, 빠른 파악, 빠른 실행
- 좋은 팀과 실질적인 문제를 함께 풀고 싶습니다.

상태: 구직중 / 위치: 서울, 경기, 대전, 재택 가능

---

## 9. Contact

GitHub(github.com/sky14786) / Email(obfuscated) / KakaoTalk(준비중 — `KAKAO_LINK_HERE` 플레이스홀더)
