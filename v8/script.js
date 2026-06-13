/* ============================================================
   Terminal Portfolio — script.js
   JuneYoung Kim (김준영) — Backend Engineer
   ============================================================ */

'use strict';

/* ---- DOM refs ---- */
const output      = document.getElementById('output');
const inputLine   = document.getElementById('inputLine');
const inputDisplay = document.getElementById('inputDisplay');
const terminalBody = document.getElementById('terminalBody');
const hiddenInput = document.getElementById('hiddenInput');

/* ---- State ---- */
let currentInput   = '';
let historyList    = [];
let historyIndex   = -1;
let isTyping       = false;   // block user input during welcome sequence

/* ============================================================
   CONTENT DATA
   ============================================================ */

const PROMPT_STR = 'juneyoung@portfolio:~$ ';

const ASCII_BANNER = [
  '     ██╗██╗   ██╗███╗   ██╗███████╗██╗   ██╗ ██████╗ ██╗   ██╗███╗   ██╗ ██████╗ ',
  '     ██║██║   ██║████╗  ██║██╔════╝╚██╗ ██╔╝██╔═══██╗██║   ██║████╗  ██║██╔════╝ ',
  '     ██║██║   ██║██╔██╗ ██║█████╗   ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║  ███╗',
  '██   ██║██║   ██║██║╚██╗██║██╔══╝    ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║',
  '╚█████╔╝╚██████╔╝██║ ╚████║███████╗   ██║   ╚██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝',
  ' ╚════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ',
];

const WHOAMI_LINES = [
  { cls: 'line-sep',    text: '━'.repeat(70) },
  { cls: 'line-head',   text: '  NAME     : JuneYoung Kim (김준영)' },
  { cls: 'line-out',    text: '  ROLE     : Backend Engineer / System Operator' },
  { cls: 'line-out',    text: '  FOCUS    : 안정적인 시스템 운영 & 장애 대응' },
  { cls: 'line-sep',    text: '─'.repeat(70) },
  { cls: 'line-accent', text: '  ► 5+ Years     of backend experience' },
  { cls: 'line-accent', text: '  ► 1,000,000+   IPTV users served' },
  { cls: 'line-accent', text: '  ► 350+         servers monitored & managed' },
  { cls: 'line-sep',    text: '━'.repeat(70) },
  { cls: 'line-dim',    text: '' },
  { cls: 'line-dim',    text: '  문서화되지 않은 시스템을 인계받아' },
  { cls: 'line-dim',    text: '  처음부터 혼자 분석하고 끝까지 책임지는 방식으로 일해왔습니다.' },
  { cls: 'line-sep',    text: '━'.repeat(70) },
];

const LS_LINES = [
  { cls: 'line-out',    text: 'drwxr-xr-x  career/' },
  { cls: 'line-out',    text: 'drwxr-xr-x  projects/' },
  { cls: 'line-out',    text: 'drwxr-xr-x  skills/' },
  { cls: 'line-out',    text: 'drwxr-xr-x  contact/' },
  { cls: 'line-dim',    text: '' },
  { cls: 'line-dim',    text: '  tip: cat <name>  to read a file.' },
  { cls: 'line-dim',    text: '       type help   for all commands.' },
];

const HELP_LINES = [
  { cls: 'line-sep',    text: '─'.repeat(60) },
  { cls: 'line-head',   text: '  AVAILABLE COMMANDS' },
  { cls: 'line-sep',    text: '─'.repeat(60) },
  { cls: 'line-accent', text: '  whoami              ' },
  { cls: 'line-out',    text: '    → name, role, stats' },
  { cls: 'line-accent', text: '  ls                  ' },
  { cls: 'line-out',    text: '    → list available files' },
  { cls: 'line-accent', text: '  cat career          ' },
  { cls: 'line-out',    text: '    → full career history' },
  { cls: 'line-accent', text: '  cat career [1-4]    ' },
  { cls: 'line-out',    text: '    → specific career entry' },
  { cls: 'line-accent', text: '  cat projects        ' },
  { cls: 'line-out',    text: '    → side projects' },
  { cls: 'line-accent', text: '  cat skills          ' },
  { cls: 'line-out',    text: '    → tech stack' },
  { cls: 'line-accent', text: '  cat contact         ' },
  { cls: 'line-out',    text: '    → contact info' },
  { cls: 'line-accent', text: '  history             ' },
  { cls: 'line-out',    text: '    → command history' },
  { cls: 'line-accent', text: '  clear               ' },
  { cls: 'line-out',    text: '    → clear terminal' },
  { cls: 'line-sep',    text: '─'.repeat(60) },
  { cls: 'line-dim',    text: '  ↑ ↓  history navigation' },
  { cls: 'line-dim',    text: '  Tab  autocomplete' },
  { cls: 'line-sep',    text: '─'.repeat(60) },
];

