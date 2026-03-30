/* ==========================================
   COUNTDOWN - Cuenta regresiva a la boda
   ========================================== */
document.addEventListener('DOMContentLoaded', function () {

  const targetDate = new Date('2026-06-01T08:00:00');

  const daysEl    = document.getElementById('cd-days');
  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  function setWithFlip(el, value) {
    if (el.textContent !== value) {
      el.classList.remove('flip');
      void el.offsetWidth;
      el.classList.add('flip');
      el.textContent = value;
    }
  }

  function updateCountdown() {
    const now  = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      setWithFlip(daysEl,    '00');
      setWithFlip(hoursEl,   '00');
      setWithFlip(minutesEl, '00');
      setWithFlip(secondsEl, '00');
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setWithFlip(daysEl,    String(days).padStart(2, '0'));
    setWithFlip(hoursEl,   String(hours).padStart(2, '0'));
    setWithFlip(minutesEl, String(minutes).padStart(2, '0'));
    setWithFlip(secondsEl, String(seconds).padStart(2, '0'));
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================
     SCROLL REVEAL - Fade up al entrar en pantalla
     ========================================== */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ==========================================
     NAVBAR ACTIVO - Resalta sección visible
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObserver.observe(s));

  /* ==========================================
     SCROLL SMOOTH
     ========================================== */
  document.documentElement.style.scrollBehavior = 'smooth';

});