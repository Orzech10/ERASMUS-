(function () {
  // Wstrzykuje HTML panelu do body
  document.body.insertAdjacentHTML('beforeend', `
    <button class="a11y-toggle" id="a11yToggle" aria-label="Dostępność WCAG" aria-expanded="false" title="Pomoc przeglądania">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    </button>

    <div class="a11y-overlay" id="a11yOverlay"></div>
    <div class="a11y-panel" id="a11yPanel" role="dialog" aria-label="Pomoc przeglądania" aria-hidden="true">
      <div class="a11y-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        <span>Pomoc przeglądania</span>
      </div>
      <ul class="a11y-list" role="list">
        <li><button class="a11y-btn" data-action="font-up">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          Powiększ tekst
        </button></li>
        <li><button class="a11y-btn" data-action="font-down">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          Pomniejsz tekst
        </button></li>
        <li><button class="a11y-btn" data-action="grayscale">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18"/><rect x="14" y="3" width="7" height="18"/></svg>
          Skala szarości
        </button></li>
        <li><button class="a11y-btn" data-action="high-contrast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" stroke="none"/></svg>
          Wysoki kontrast
        </button></li>
        <li><button class="a11y-btn" data-action="negative">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Negatyw
        </button></li>
        <li><button class="a11y-btn" data-action="underline">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v7a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
          Podkreślone linki
        </button></li>
        <li><button class="a11y-btn" data-action="readable">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
          Czytelna czcionka
        </button></li>
        <li><button class="a11y-btn a11y-btn--reset" data-action="reset">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/></svg>
          Reset
        </button></li>
      </ul>
    </div>
  `);

  // Wstrzykuje przycisk do nav-actions
  const navActions = document.querySelector('.nav-actions');
  if (navActions) {
    const btn = navActions.querySelector('#a11yToggle');
    if (!btn) {
      const toggleBtn = document.getElementById('a11yToggle');
      navActions.prepend(toggleBtn);
    }
  }

  const toggle  = document.getElementById('a11yToggle');
  const panel   = document.getElementById('a11yPanel');
  const overlay = document.getElementById('a11yOverlay');

  function openPanel()  {
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
      if      (action === 'font-up')       { fontSize = Math.min(fontSize + 10, 140); document.documentElement.style.fontSize = fontSize + '%'; }
      else if (action === 'font-down')     { fontSize = Math.max(fontSize - 10, 70);  document.documentElement.style.fontSize = fontSize + '%'; }
      else if (action === 'grayscale')     { body.classList.toggle('a11y-grayscale');     tog(); }
      else if (action === 'high-contrast') { body.classList.toggle('a11y-high-contrast'); tog(); }
      else if (action === 'negative')      { body.classList.toggle('a11y-negative');      tog(); }
      else if (action === 'underline')     { body.classList.toggle('a11y-underline');     tog(); }
      else if (action === 'readable')      { body.classList.toggle('a11y-readable');      tog(); }
      else if (action === 'reset') {
        fontSize = 100;
        document.documentElement.style.fontSize = '';
        ['a11y-grayscale','a11y-negative','a11y-high-contrast','a11y-underline','a11y-readable']
          .forEach(c => body.classList.remove(c));
        panel.querySelectorAll('.a11y-btn.is-active').forEach(b => b.classList.remove('is-active'));
      }
    });
  });
})();