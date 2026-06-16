/* =============================================
   ENVIRONMENT — Grafana base URL (로컬/프로덕션 자동 전환)
   ============================================= */
(function () {
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!isLocal) return;
  const PROD  = 'https://skydev.ddns.net/metric';
  const LOCAL = 'http://localhost:3000';
  document.querySelectorAll('iframe.gpanel[data-src]').forEach(f => {
    f.dataset.src = f.dataset.src.replace(PROD, LOCAL);
  });
})();

/* =============================================
   MOTION PREFERENCE
   ============================================= */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =============================================
   CUSTOM CURSOR (motion ok only)
   ============================================= */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

if (!prefersReducedMotion) {
  document.body.classList.add('has-custom-cursor');

  let rafPending = false;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        dot.style.left  = mouseX + 'px';
        dot.style.top   = mouseY + 'px';
        ring.style.left = mouseX + 'px';
        ring.style.top  = mouseY + 'px';
        rafPending = false;
      });
    }
  });

  document.querySelectorAll('a, button, .brut-card, .stag, .btag, #cmd-list li').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

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
    let scrambleCount = 0;
    const scramble = setInterval(() => {
      s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      scrambleCount++;
      if (scrambleCount > 4) clearInterval(scramble);
    }, 60);
    setTimeout(() => {
      clearInterval(scramble);
      s.textContent = chars[i];
      s.classList.add('visible');
    }, charDelay);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const word1 = document.getElementById('word1');
  const word2 = document.getElementById('word2');
  if (prefersReducedMotion) {
    // instant reveal — no animation
    word1.textContent = 'JuneYoung';
    word2.textContent = 'Kim.';
    word1.style.opacity = '1';
    word2.style.opacity = '1';
  } else {
    setTimeout(() => {
      decodeText(word1, 'JuneYoung', 200);
      decodeText(word2, 'Kim.', 700);
    }, 100);
  }
});

/* =============================================
   STAT COUNTERS
   ============================================= */
function countUp(el, target, suffix, duration = 1400) {
  const numEl = el.querySelector('.stat-n');
  const labelEl = el.querySelector('.stat-l');

  if (prefersReducedMotion) {
    numEl.textContent = target + suffix;
    return;
  }

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

if (!prefersReducedMotion) {
  document.querySelectorAll('.brut-card').forEach((el, i) => {
    el.classList.add('anim-ready');
    el.style.transitionDelay = (i % 2 === 0 ? 0 : 0.1) + 's';
    revealObs.observe(el);
  });
}

// Stagger skill tags
if (!prefersReducedMotion) {
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
}

/* =============================================
   FOCUS TRAP UTILITY
   ============================================= */
function createFocusTrap(element) {
  const focusable = () => element.querySelectorAll(
    'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const handler = e => {
    if (e.key !== 'Tab') return;
    const els = [...focusable()];
    if (!els.length) return;
    const first = els[0];
    const last  = els[els.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  };
  return {
    activate() { element.addEventListener('keydown', handler); },
    deactivate() { element.removeEventListener('keydown', handler); },
    focusFirst() { const els = [...focusable()]; els[0]?.focus(); }
  };
}

/* =============================================
   COMMAND PALETTE
   ============================================= */
const overlay  = document.getElementById('cmd-overlay');
const input    = document.getElementById('cmd-input');
const list     = document.getElementById('cmd-list');
const cmdTrap  = createFocusTrap(overlay);
let cmdTriggerEl = null;

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
  if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth', block: 'start' });
  closeCmd();
}

function openCmd() {
  cmdTriggerEl = document.activeElement;
  overlay.classList.remove('hidden');
  input.value = '';
  render(ITEMS);
  cmdTrap.activate();
  setTimeout(() => input.focus(), 50);
}
function closeCmd() {
  overlay.classList.add('hidden');
  cmdTrap.deactivate();
  cmdTriggerEl?.focus();
}

function render(items) {
  list.innerHTML = items.map((it, i) => `
    <li data-i="${i}" role="option">
      <span class="cmd-icon">${it.icon}</span>
      <span class="cmd-label">${it.label}</span>
      <span class="cmd-hint">${it.hint}</span>
    </li>
  `).join('');
  list.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => items[+li.dataset.i].action());
    li.addEventListener('mouseenter', () => {
      if (!prefersReducedMotion) document.body.classList.add('cursor-hover');
      list.querySelectorAll('li').forEach(x => x.classList.remove('active'));
      li.classList.add('active');
    });
    li.addEventListener('mouseleave', () => {
      if (!prefersReducedMotion) document.body.classList.remove('cursor-hover');
    });
  });
  if (list.firstElementChild) list.firstElementChild.classList.add('active');
}

