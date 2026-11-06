(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const dots = document.getElementById('dots');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const counter = document.getElementById('counter');
  const stage = document.getElementById('stage');
  const fs = document.getElementById('fullscreen');
  let current = 0;
  let progressionTimer = null;
  let chordIndex = -1;
  const chordButtons = [...document.querySelectorAll('#chordGrid button')];

  function stopProgression() {
    clearInterval(progressionTimer);
    progressionTimer = null;
    chordIndex = -1;
    chordButtons.forEach(button => button.classList.remove('selected'));
    const play = document.getElementById('playProgression');
    play.setAttribute('aria-pressed', 'false');
    play.innerHTML = '<span class="play-symbol">▶</span> 코드 진행 보기';
  }

  function show(index) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (target !== 3) stopProgression();
    current = target;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.querySelectorAll('button').forEach(button => { button.tabIndex = active ? 0 : -1; });
    });
    [...dots.children].forEach((dot, i) => {
      dot.classList.toggle('current', i === current);
      dot.setAttribute('aria-current', i === current ? 'step' : 'false');
    });
    counter.textContent = `${String(current + 1).padStart(2, '0')} — ${String(slides.length).padStart(2, '0')}`;
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    history.replaceState(null, '', `#slide-${current + 1}`);
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `${i + 1}번 슬라이드로 이동`);
    dot.addEventListener('click', () => show(i));
    dots.append(dot);
  });
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (['ArrowRight', 'PageDown', ' '].includes(event.key) && !(event.target instanceof HTMLButtonElement)) {event.preventDefault(); show(current + 1);}
    if (['ArrowLeft', 'PageUp'].includes(event.key)) {event.preventDefault(); show(current - 1);}
    if (event.key === 'Home') show(0);
    if (event.key === 'End') show(slides.length - 1);
    if (event.key.toLowerCase() === 'f' && !event.repeat) fs.click();
  });
  fs.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await stage.requestFullscreen();
    } catch (_) { /* Some browsers restrict fullscreen; normal view still works. */ }
  });
  let startX = null;
  stage.addEventListener('touchstart', event => { startX = event.changedTouches[0]?.screenX ?? null; }, {passive:true});
  stage.addEventListener('touchend', event => {
    if (startX === null) return;
    const dx = (event.changedTouches[0]?.screenX ?? startX) - startX;
    if (Math.abs(dx) > 45) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, {passive:true});
  chordButtons.forEach((button, index) => button.addEventListener('click', () => {
    stopProgression();
    chordIndex = index;
    button.classList.add('selected');
  }));
  document.getElementById('playProgression').addEventListener('click', () => {
    if (progressionTimer) { stopProgression(); return; }
    const play = document.getElementById('playProgression');
    play.setAttribute('aria-pressed', 'true');
    play.innerHTML = '<span class="play-symbol">■</span> 진행 중지';
    chordIndex = -1;
    const tick = () => {
      chordButtons.forEach(button => button.classList.remove('selected'));
      chordIndex = (chordIndex + 1) % chordButtons.length;
      chordButtons[chordIndex].classList.add('selected');
    };
    tick();
    progressionTimer = setInterval(tick, 650);
  });
  window.addEventListener('hashchange', () => {
    const match = /^#slide-([1-6])$/.exec(location.hash);
    if (match) show(Number(match[1]) - 1);
  });
  const initial = /^#slide-([1-6])$/.exec(location.hash);
  show(initial ? Number(initial[1]) - 1 : 0);
})();
