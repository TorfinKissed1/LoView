export function initCallbackPopup() {
  const openBtn = document.querySelector('.footer__button');
  const popup = document.querySelector('#call-popup'); 
  

  if (!openBtn || !popup) return;

  const overlay = popup.querySelector('.popup__overlay');
  const closeBtn = popup.querySelector('[data-popup-close]');

  function openPopup() {
    popup.classList.add('active'); 
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openPopup);
  

  if (overlay) overlay.addEventListener('click', closePopup);
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape' && popup.classList.contains('active')) {
      closePopup();
    }
  });
}