export function initMapPopup() {
  const popup = document.getElementById('map-popup');
  if (!popup) return;

  const openBtn = document.querySelector('[data-popup-open="map-popup"]');
  const zoomArea = document.querySelector('.map__zoom-area');
  const closeBtns = popup.querySelectorAll('[data-popup-close]');

  const mapScroll = document.querySelector('.map__scroll');
  const handIcon = document.querySelector('.map__hand-icon');
  const mapImg = document.querySelector('.map__img');

  let hasScrolled = false;

  function setStartPosition() {
    if (!mapScroll) return;

    mapScroll.scrollLeft =
      mapScroll.scrollWidth - mapScroll.clientWidth;
  }

  function initScrollPosition() {
    if (!mapImg) {
      setStartPosition();
      return;
    }

    if (mapImg.complete) {
      setStartPosition();
    } else {
      mapImg.onload = () => {
        setStartPosition();
      };
    }
  }

  initScrollPosition();

  function openPopup() {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(setStartPosition, 0);
  }

  openBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openPopup();
  });

  zoomArea?.addEventListener('click', openPopup);

  function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = '';

    smoothScrollToRight(mapScroll, 1200);
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closePopup);
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });

  mapScroll?.addEventListener('scroll', () => {
    if (!hasScrolled) {
      hasScrolled = true;
      if (handIcon) handIcon.style.animation = 'none';
    }
  }, { passive: true });

  function smoothScrollToRight(element, duration = 1200) {
    if (!element) return;

    const target =
      element.scrollWidth - element.clientWidth;

    const start = element.scrollLeft;
    const distance = target - start;

    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease = 1 - Math.pow(1 - progress, 3);

      element.scrollLeft = start + distance * ease;

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }
}