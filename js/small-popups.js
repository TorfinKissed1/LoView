export function initSmallPopups() {
  const smallPopups = document.querySelectorAll('.popup--small');

  const DESKTOP_WIDTH = 1200;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-popup-open]');
    if (!trigger) return;

    const popupId = trigger.dataset.popupOpen;
    const popup = document.getElementById(popupId);

    if (!popup || !popup.classList.contains('popup--small')) return;

    if (window.innerWidth > DESKTOP_WIDTH) return;

    closeAllSmall();
    openPopup(popup);
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-popup-close]');
    if (!btn) return;

    const popup = btn.closest('.popup--small');
    if (!popup) return;

    closePopup(popup);
  });

  smallPopups.forEach((popup) => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup(popup);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      smallPopups.forEach(closePopup);
    }
  });

  function openPopup(popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePopup(popup) {
    popup.classList.remove('active');
    document.body.style.overflow = '';
  }

  function closeAllSmall() {
    smallPopups.forEach(p => p.classList.remove('active'));
  }
}