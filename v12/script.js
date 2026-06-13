/**
 * JuneYoung Kim — Portfolio
 * script.js
 *
 * Features:
 *  1. Scroll Spy — IntersectionObserver로 현재 섹션 감지, nav 링크 활성화
 *  2. Smooth nav click — 클릭 시 해당 섹션으로 부드러운 스크롤
 *  3. Experience card hover — CSS로 처리, JS는 키보드 접근성 보조
 */

(function () {
  'use strict';

  /* ----------------------------------------
     1. SCROLL SPY
     ---------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  if (sections.length === 0 || navLinks.length === 0) return;

  /**
   * 현재 활성 섹션의 nav 링크에 'active' 클래스를 부여합니다.
   */
  function setActiveLink(sectionId) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
  }

  /**
   * IntersectionObserver 설정.
   * rootMargin: 상단 -20% ~ 하단 -60% 영역이 뷰포트에 진입하면 활성화.
   * 이렇게 하면 섹션이 화면 상단 근처에 왔을 때 전환됩니다.
   */
  var observerOptions = {
    root: null,
    rootMargin: '-15% 0px -60% 0px',
    threshold: 0
  };

  // 활성 섹션 추적 (가장 최근 intersecting된 섹션)
  var activeSectionId = sections[0] ? sections[0].id : null;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        activeSectionId = entry.target.id;
        setActiveLink(activeSectionId);
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });

  // 페이지 최하단 도달 시 마지막 섹션 강제 활성화
  window.addEventListener('scroll', function () {
    var scrollBottom = window.scrollY + window.innerHeight;
    var docHeight = document.documentElement.scrollHeight;

    if (scrollBottom >= docHeight - 10) {
      var lastSection = sections[sections.length - 1];
      if (lastSection) {
        setActiveLink(lastSection.id);
      }
    }
  }, { passive: true });

  /* ----------------------------------------
     2. SMOOTH NAV CLICK
     ---------------------------------------- */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.dataset.section;
      var targetEl = document.getElementById(targetId);

      if (!targetEl) return;

      // 모바일에서는 기본 앵커 동작 허용 (헤더 오프셋 없음)
      if (window.innerWidth <= 768) return;

      e.preventDefault();

      // 데스크탑: 우측 content 영역 기준으로 스크롤
      // content 컨테이너(.content)가 overflow:auto가 아닌 body 기반이므로
      // window.scrollTo 사용
      var rect = targetEl.getBoundingClientRect();
      var offset = window.scrollY + rect.top - 60; // 상단 여백 60px

      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });

      // 즉시 활성화
      setActiveLink(targetId);
    });
  });

  /* ----------------------------------------
     3. KEYBOARD ACCESSIBILITY
        exp-card에 tabindex 추가, Enter/Space hover 효과
     ---------------------------------------- */
  var expCards = document.querySelectorAll('.exp-card');

  expCards.forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
  });

  /* ----------------------------------------
     4. INITIAL ACTIVE STATE
        페이지 로드 시 스크롤 위치 기반으로 초기 활성 섹션 설정
     ---------------------------------------- */
  function initActiveSection() {
    // 뷰포트에 보이는 첫 번째 섹션 찾기
    var found = false;

    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      // 뷰포트 상단 40% 이내에 섹션 상단이 있으면 활성
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom > 0) {
        setActiveLink(sections[i].id);
        found = true;
        break;
      }
    }

    if (!found && sections[0]) {
      setActiveLink(sections[0].id);
    }
  }

  initActiveSection();

  /* ----------------------------------------
     5. TAG HOVER — 이미 CSS로 처리됨
        추가 JS 로직 불필요
     ---------------------------------------- */

})();
