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

// =============================================
// CURSOR GLOW
// =============================================
(function () {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(102,155,188,0.12) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.08s ease, top 0.08s ease;
    left: -999px; top: -999px;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
})();

// =============================================
// TILT NA KARTACH
// =============================================
(function () {
  const cards = document.querySelectorAll('.pcard, .stage-card, .goal-card, .activity-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
    });
  });
})();

// =============================================
// TYPING EFFECT — nagłówek hero
// =============================================
(function () {
  const el = document.querySelector('.hero-text h1, .page-hero-text h1');
  if (!el) return;
  const original = el.textContent.trim();
  el.textContent = '';
  el.style.visibility = 'visible';
  let i = 0;
  const type = () => {
    if (i < original.length) {
      el.textContent += original[i++];
      setTimeout(type, 45);
    }
  };
  setTimeout(type, 400);
})();

// =============================================
// PAGE TRANSITION
// =============================================
(function () {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    background: #003049;
    opacity: 0; pointer-events: none;
    transition: opacity 0.35s ease;
  `;
  document.body.appendChild(overlay);

  // Fade in po załadowaniu
  window.addEventListener('load', () => {
    overlay.style.opacity = '0';
  });

  // Fade out przy kliknięciu w link
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.style.pointerEvents = 'all';
      overlay.style.opacity = '1';
      setTimeout(() => { window.location.href = href; }, 360);
    });
  });

  // Fade in na nowej stronie
  document.addEventListener('DOMContentLoaded', () => {
    overlay.style.opacity = '1';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      });
    });
  });
})();

// =============================================
// MAGNETIC BUTTONS
// =============================================
(function () {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      btn.style.transition = 'transform 0.15s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s ease';
    });
  });
})();

// =============================================
// PARTICLE BURST — kliknięcie w dowolne miejsce
// =============================================
(function () {
  const colors = ['#780000', '#C1121F', '#669BBC', '#003049', '#FDF0D5'];
  document.addEventListener('click', e => {
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('div');
      const angle = (i / 12) * 360;
      const distance = 40 + Math.random() * 40;
      const size = 4 + Math.random() * 5;
      dot.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        z-index: 99998;
        transform: translate(-50%, -50%);
        transition: transform 0.6s ease-out, opacity 0.6s ease-out;
      `;
      document.body.appendChild(dot);
      requestAnimationFrame(() => {
        const rad = (angle * Math.PI) / 180;
        dot.style.transform = `translate(calc(-50% + ${Math.cos(rad) * distance}px), calc(-50% + ${Math.sin(rad) * distance}px))`;
        dot.style.opacity = '0';
      });
      setTimeout(() => dot.remove(), 650);
    }
  });
})();

// =============================================
// SCROLL PROGRESS BAR — pasek postępu na górze
// =============================================
(function () {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(to right, #780000, #C1121F, #669BBC);
    z-index: 99999;
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  });
})();

// =============================================
// LICZNIK — animacja przy hover na stat-num
// =============================================
(function () {
  document.querySelectorAll('.stat-item').forEach(item => {
    const num = item.querySelector('.stat-num');
    if (!num) return;
    const target = parseInt(num.dataset.count || num.textContent);
    item.addEventListener('mouseenter', () => {
      let current = 0;
      const duration = 600;
      const steps = 30;
      const increment = target / steps;
      const interval = duration / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          num.textContent = target;
          clearInterval(timer);
        } else {
          num.textContent = Math.floor(current);
        }
      }, interval);
    });
  });
})();



(function () {
  const btn      = document.getElementById('themePanelBtn');
  const panel    = document.getElementById('themePanel');
  const overlay  = document.getElementById('themePanelOverlay');
  const closeBtn = document.getElementById('themePanelClose');
  const resetBtn = document.getElementById('themePanelReset');
  const html     = document.documentElement;
  if (!btn || !panel) return;

  function openPanel() {
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closePanel() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', e => { e.stopPropagation(); openPanel(); });
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  document.querySelectorAll('.theme-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.theme-opt').forEach(o => o.classList.remove('is-active'));
      opt.classList.add('is-active');
      const t = opt.dataset.theme;
      html.setAttribute('data-theme', t === 'auto'
        ? (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light') : t);
    });
  });

  document.querySelectorAll('.font-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.font-opt').forEach(o => o.classList.remove('font-opt--active'));
      opt.classList.add('font-opt--active');
      html.setAttribute('data-font-size', opt.dataset.size);
    });
  });

  document.querySelectorAll('.contrast-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.contrast-opt').forEach(o => o.classList.remove('is-active'));
      opt.classList.add('is-active');
      html.setAttribute('data-contrast', opt.dataset.contrast);
    });
  });

  resetBtn.addEventListener('click', () => {
    html.setAttribute('data-theme', matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    html.removeAttribute('data-font-size');
    html.removeAttribute('data-contrast');
    document.querySelectorAll('.theme-opt,.contrast-opt').forEach(o => o.classList.remove('is-active'));
    document.querySelectorAll('.font-opt').forEach(o => o.classList.remove('font-opt--active'));
    document.querySelector('.font-opt[data-size="normal"]')?.classList.add('font-opt--active');
  });
})();