let filteredItems = [...ITEMS];
input.addEventListener('input', () => {
  const q = input.value.toLowerCase();
  filteredItems = ITEMS.filter(it => it.label.toLowerCase().includes(q) || it.hint.toLowerCase().includes(q));
  render(filteredItems);
});

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openCmd(); return; }
  if (e.key === 'Escape') { closeCmd(); closeLightbox(); return; }
  if (overlay.classList.contains('hidden')) return;

  const items = list.querySelectorAll('li');
  const active = list.querySelector('li.active');
  let idx = [...items].indexOf(active);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    idx = (idx + 1) % items.length;
    items.forEach((li, i) => li.classList.toggle('active', i === idx));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = (idx - 1 + items.length) % items.length;
    items.forEach((li, i) => li.classList.toggle('active', i === idx));
  } else if (e.key === 'Enter') {
    if (active) filteredItems[idx]?.action();
  }
});

document.getElementById('cmd-trigger').addEventListener('click', openCmd);
overlay.addEventListener('click', e => { if (e.target === overlay) closeCmd(); });

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
   ARCHITECTURE DIAGRAM — LIGHTBOX
   ============================================= */
const lightbox   = document.getElementById('arch-lightbox');
const lbInner    = document.getElementById('arch-lightbox-inner');
const lbClose    = document.getElementById('arch-lightbox-close');
const lbEsc      = document.getElementById('arch-lightbox-esc');
const lbTrap     = createFocusTrap(lightbox);
let lbTriggerEl  = null;

function openLightbox(svg) {
  lbTriggerEl = document.activeElement;
  const clone = svg.cloneNode(true);
  lbInner.querySelectorAll('svg').forEach(s => s.remove());
  lbInner.insertBefore(clone, lbClose);
  lightbox.classList.add('open');
  lightbox.removeAttribute('aria-hidden');
  lbTrap.activate();
  lbClose.focus();
}

function closeLightbox() {
  if (!lightbox.classList.contains('open')) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbTrap.deactivate();
  lbTriggerEl?.focus();
}

document.querySelectorAll('.arch-diagram svg').forEach(svg => {
  svg.addEventListener('click', () => openLightbox(svg));
  svg.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(svg); }
  });
  if (!prefersReducedMotion) {
    svg.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    svg.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  }
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lightbox.setAttribute('aria-hidden', 'true');

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
   GRAFANA PREVIEW — 뷰포트 진입 시 로드
   ============================================= */
const previewObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const f = e.target;
      if (f.dataset.src) f.src = f.dataset.src;
      previewObs.unobserve(f);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('iframe[data-src].gpanel-preview').forEach(f => previewObs.observe(f));

/* =============================================
   GRAFANA MODAL
   ============================================= */
(function() {
  const modal         = document.getElementById('grafana-modal');
  const openBtn       = document.getElementById('grafana-open');
  const closeBackdrop = document.getElementById('grafana-modal-close');
  const closeX        = document.getElementById('grafana-modal-x');
  if (!modal || !openBtn) return;

  const gfTrap = createFocusTrap(modal);
  let gfTriggerEl = null;

  const isMobileViewport = () => window.matchMedia('(max-width: 768px)').matches;
  const isLocalEnv = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  const GRAFANA_DASHBOARD_URL = (isLocalEnv ? 'http://localhost:3000' : 'https://skydev.ddns.net/metric')
    + '/d/metric-stream-v1/metric-stream?orgId=1&from=now-30m&to=now&refresh=30s';

  function openModal() {
    if (isMobileViewport()) {
      window.open(GRAFANA_DASHBOARD_URL, '_blank', 'noopener');
      return;
    }
    gfTriggerEl = document.activeElement;
    modal.querySelectorAll('iframe[data-src]').forEach(f => {
      if (!f.src || f.src === window.location.href) f.src = f.dataset.src;
    });
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    gfTrap.activate();
    setTimeout(() => closeX.focus(), 50);
  }
  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    modal.querySelectorAll('iframe[data-src]').forEach(f => { f.src = ''; });
    gfTrap.deactivate();
    gfTriggerEl?.focus();
  }

  openBtn.addEventListener('click', openModal);
  openBtn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); } });
  closeBackdrop.addEventListener('click', closeModal);
  closeX.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal(); });
})();

/* =============================================
   NAV SCROLL SPY
   ============================================= */
const navLinks    = document.querySelectorAll('.nav-center a[href^="#"]');
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
  btn.setAttribute('aria-label', btn.dataset.name + ' 테마');
  btn.addEventListener('click', () => {
    const t = THEMES[btn.dataset.t];
    root.style.setProperty('--accent',  t.accent);
    root.style.setProperty('--ar',      t.ar);
    root.style.setProperty('--accent2', t.accent);
    document.querySelectorAll('.tsw-dot').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
  if (!prefersReducedMotion) {
    btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  }
});
