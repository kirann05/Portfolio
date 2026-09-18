(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const themeButton = document.querySelector('.theme-toggle');
  function updateThemeButton() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const label = `Switch to ${dark ? 'light' : 'dark'} mode`;
    themeButton.setAttribute('aria-label', label);
    themeButton.title = label;
    themeButton.innerHTML = `<i data-lucide="${dark ? 'sun' : 'moon'}" aria-hidden="true"></i>`;
    lucide.createIcons();
  }
  themeButton.addEventListener('click', () => window.portfolioTheme.toggle());
  window.addEventListener('portfolio-theme-change', updateThemeButton);
  updateThemeButton();

  const rotators = [...document.querySelectorAll('[data-rotator]')].map(element => ({
    element, lines: [...element.querySelectorAll('.rotating-line')], index: 0,
  }));
  let interval = null;
  let pending = null;
  function stopRotation() {
    clearInterval(interval);
    clearTimeout(pending);
    interval = pending = null;
    rotators.forEach(item => {
      item.lines.forEach((line, i) => {
        line.classList.remove('is-leaving');
        line.classList.toggle('is-active', i === item.index);
      });
    });
  }
  function rotate() {
    if (document.querySelector('.video-frame.is-playing')) return;
    // Only the most central visible section moves; offscreen sections stay still.
    const visible = rotators.filter(item => {
      const rect = item.element.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= innerHeight && !item.element.matches(':hover, :focus-within');
    }).sort((a, b) => {
      const distance = item => Math.abs(item.element.getBoundingClientRect().top - innerHeight / 2);
      return distance(a) - distance(b);
    });
    const item = visible[0];
    if (!item) return;
    const previous = item.lines[item.index];
    previous.classList.add('is-leaving');
    pending = setTimeout(() => {
      previous.classList.remove('is-active', 'is-leaving');
      item.index = (item.index + 1) % item.lines.length;
      item.lines[item.index].classList.add('is-active');
      pending = null;
    }, 180);
  }
  function syncRotation() {
    stopRotation();
    if (reduced.matches) {
      rotators.forEach(item => {
        item.index = 0;
        item.lines.forEach((line, i) => line.classList.toggle('is-active', i === 0));
      });
    } else if (!document.hidden && rotators.length) {
      interval = setInterval(rotate, 3500);
    }
  }
  reduced.addEventListener('change', syncRotation);
  document.addEventListener('visibilitychange', syncRotation);
  window.addEventListener('pagehide', stopRotation);
  window.addEventListener('pageshow', syncRotation);
  syncRotation();

  const hover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const players = [...document.querySelectorAll('[data-video]')];
  const stops = [];
  players.forEach(frame => {
    const play = frame.querySelector('.video-play');
    const close = frame.querySelector('.video-close');
    let iframe = null;
    let automatic = false;
    function stop(restoreFocus = false) {
      iframe?.remove();
      iframe = null;
      automatic = false;
      frame.classList.remove('is-playing');
      play.hidden = false;
      close.hidden = true;
      if (restoreFocus) play.focus();
    }
    stops.push(stop);
    function start(isAutomatic) {
      if (iframe) { if (!isAutomatic) automatic = false; return; }
      if (isAutomatic && (reduced.matches || !hover.matches)) return;
      stops.forEach(other => other());
      automatic = isAutomatic;
      iframe = document.createElement('iframe');
      const url = new URL(`https://www.youtube-nocookie.com/embed/${frame.dataset.video}`);
      url.search = new URLSearchParams({autoplay:'1',mute:'1',playsinline:'1',rel:'0',controls:'1'}).toString();
      iframe.src = url.href;
      iframe.title = 'NowServing project walkthrough';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.append(iframe);
      frame.classList.add('is-playing');
      play.hidden = true;
      close.hidden = false;
      if (!isAutomatic) close.focus();
    }
    frame.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') start(true); });
    frame.addEventListener('pointerleave', () => { if (automatic) stop(); });
    play.addEventListener('click', () => start(false));
    close.addEventListener('click', () => stop(true));
    frame.addEventListener('keydown', event => { if (event.key === 'Escape') stop(true); });
    reduced.addEventListener('change', () => { if (reduced.matches && automatic) stop(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) stop();
      }).observe(frame);
    }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stops.forEach(stop => stop()); });
  window.addEventListener('pagehide', () => stops.forEach(stop => stop()));
})();
