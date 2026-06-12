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
   NAV — FLOATING PILL
   ============================================= */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('floating', window.scrollY > 80);
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

document.addEventListener('DOMContentLoaded', () => {
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
  { icon: '→', label: '다기관 병원 유지보수', hint: '2025', action: () => scrollToSection('#c-hospital') },
  { icon: '→', label: '해외 IPTV 플랫폼 운영', hint: '2021', action: () => scrollToSection('#c-iptv') },
  { icon: '→', label: 'MAI-WACS 파이프라인', hint: '2022', action: () => scrollToSection('#c-wacs') },
  { icon: '→', label: 'IPTV 어드민 개발', hint: '2020', action: () => scrollToSection('#c-admin') },
  { icon: '◈', label: 'metric-stream', hint: 'project', action: () => scrollToSection('#p-metric') },
  { icon: '#', label: 'Skills', hint: 'section', action: () => scrollToSection('#skills') },
  { icon: '↗', label: 'GitHub', hint: 'external', action: () => window.open('https://github.com/sky14786', '_blank') },
];

function scrollToSection(sel) {
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

/* =============================================
   ARCHITECTURE DIAGRAM TOGGLE (모바일 전용)
   ============================================= */
/* =============================================
   CONTACT — EMAIL OBFUSCATION
   ============================================= */
(function() {
  const u = 'sky14786', d = 'gmail.com';
  const email = u + '@' + d;
  const link = document.getElementById('email-link');
  const text = document.getElementById('email-text');
  if (link && text) {
    link.href = 'mailto:' + email;
    text.textContent = email;
  }
})();

/* =============================================
   ARCHITECTURE DIAGRAM TOGGLE (모바일 전용)
   ============================================= */
if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
  document.querySelectorAll('.arch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const diagram = btn.nextElementSibling;
      const isOpen = diagram.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

/* =============================================
   ARCHITECTURE LIGHTBOX
   ============================================= */
(function() {
  const lightbox = document.getElementById('arch-lightbox');
  const inner    = document.getElementById('arch-lightbox-inner');
  const closeBtn = document.getElementById('arch-lightbox-close');
  const escHint  = document.getElementById('arch-lightbox-esc');

  function openLightbox(svg) {
    const clone = svg.cloneNode(true);
    // 기존 SVG 클론 제거 후 삽입
    inner.querySelectorAll('svg').forEach(s => s.remove());
    inner.insertBefore(clone, closeBtn);
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  document.querySelectorAll('.arch-diagram svg').forEach(svg => {
    svg.addEventListener('click', () => openLightbox(svg));
    svg.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    svg.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  closeBtn.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  closeBtn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
})();

/* =============================================
   THEME SWITCHER
   ============================================= */
const THEMES = {
  lime:    { accent:'#a3e635', ar:'163,230,53'  },
  indigo:  { accent:'#4338ca', ar:'67,56,202'   },
  orange:  { accent:'#ea580c', ar:'234,88,12'   },
  forest:  { accent:'#166534', ar:'22,101,52'   },
  crimson: { accent:'#dc2626', ar:'220,38,38'   },
  olive:   { accent:'#65a30d', ar:'101,163,13'  },
  violet:  { accent:'#7c3aed', ar:'124,58,237'  },
};

const root = document.documentElement;
document.querySelectorAll('.tsw-dot').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = THEMES[btn.dataset.t];
    root.style.setProperty('--accent',  t.accent);
    root.style.setProperty('--ar',      t.ar);
    root.style.setProperty('--accent2', t.accent);
    document.querySelectorAll('.tsw-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
  btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* =============================================
   GRAFANA MODAL
   ============================================= */
(function() {
  const modal   = document.getElementById('grafana-modal');
  const openBtn = document.getElementById('grafana-open');
  const closeBackdrop = document.getElementById('grafana-modal-close');
  const closeX  = document.getElementById('grafana-modal-x');
  if (!modal || !openBtn) return;

  function openModal() {
    modal.querySelectorAll('iframe[data-src]').forEach(f => {
      if (!f.src || f.src === window.location.href) f.src = f.dataset.src;
    });
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    modal.querySelectorAll('iframe[data-src]').forEach(f => { f.src = ''; });
  }

  openBtn.addEventListener('click', openModal);
  openBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(); });
  closeBackdrop.addEventListener('click', closeModal);
  closeX.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* =============================================
   NAV SCROLL SPY
   ============================================= */
const navLinks   = document.querySelectorAll('.nav-center a[href^="#"]');
const spySections = document.querySelectorAll('section[id]');

const spyObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, {
  threshold: 0.25,
  rootMargin: '-10% 0px -60% 0px'
});

spySections.forEach(s => spyObs.observe(s));
