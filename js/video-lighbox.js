export function initVideoPopup() {
  const openBtn = document.querySelector('.city-life__video-wrapper');
  const popup = document.getElementById('video-popup');
  const closeBtn = popup.querySelector('[data-video-close]');
  const video = popup.querySelector('.video-popup__video');

  if (!openBtn || !popup) return;

  const VIDEO_SRC = './video/city-live-video.mov';

function openPopup() {
  popup.classList.add('active');
  popup.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';

  video.src = VIDEO_SRC;
  video.currentTime = 0;
  video.play();
}

function closePopup() {
  popup.classList.remove('active');
  popup.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';

  video.pause();
  video.src = '';
}

  openBtn.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });
}