const CAREER_ENTRIES = [
  {
    title:  '01. 다기관 병원 환자중심 앱',
    period: '2025.08 – 2026.02',
    stack:  'Spring Boot · MariaDB · Docker · Nginx · Pacemaker',
    items: [
      'MySQL 복제 단절 → SLAVE STATUS 분석 후 순차 스킵으로 재동기화',
      '백업 체계 없던 DB → mysqldump + cron 정기 백업 자동화',
      'binlog 누적 disk full → truncate로 즉시 해소',
      'PG사 모듈 교체 시 단계별 로그 추가로 이슈 추적',
      '헬스체크·리소스 조회 API (IP 화이트리스트 + 해시키 이중 인증)',
    ],
  },
  {
    title:  '02. 태국 IPTV 플랫폼',
    period: '2021.01 – 2025.12',
    stack:  'Spring Boot · Redis · RabbitMQ · MySQL',
    items: [
      '가입자 100만 규모, 5년간 단독 개발/운영',
      'Slave DB 파티션 DDL → binlog 불일치 복제 중단 → 별도 DB로 물리 이전',
      '파티션 자동 생성/삭제로 디스크 운영 정상화',
      'write-through 캐시 전략 적용으로 캐시 미스율 감소',
    ],
  },
  {
    title:  '03. 모니터링 시스템 재구축',
    period: '2022.06 – 2023.10',
    stack:  'Kafka · Flink · Docker · PostgreSQL · React · DRBD · Pacemaker',
    items: [
      '350대 서버 30초 단위 실시간 로그 수집 파이프라인',
      'Telegraf → Kafka → Flink 파이프라인 재구축',
      'pgpool → DRBD + Pacemaker 전환, DB 무중단 HA 구성',
      '이메일/SMS 자동 발송 알림 시스템',
    ],
  },
  {
    title:  '04. 해외 IPTV 어드민',
    period: '2020.07 – 2021.01',
    stack:  'Spring Boot · JSP · jQuery · MySQL',
    items: [
      '어드민 MVC 아키텍처 전체 설계 및 구현',
      '콘텐츠 뷰어, 사용자 관리, STB 단말 현황 화면',
    ],
  },
];

const PROJECTS_LINES = [
  { cls: 'line-sep',    text: '━'.repeat(70) },
  { cls: 'line-head',   text: '  SIDE PROJECTS' },
  { cls: 'line-sep',    text: '━'.repeat(70) },
  { cls: 'line-dim',    text: '' },
  { cls: 'career-title', text: '  metric-stream' },
  { cls: 'line-out',    text: '  Stack : Kafka · Spring Boot · PostgreSQL · Grafana · Docker · Java 17' },
  { cls: 'line-accent', text: '  → API 로그 실시간 수집 파이프라인 (분당 900건 처리)' },
  { cls: 'line-accent', text: '  → Kafka topic 기반 이벤트 스트리밍, Grafana 대시보드 시각화' },
  { cls: 'line-dim',    text: '' },
  { cls: 'line-sep',    text: '─'.repeat(70) },
  { cls: 'line-dim',    text: '' },
  { cls: 'career-title', text: '  redstone' },
  { cls: 'line-out',    text: '  Stack : Node.js · Express · MongoDB · Docker · Nginx' },
  { cls: 'line-accent', text: '  → 게임 아이템 거래 커뮤니티 포털' },
  { cls: 'line-accent', text: '  → REST API + 실시간 거래 목록, 검색 필터' },
  { cls: 'line-dim',    text: '' },
  { cls: 'line-sep',    text: '━'.repeat(70) },
];

