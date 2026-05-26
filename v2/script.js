/* =============================================
   MOUSE SPOTLIGHT
   ============================================= */
const spotlight = document.getElementById('spotlight');
document.addEventListener('mousemove', e => {
  spotlight.style.setProperty('--mx', e.clientX + 'px');
  spotlight.style.setProperty('--my', e.clientY + 'px');
});

/* Card inner glow follows mouse too */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--cx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--cy', (e.clientY - r.top)  + 'px');
  });
});

/* =============================================
   SCROLL PROGRESS
   ============================================= */
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / total * 100) + '%';
}, { passive: true });

/* =============================================
   NAV SCROLL STATE
   ============================================= */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* =============================================
   STAT COUNTER ANIMATION
   ============================================= */
function animateCount(el, target, suffix, duration = 1200) {
  const numEl = el.querySelector('.stat-num');
  const start = performance.now();
  const update = now => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic
    numEl.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      animateCount(el, +el.dataset.count, el.dataset.suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(el => statObserver.observe(el));
