(function () {
  document.body.insertAdjacentHTML('beforeend', `
<div class="a11y-overlay" id="a11yOverlay"></div>

<button class="a11y-toggle" id="a11yToggle" aria-label="Panel dostępności" aria-expanded="false" aria-controls="a11yPanel">
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="10" r="3"/>
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
  </svg>
</button>

<aside class="a11y-panel" id="a11yPanel" aria-hidden="true" aria-label="Panel dostępności">
  <div class="a11y-header">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="10" r="3"/>
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
    </svg>
    Pomoc przeglądania
  </div>
  <ul class="a11y-list" role="list">
    <li>
      <button class="a11y-btn" data-action="font-up">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        Powiększ tekst
      </button>
    </li>
    <li>
      <button class="a11y-btn" data-action="font-down">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        Pomniejsz tekst
      </button>
    </li>
    <li>
      <button class="a11y-btn" data-action="high-contrast">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/></svg>
        Wysoki kontrast
      </button>
    </li>
    <li>
      <button class="a11y-btn" data-action="underline">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 3v7a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
        Podkreślone linki
      </button>
    </li>
    <li>
      <button class="a11y-btn" data-action="readable">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
        Czytelna czcionka
      </button>
    </li>
    <li>
      <button class="a11y-btn a11y-btn--reset" data-action="reset">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
        Reset
      </button>
    </li>
  </ul>
</aside>
`);

  const navActions = document.querySelector('.nav-actions');
  if (navActions) {
    const existing = document.getElementById('a11yToggle');
    if (existing && !navActions.contains(existing)) {
      navActions.prepend(existing);
    }
  }

  const toggle  = document.getElementById('a11yToggle');
  const panel   = document.getElementById('a11yPanel');
  const overlay = document.getElementById('a11yOverlay');

  function openPanel() {
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
  }
  function closePanel() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  toggle.addEventListener('click', () =>
    panel.classList.contains('is-open') ? closePanel() : openPanel()
  );
  overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  let fontSize = 100;
  const body = document.body;

  panel.querySelectorAll('.a11y-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const tog = () => btn.classList.toggle('is-active');

      if (action === 'font-up') {
        fontSize = Math.min(fontSize + 10, 140);
        document.documentElement.style.fontSize = fontSize + '%';
      } else if (action === 'font-down') {
        fontSize = Math.max(fontSize - 10, 70);
        document.documentElement.style.fontSize = fontSize + '%';
      } else if (action === 'high-contrast') {
        body.classList.toggle('a11y-high-contrast');
        tog();
      } else if (action === 'underline') {
        body.classList.toggle('a11y-underline');
        tog();
      } else if (action === 'readable') {
        body.classList.toggle('a11y-readable');
        tog();
      } else if (action === 'reset') {
        fontSize = 100;
        document.documentElement.style.fontSize = '';
        ['a11y-high-contrast', 'a11y-underline', 'a11y-readable']
          .forEach(c => body.classList.remove(c));
        panel.querySelectorAll('.a11y-btn.is-active').forEach(b => b.classList.remove('is-active'));
      }
    });
  });
})();
