/* ============================================================
   script.js — Bento Grid Portfolio Interactions
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   1. SCROLL REVEAL (Intersection Observer)
   ---------------------------------------------------------- */
const revealCards = () => {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = parseInt(card.dataset.index ?? '0', 10);

          setTimeout(() => {
            card.classList.add('visible');
          }, index * 70);

          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Hero cards: immediate, staggered
  const heroCards = document.querySelectorAll('.hero-section .card');
  heroCards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, i * 90);
  });

  // Bento cards: scroll-triggered
  const bentoCards = document.querySelectorAll('.bento-grid .card');
  bentoCards.forEach((card) => observer.observe(card));
};

/* ----------------------------------------------------------
   2. COUNTER ANIMATION (스탯 카드)
   ---------------------------------------------------------- */
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const runCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const startTime = performance.now();

    const easeOutExpo = (t) =>
      t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      el.textContent = Math.round(easedProgress * target);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

/* ----------------------------------------------------------
   3. HOVER TILT EFFECT (선택적 — 마우스 움직임 기반)
   ---------------------------------------------------------- */
const initTiltEffect = () => {
  // 모바일 미적용
  if (window.matchMedia('(max-width: 540px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tiltCards = document.querySelectorAll(
    '.card-hero-main, .card-featured, .card-about'
  );

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      card.style.transform = `
        translateY(-6px) scale(1.01)
        rotateY(${dx * 4}deg)
        rotateX(${-dy * 4}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

/* ----------------------------------------------------------
   4. SKILL TAG STAGGER ANIMATION
   ---------------------------------------------------------- */
const animateSkillTags = () => {
  const tags = document.querySelectorAll('.skill-tag');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillCard = entry.target;
          const tagList = skillCard.querySelectorAll('.skill-tag');

          tagList.forEach((tag, i) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(10px)';
            setTimeout(() => {
              tag.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              tag.style.opacity = '1';
              tag.style.transform = 'translateY(0)';
            }, 200 + i * 60);
          });

          observer.unobserve(skillCard);
        }
      });
    },
    { threshold: 0.3 }
  );

  const skillCard = document.querySelector('.card-skills');
  if (skillCard) observer.observe(skillCard);
};

/* ----------------------------------------------------------
   5. ACTIVE STATE FEEDBACK (touch & click)
   ---------------------------------------------------------- */
const initTouchFeedback = () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('mousedown', () => {
      card.style.transform = 'translateY(-3px) scale(0.99)';
    });

    card.addEventListener('mouseup', () => {
      card.style.transform = '';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

/* ----------------------------------------------------------
   6. CONTACT LINK COPY FEEDBACK
   ---------------------------------------------------------- */
const initContactCopy = () => {
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink) return;

  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'sky14786@gmail.com';

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        showCopied(emailLink);
      });
    } else {
      window.location.href = 'mailto:' + email;
    }
  });
};

const showCopied = (el) => {
  const original = el.querySelector('span:last-child').textContent;
  el.querySelector('span:last-child').textContent = '복사됨!';
  el.style.background = 'rgba(52, 208, 88, 0.1)';
  el.style.borderColor = 'rgba(52, 208, 88, 0.4)';
  el.style.color = '#2e7d32';

  setTimeout(() => {
    el.querySelector('span:last-child').textContent = original;
    el.style.background = '';
    el.style.borderColor = '';
    el.style.color = '';
  }, 1800);
};

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  revealCards();
  animateCounters();
  animateSkillTags();
  initTiltEffect();
  initContactCopy();

  // touch feedback은 모바일만
  if ('ontouchstart' in window) {
    initTouchFeedback();
  }
});