const SKILLS_LINES = [
  { cls: 'line-sep',    text: '━'.repeat(60) },
  { cls: 'line-head',   text: '  TECH STACK' },
  { cls: 'line-sep',    text: '━'.repeat(60) },
  { cls: 'line-dim',    text: '' },
  { cls: 'skill-row',   text: '  Core    │ Spring Boot, Java' },
  { cls: 'skill-row',   text: '  DB      │ MySQL, MariaDB, PostgreSQL, Redis' },
  { cls: 'skill-row',   text: '  Stream  │ Kafka, Flink, RabbitMQ' },
  { cls: 'skill-row',   text: '  Infra   │ Docker, Nginx, Jenkins, Shell Script, DRBD' },
  { cls: 'skill-row',   text: '  Front   │ React, JSP, jQuery' },
  { cls: 'line-dim',    text: '' },
  { cls: 'line-sep',    text: '─'.repeat(60) },
  { cls: 'line-dim',    text: '  강점: 장애 대응 / DB 복제 복구 / 실시간 파이프라인 / HA 구성' },
  { cls: 'line-sep',    text: '━'.repeat(60) },
];

const CONTACT_LINES = [
  { cls: 'line-sep',    text: '━'.repeat(60) },
  { cls: 'line-head',   text: '  CONTACT' },
  { cls: 'line-sep',    text: '━'.repeat(60) },
  { cls: 'line-dim',    text: '' },
  { cls: 'line-accent', text: '  Email   : sky14786@gmail.com' },
  { cls: 'line-accent', text: '  GitHub  : https://github.com/sky14786' },
  { cls: 'line-dim',    text: '' },
  { cls: 'line-out',    text: '  Location: 서울 · 경기 · 대전 · 재택 가능' },
  { cls: 'line-out',    text: '  Status  : 구직 중 (2026.06 현재)' },
  { cls: 'line-dim',    text: '' },
  { cls: 'line-sep',    text: '━'.repeat(60) },
];

/* ============================================================
   RENDER HELPERS
   ============================================================ */

/**
 * Append a single DOM line to #output.
 * cls can be one of the .line-* CSS classes, or 'ascii-header', 'career-title', 'skill-row'.
 */
function appendLine(text = '', cls = 'line-out') {
  const div = document.createElement('div');
  div.className = `output-block ${cls}`;
  div.textContent = text;
  output.appendChild(div);
}

function appendBlank() {
  appendLine('');
}

function appendPromptEcho(cmd) {
  appendLine(PROMPT_STR + cmd, 'line-cmd');
}

function renderLines(lines) {
  lines.forEach(l => appendLine(l.text, l.cls));
}

function renderCareerEntry(entry, idx) {
  appendLine('');
  appendLine(`  ${entry.title}`, 'career-title');
  appendLine(`  ${entry.period}`, 'career-period');
  appendLine(`  Stack: ${entry.stack}`, 'line-dim');
  appendLine('  ' + '─'.repeat(60), 'line-sep');
  entry.items.forEach(item => {
    appendLine(`  • ${item}`, 'line-out');
  });
}

