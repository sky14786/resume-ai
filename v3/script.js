/* =============================================
   CUSTOM CURSOR
   ============================================= */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

// Hover state on interactive elements
document.querySelectorAll('a, button, .brut-card, .stag, .btag, #cmd-list li').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* =============================================
   SCROLL PROGRESS
   ============================================= */
const prog = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  prog.style.width = (window.scrollY / total * 100) + '%';
}, { passive: true });

/* =============================================
   NAV SCROLL STATE
   ============================================= */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* =============================================
   KINETIC TYPOGRAPHY — Decode Effect
   ============================================= */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';

function decodeText(el, finalText, delay = 0) {
  // Split into char spans
  el.innerHTML = '';
  const chars = [...finalText];
  const spans = chars.map(ch => {
    const s = document.createElement('span');
    s.className = ch === ' ' ? 'char-space' : 'char';
    s.textContent = ch === ' ' ? '' : CHARS[Math.floor(Math.random() * CHARS.length)];
    el.appendChild(s);
    return s;
  });

  spans.forEach((s, i) => {
    if (s.classList.contains('char-space')) return;
    const charDelay = delay + i * 50;
    // Scramble phase
    let scrambleCount = 0;
    const scramble = setInterval(() => {
      s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      scrambleCount++;
      if (scrambleCount > 4) clearInterval(scramble);
    }, 60);
    // Reveal final char
    setTimeout(() => {
      clearInterval(scramble);
      s.textContent = chars[i];
      s.classList.add('visible');
    }, charDelay);
  });
}

window.addEventListener('load', () => {
  setTimeout(() => {
    decodeText(document.getElementById('word1'), 'JuneYoung', 200);
    decodeText(document.getElementById('word2'), 'Kim.', 700);
  }, 100);
});

/* =============================================
   STAT COUNTERS
   ============================================= */
function countUp(el, target, suffix, duration = 1400) {
  const numEl = el.querySelector('.stat-n');
  const labelEl = el.querySelector('.stat-l');
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    numEl.textContent = Math.floor(ease * target) + (p === 1 ? suffix : '');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    countUp(el, +el.dataset.val, el.dataset.sfx);
    statObs.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat[data-val]').forEach(el => statObs.observe(el));

/* =============================================
   SCROLL STORYTELLING — Reveal Cards
   ============================================= */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.brut-card').forEach((el, i) => {
  el.style.transitionDelay = (i % 2 === 0 ? 0 : 0.1) + 's';
  revealObs.observe(el);
});

// Stagger skill tags
document.querySelectorAll('.stag').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = `opacity .4s ease ${i * 30}ms, transform .4s ease ${i * 30}ms`;
});

const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stag').forEach(tag => {
        tag.style.opacity = '';
        tag.style.transform = '';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelector('.skills-wrap') && skillObs.observe(document.querySelector('.skills-wrap'));

/* =============================================
   COMMAND PALETTE
   ============================================= */
const overlay  = document.getElementById('cmd-overlay');
const input    = document.getElementById('cmd-input');
const list     = document.getElementById('cmd-list');

const ITEMS = [
  { icon: '→', label: '다기관 병원 유지보수', hint: '2025', action: () => scrollTo('#c-hospital') },
  { icon: '→', label: '3BB GIGA IPTV 운영', hint: '2021', action: () => scrollTo('#c-iptv') },
  { icon: '→', label: 'MAI-WACS 파이프라인', hint: '2022', action: () => scrollTo('#c-wacs') },
  { icon: '→', label: 'IPTV 어드민 개발', hint: '2020', action: () => scrollTo('#c-admin') },
  { icon: '#', label: 'Skills', hint: 'section', action: () => scrollTo('#skills') },
  { icon: '↗', label: 'GitHub', hint: 'external', action: () => window.open('https://github.com/sky14786', '_blank') },
];

function scrollTo(sel) {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  close();
}

function open() {
  overlay.classList.remove('hidden');
  input.value = '';
  render(ITEMS);
  setTimeout(() => input.focus(), 50);
}
function close() { overlay.classList.add('hidden'); }

function render(items) {
  list.innerHTML = items.map((it, i) => `
    <li data-i="${i}">
      <span class="cmd-icon">${it.icon}</span>
      <span class="cmd-label">${it.label}</span>
      <span class="cmd-hint">${it.hint}</span>
    </li>
  `).join('');
  list.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => items[+li.dataset.i].action());
    li.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      list.querySelectorAll('li').forEach(x => x.classList.remove('active'));
      li.classList.add('active');
    });
    li.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  if (list.firstElementChild) list.firstElementChild.classList.add('active');
}

// Keyboard nav
let filteredItems = [...ITEMS];
input.addEventListener('input', () => {
  const q = input.value.toLowerCase();
  filteredItems = ITEMS.filter(it => it.label.toLowerCase().includes(q) || it.hint.toLowerCase().includes(q));
  render(filteredItems);
});

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open(); return; }
  if (e.key === 'Escape') { close(); return; }
  if (overlay.classList.contains('hidden')) return;

  const items = list.querySelectorAll('li');
  const active = list.querySelector('li.active');
  let idx = [...items].indexOf(active);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    idx = (idx + 1) % items.length;
    items.forEach((li,i) => li.classList.toggle('active', i === idx));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = (idx - 1 + items.length) % items.length;
    items.forEach((li,i) => li.classList.toggle('active', i === idx));
  } else if (e.key === 'Enter') {
    if (active) filteredItems[idx]?.action();
  }
});

document.getElementById('cmd-trigger').addEventListener('click', open);
overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
