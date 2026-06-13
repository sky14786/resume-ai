/* ================================================
   GLASSMORPHISM PORTFOLIO — script.js
   JuneYoung Kim
   ================================================ */

'use strict';

/* ---- 1. Mouse Parallax (blob movement) ---- */
(function initParallax() {
  const blobs = document.querySelectorAll('.bg-blob[data-parallax]');
  if (!blobs.length) return;

  // Store each blob's initial CSS position as the rest position
  const origins = Array.from(blobs).map((blob) => {
    const style = getComputedStyle(blob);
    return {
      el: blob,
      factor: parseFloat(blob.dataset.parallax) || 0.04,
    };
  });

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function onMouseMove(e) {
    // Normalize to [-1, 1] relative to window center
    targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    currentX = lerp(currentX, targetX, 0.06);
    currentY = lerp(currentY, targetY, 0.06);

    origins.forEach(({ el, factor }) => {
      const moveX = currentX * window.innerWidth  * factor;
      const moveY = currentY * window.innerHeight * factor;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    rafId = requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  animate();
})();


/* ---- 2. Scroll Reveal ---- */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once visible
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
})();


/* ---- 3. Navbar: add .scrolled class after scrolling ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load
})();


/* ---- 4. Active nav link highlight ---- */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const navH = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-h')) || 64;

  function activate() {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - navH - 60) {
        current = sec.id;
      }
    });
    links.forEach((link) => {
      link.style.color = '';
      link.style.background = '';
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.style.color    = 'rgba(255,255,255,0.95)';
        link.style.background = 'rgba(139,92,246,0.12)';
      }
    });
  }

  window.addEventListener('scroll', activate, { passive: true });
  activate();
})();


/* ---- 5. Glass card subtle tilt on hover ---- */
(function initCardTilt() {
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotateX = -dy * 4;  // max 4deg
      const rotateY =  dx * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.4s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
    });
  });
})();
