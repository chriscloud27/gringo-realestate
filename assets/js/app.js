(function () {
  const cursor = document.getElementById('cur');
  const cursorRing = document.getElementById('cur-r');
  let cx = 0;
  let cy = 0;
  let rx = 0;
  let ry = 0;

  function bindHoverTargets() {
    document.querySelectorAll('[data-h]').forEach((element) => {
      element.onmouseenter = () => document.body.classList.add('hov');
      element.onmouseleave = () => document.body.classList.remove('hov');
    });
  }

  function initCursor() {
    if (!cursor || !cursorRing) return;
    document.addEventListener('mousemove', (event) => {
      cx = event.clientX;
      cy = event.clientY;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
    });

    function animateRing() {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      cursorRing.style.left = `${rx}px`;
      cursorRing.style.top = `${ry}px`;
      requestAnimationFrame(animateRing);
    }

    requestAnimationFrame(animateRing);

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  function initReveal() {
    function revealItems() {
      document.querySelectorAll('.reveal:not(.vis)').forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          element.classList.add('vis');
        }
      });
    }

    window.addEventListener('scroll', revealItems, { passive: true });
    revealItems();
  }

  function initNavigation() {
    const nav = document.getElementById('nav');
    const mobileMenu = document.getElementById('mm');
    const menuToggle = document.getElementById('menu-toggle');

    window.addEventListener('scroll', () => {
      if (nav) {
        nav.classList.toggle('sc', window.scrollY > 60);
      }
    });

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });

      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavigation();
    initReveal();
    bindHoverTargets();
  });
})();