function scrollBottom() {
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

/* ============================================================
   COMMAND PROCESSOR
   ============================================================ */

const TAB_CANDIDATES = [
  'help', 'whoami', 'ls', 'clear', 'history',
  'cat career', 'cat career 1', 'cat career 2', 'cat career 3', 'cat career 4',
  'cat projects', 'cat skills', 'cat contact',
];

function processCommand(raw) {
  const cmd = raw.trim();

  if (cmd === '') {
    appendBlank();
    return;
  }

  appendPromptEcho(cmd);

  // Add to history (avoid duplicate consecutive)
  if (historyList[historyList.length - 1] !== cmd) {
    historyList.push(cmd);
  }
  historyIndex = historyList.length;

  const parts = cmd.toLowerCase().split(/\s+/);
  const verb  = parts[0];
  const arg1  = parts[1];
  const arg2  = parts[2];

  switch (verb) {
    case 'whoami':
      renderLines(WHOAMI_LINES);
      break;

    case 'ls':
      renderLines(LS_LINES);
      break;

    case 'help':
      renderLines(HELP_LINES);
      break;

    case 'clear':
      output.innerHTML = '';
      return; // skip blank line at bottom

    case 'history':
      appendLine('');
      if (historyList.length === 0) {
        appendLine('  (no history)', 'line-dim');
      } else {
        historyList.forEach((h, i) => {
          appendLine(`  ${String(i + 1).padStart(3)}  ${h}`, 'line-dim');
        });
      }
      break;

    case 'cat':
      if (!arg1) {
        appendLine("  cat: missing operand. try 'cat career'", 'line-err');
      } else if (arg1 === 'career') {
        if (!arg2) {
          // Full career
          appendLine('');
          appendLine('  ┌─────────────────────────────────────────────────────────────────┐', 'line-sep');
          appendLine('  │                        CAREER HISTORY                          │', 'line-head');
          appendLine('  └─────────────────────────────────────────────────────────────────┘', 'line-sep');
          CAREER_ENTRIES.forEach((e, i) => renderCareerEntry(e, i));
          appendLine('');
          appendLine('  ' + '━'.repeat(68), 'line-sep');
        } else {
          const num = parseInt(arg2, 10);
          if (isNaN(num) || num < 1 || num > 4) {
            appendLine(`  cat career: invalid index "${arg2}". Use 1–4.`, 'line-err');
          } else {
            appendLine('');
            renderCareerEntry(CAREER_ENTRIES[num - 1], num - 1);
            appendLine('');
          }
        }
      } else if (arg1 === 'projects') {
        renderLines(PROJECTS_LINES);
      } else if (arg1 === 'skills') {
        renderLines(SKILLS_LINES);
      } else if (arg1 === 'contact') {
        renderLines(CONTACT_LINES);
      } else {
        appendLine(`  cat: ${arg1}: No such file or directory`, 'line-err');
      }
      break;

    default:
      appendLine(`  command not found: ${cmd}`, 'line-err');
      appendLine("  type 'help' for available commands.", 'line-dim');
      break;
  }

  appendBlank();
}

/* ============================================================
   TAB AUTOCOMPLETE
   ============================================================ */
function tabComplete() {
  const val = currentInput.toLowerCase().trimStart();
  if (val === '') return;

  const matches = TAB_CANDIDATES.filter(c => c.startsWith(val));
  if (matches.length === 0) return;

  if (matches.length === 1) {
    currentInput = matches[0];
    updateDisplay();
  } else {
    // Show options
    appendLine('');
    appendLine('  ' + matches.join('   '), 'line-dim');
    scrollBottom();
  }
}

/* ============================================================
   INPUT DISPLAY
   ============================================================ */
function updateDisplay() {
  inputDisplay.textContent = currentInput;
  scrollBottom();
}

/* ============================================================
   KEYBOARD HANDLERS
   ============================================================ */
function handleKeyDown(e) {
  if (isTyping) return;

  switch (e.key) {
    case 'Enter':
      e.preventDefault();
      const cmd = currentInput;
      currentInput = '';
      updateDisplay();
      processCommand(cmd);
      scrollBottom();
      break;

    case 'Backspace':
      e.preventDefault();
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
      }
      break;

    case 'Tab':
      e.preventDefault();
      tabComplete();
      break;

    case 'ArrowUp':
      e.preventDefault();
      if (historyList.length === 0) break;
      historyIndex = Math.max(0, historyIndex - 1);
      currentInput = historyList[historyIndex] || '';
      updateDisplay();
      break;

    case 'ArrowDown':
      e.preventDefault();
      if (historyList.length === 0) break;
      historyIndex = Math.min(historyList.length, historyIndex + 1);
      currentInput = historyIndex < historyList.length ? historyList[historyIndex] : '';
      updateDisplay();
      break;

    case 'l':
      if (e.ctrlKey) {
        e.preventDefault();
        output.innerHTML = '';
      }
      break;

    default:
      break;
  }
}

