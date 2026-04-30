export function initApartmentPopup() {
  const openBtn = document.querySelector('.apartments__button');
  const popup = document.getElementById('layouts-popup');

  if (!openBtn || !popup) return;

const closeBtns = popup.querySelectorAll('[data-popup-close]');
  const overlay = popup.querySelector('.popup__overlay');

  const swiperEl = popup.querySelector('.layouts-popup__slider');
  const currentEl = popup.querySelector('.layouts-popup__current');
  const totalEl = popup.querySelector('.layouts-popup__total');

  const nextBtn = popup.querySelector('.layouts-popup__arrow--next');
  const prevBtn = popup.querySelector('.layouts-popup__arrow--prev');

  let swiper;

  function openPopup() {
    popup.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    initSwiper();
  }

  function closePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  }

  function initSwiper() {
    if (swiper) return;

    swiper = new Swiper(swiperEl, {
      loop: true,
navigation: { nextEl: popup.querySelector('.layouts-popup__arrow--next'), prevEl: popup.querySelector('.layouts-popup__arrow--prev'), },
      on: {
        init(swiper) {
          updateFraction(swiper);
        },
        slideChange(swiper) {
          updateFraction(swiper);
        }
      }
    });

    totalEl.textContent = swiper.slides.length - swiper.loopedSlides * 2;
  }

  function updateFraction(swiper) {
    currentEl.textContent = swiper.realIndex + 1;
  }

  openBtn.addEventListener('click', openPopup);
closeBtns.forEach((btn) => {
  btn.addEventListener('click', closePopup);
});

  popup.addEventListener('click', (e) => {
    if (e.target === popup || e.target === overlay) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });
}

export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = lightbox.querySelector('.lightbox__image');
  const closeBtn = lightbox.querySelector('[data-lightbox-close]');
  const overlay = lightbox.querySelector('.lightbox__overlay');

  const triggers = document.querySelectorAll('.layouts-popup__image img');

  let scale = 1;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let posX = 0;
  let posY = 0;

  function open(src) {
    img.src = src;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');

    reset();
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    img.src = '';
    reset();
  }

  function reset() {
    scale = 1;
    posX = 0;
    posY = 0;
    update();
  }

  function update() {
    img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
  }

  triggers.forEach((el) => {
    el.addEventListener('click', () => {
      open(el.src);
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  lightbox.addEventListener('wheel', (e) => {
    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.min(Math.max(1, scale + delta), 3);

    update();
  });

  lightbox.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    update();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  let initialDistance = null;

  lightbox.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();

      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (!initialDistance) initialDistance = distance;

      const diff = distance / initialDistance;

      scale = Math.min(Math.max(1, diff), 3);
      update();
    }
  }, { passive: false });

  lightbox.addEventListener('touchend', () => {
    initialDistance = null;
  });
}