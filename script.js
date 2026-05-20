/* =============================================
   THEME SWITCHER
   ============================================= */

const root = document.documentElement;
const buttons = document.querySelectorAll('.theme-btn');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === theme));
  localStorage.setItem('theme', theme);
  updateHeroNameAttr();
  if (theme === 'terminal') startMatrix();
  else stopMatrix();
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.theme));
});

const saved = localStorage.getItem('theme') || 'terminal';
setTheme(saved);

/* =============================================
   TYPED.JS
   ============================================= */

new Typed('#typed', {
  strings: [
    'Backend Engineer',
    'System Operator',
    'Infrastructure Builder',
    '문제를 고치는 사람',
  ],
  typeSpeed: 60,
  backSpeed: 35,
  backDelay: 2000,
  loop: true,
  cursorChar: '█',
});


/* =============================================
   MATRIX RAIN
   ============================================= */

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let matrixRunning = false;
let animFrame;

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>{}[]()';

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let drops = [];

function initDrops() {
  const cols = Math.floor(canvas.width / 16);
  drops = Array.from({ length: cols }, () => Math.random() * -50);
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff41';
  ctx.font = '13px JetBrains Mono, monospace';

  drops.forEach((y, i) => {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
    const x = i * 16;
    ctx.fillStyle = Math.random() > 0.95 ? '#ffffff' : '#00ff41';
    ctx.fillText(char, x, y * 16);
    if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.5;
  });

  animFrame = requestAnimationFrame(drawMatrix);
}

function startMatrix() {
  if (matrixRunning) return;
  matrixRunning = true;
  initDrops();
  drawMatrix();
}

function stopMatrix() {
  if (!matrixRunning) return;
  matrixRunning = false;
  cancelAnimationFrame(animFrame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* =============================================
   CYBERPUNK GLITCH — data-text attr
   ============================================= */

function updateHeroNameAttr() {
  const nameEl = document.querySelector('.hero-name');
  if (nameEl) nameEl.setAttribute('data-text', nameEl.textContent);
}
