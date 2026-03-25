/* ==========================================
   COUNTDOWN - Cuenta regresiva a la boda
   ========================================== */
document.addEventListener('DOMContentLoaded', function () {

  const targetDate = new Date('2026-06-01T08:00:00');

  const daysEl    = document.getElementById('cd-days');
  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  function updateCountdown() {
    const now  = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent    = String(days).padStart(2, '0');
    hoursEl.textContent   = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ==========================================
     RSVP - Envio unico sin duplicados
     ========================================== */
  const form = document.getElementById('my-form');
  if (form) {
    let enviando = false;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (enviando) return;  // bloquear doble envio
      enviando = true;

      var btn = form.querySelector('button[type="submit"]');
      var msg = document.getElementById('form-msg');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      fetch(form.action, { method: 'POST', body: new FormData(form) })
        .then(function () {
          msg.style.display = 'block';
          msg.style.color   = '#80acdc';
          msg.textContent   = '\u00a1Gracias! Tu confirmaci\u00f3n fue recibida. \u2665';
          btn.style.display = 'none';
          form.reset();
        })
        .catch(function () {
          msg.style.display = 'block';
          msg.style.color   = '#ff6b6b';
          msg.textContent   = 'Hubo un error. Por favor intent\u00e1 de nuevo.';
          btn.disabled = false;
          btn.textContent = 'Enviar';
          enviando = false;
        });
    });
  }

});

/* ==========================================
   NAVBAR - Fix overflow
   ========================================== */
const stickyTop = document.querySelector('.sticky-top');
const offcanvas = document.querySelector('.offcanvas');

if (offcanvas) {
  offcanvas.addEventListener('show.bs.offcanvas', function () {
    stickyTop.style.overflow = 'visible';
  });
  offcanvas.addEventListener('hidden.bs.offcanvas', function () {
    stickyTop.style.overflow = 'hidden';
  });
}

/* ==========================================
   SCROLL - Bloquear hasta abrir invitacion
   ========================================== */
const rootElement      = document.querySelector(':root');
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon        = document.querySelector('.audio-icon-wrapper i');
const backSong         = document.querySelector('#backSong');
let isPlaying = false;

function disableScroll() {
  const scrollTop  = window.pageYOffset  || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };
  rootElement.style.scrollBehavior = 'auto';
}

function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = 'smooth';
  playAudio();
}

/* ==========================================
   AUDIO - Musica de fondo
   ========================================== */
function playAudio() {
  backSong.volume = 0.5;
  backSong.play();
  audioIconWrapper.style.display = 'flex';
  isPlaying = true;
}

if (audioIconWrapper) {
  audioIconWrapper.onclick = function () {
    if (isPlaying) {
      backSong.pause();
      audioIcon.classList.remove('bi-disc');
      audioIcon.classList.add('bi-pause-circle');
    } else {
      backSong.play();
      audioIcon.classList.add('bi-disc');
      audioIcon.classList.remove('bi-pause-circle');
    }
    isPlaying = !isPlaying;
  };
}

disableScroll();

/* ==========================================
   URL PARAMS - Personalizar nombre del invitado
   Ejemplo: index.html?n=Juan&p=Sr.
   ========================================== */
const urlParams    = new URLSearchParams(window.location.search);
const nombreGuest  = urlParams.get('n') || '';
const pronounGuest = urlParams.get('p') || '';

const namaContainer = document.querySelector('.hero h4 span');
if (namaContainer && nombreGuest) {
  namaContainer.innerText = `${pronounGuest} ${nombreGuest},`;
}

const inputNama = document.querySelector('#nama');
if (inputNama) {
  inputNama.value = nombreGuest;
}
