// Apply the preference before styles load to avoid a flash of the wrong theme.
(() => {
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const key = 'portfolio-theme';
  let preference = null;
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'dark' || saved === 'light') preference = saved;
  } catch { /* System preference remains usable when storage is unavailable. */ }
  function apply() {
    document.documentElement.dataset.theme = preference || (system.matches ? 'dark' : 'light');
    window.dispatchEvent(new Event('portfolio-theme-change'));
  }
  window.portfolioTheme = {
    toggle() {
      preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, preference); } catch { /* Keep the in-memory choice. */ }
      apply();
    }
  };
  system.addEventListener('change', () => { if (!preference) apply(); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
    apply();
  });
  apply();
})();