function handleKeyPress(e) {
  if (isTyping) return;
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key.length !== 1) return;

  e.preventDefault();
  currentInput += e.key;
  updateDisplay();
}

/* Mobile: sync hidden input to display */
function handleHiddenInput() {
  if (isTyping) {
    hiddenInput.value = '';
    return;
  }
  currentInput = hiddenInput.value;
  updateDisplay();
}

/* ============================================================
   WELCOME SEQUENCE — typewriter auto-run
   ============================================================ */

/**
 * Type a string into the input display character by character,
 * then "execute" it after a short pause.
 */
function typeAndExecute(cmd, speed = 55) {
  return new Promise(resolve => {
    let i = 0;
    currentInput = '';
    updateDisplay();

    const interval = setInterval(() => {
      if (i < cmd.length) {
        currentInput += cmd[i];
        updateDisplay();
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const toRun = currentInput;
          currentInput = '';
          updateDisplay();
          processCommand(toRun);
          scrollBottom();
          setTimeout(resolve, 600);
        }, 400);
      }
    }, speed);
  });
}

/**
 * Print a line with a small delay (used for the banner).
 */
function printLinesAnimated(lines, delayBetween = 40) {
  return new Promise(resolve => {
    let i = 0;
    function next() {
      if (i >= lines.length) {
        resolve();
        return;
      }
      const l = lines[i++];
      appendLine(l.text || l, l.cls || 'ascii-header');
      scrollBottom();
      setTimeout(next, delayBetween);
    }
    next();
  });
}

async function runWelcome() {
  isTyping = true;

  // 1. ASCII banner (animate line by line)
  await printLinesAnimated(
    ASCII_BANNER.map(t => ({ text: t, cls: 'ascii-header' })),
    35
  );

  // Subtitle
  await new Promise(r => setTimeout(r, 100));
  appendLine('');
  appendLine('  Backend Engineer / System Operator', 'line-head');
  appendLine('  v1.0.0  —  type  help  to get started', 'line-dim');
  appendLine('');

  await new Promise(r => setTimeout(r, 600));

  // 2. Auto-run whoami
  await typeAndExecute('whoami', 50);

  // 3. Auto-run ls
  await typeAndExecute('ls', 55);

  isTyping = false;
  scrollBottom();
}

/* ============================================================
   FOCUS MANAGEMENT
   ============================================================ */

function focusTerminal() {
  hiddenInput.focus({ preventScroll: true });
}

// Click anywhere on terminal → focus
terminalBody.addEventListener('click', focusTerminal);
document.addEventListener('click', focusTerminal);

// Keyboard events on document (desktop)
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keypress', handleKeyPress);

// Mobile input via hidden input
hiddenInput.addEventListener('input', () => {
  if (isTyping) { hiddenInput.value = ''; return; }
  currentInput = hiddenInput.value;
  updateDisplay();
});

// Handle Enter / Backspace on mobile via keydown on hiddenInput
hiddenInput.addEventListener('keydown', (e) => {
  if (isTyping) return;

  if (e.key === 'Enter') {
    e.preventDefault();
    const cmd = hiddenInput.value.trim() || currentInput;
    hiddenInput.value = '';
    currentInput = '';
    updateDisplay();
    processCommand(cmd);
    scrollBottom();
  } else if (e.key === 'Backspace') {
    // Let the browser handle it; the 'input' event will sync
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyList.length === 0) return;
    historyIndex = Math.max(0, historyIndex - 1);
    currentInput = historyList[historyIndex] || '';
    hiddenInput.value = currentInput;
    updateDisplay();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyList.length === 0) return;
    historyIndex = Math.min(historyList.length, historyIndex + 1);
    currentInput = historyIndex < historyList.length ? historyList[historyIndex] : '';
    hiddenInput.value = currentInput;
    updateDisplay();
  } else if (e.key === 'Tab') {
    e.preventDefault();
    tabComplete();
    hiddenInput.value = currentInput;
  }
});

/* ============================================================
   BOOT
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
  focusTerminal();
  runWelcome();
});
