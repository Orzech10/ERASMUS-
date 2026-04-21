// =============================================
// Erasmus+ Manavgat 2025 | main.js
// =============================================

// --- Dark Mode Toggle ---
(function () {
  const html = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');
  const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  let current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', current);
  if (btn) btn.innerHTML = current === 'dark' ? sunIcon : moonIcon;
  if (btn) btn.addEventListener('click', () => {
    current = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', current);
    btn.innerHTML = current === 'dark' ? sunIcon : moonIcon;
  });
})();

// --- Desktop Dropdown ---
(function () {
  const btns = document.querySelectorAll('.nav-dropdown-btn');
  btns.forEach(btn => {
    const menu = btn.nextElementSibling;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('is-open'));
    document.querySelectorAll('.nav-dropdown-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
  });
})();

// --- Hamburger / Mobile menu ---
(function () {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;
  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// --- Mobile Dropdown ---
(function () {
  const btns = document.querySelectorAll('.mobile-dropdown-btn');
  btns.forEach(btn => {
    const sub = btn.nextElementSibling;
    btn.addEventListener('click', () => {
      const isOpen = sub.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);
      sub.setAttribute('aria-hidden', !isOpen);
    });
  });
})();

// --- Aktywny link nav ---
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .dropdown-menu a').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
      link.style.color = 'var(--red)';
    }
  });
})();

// --- Scroll Reveal ---
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(32px); transition: opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1); }
    .reveal.from-left { transform: translateX(-40px); }
    .reveal.from-right { transform: translateX(40px); }
    .reveal.is-visible { opacity: 1 !important; transform: none !important; }
  `;
  document.head.appendChild(style);

  function attachReveals() {
    document.querySelectorAll(
      '.goal-card, .stage-card, .col-text, .col-img, .section-header, .stat-item, .gal-item, .person-card, .activity-card, .organizer-card, .praktyki-card, .page-hero-text, .page-hero-img'
    ).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 5) * 70}ms`;
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attachReveals);
  else attachReveals();
})();

// --- Animowane liczniki ---
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count || el.textContent, 10);
      if (isNaN(target)) return;
      let start = 0;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 900, 1);
        el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(el => {
    el.dataset.count = el.textContent;
    observer.observe(el);
  });
})();

// --- Parallax hero ---
(function () {
  const hero = document.querySelector('.hero, .page-hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.backgroundPositionY = `${y * 0.3}px`;
  }, { passive: true });
})();