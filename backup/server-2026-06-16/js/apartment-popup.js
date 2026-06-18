export function initApartmentPopup() {
  const openBtns = document.querySelectorAll('.apartments__button, [data-layouts-popup-open]');
  const popup = document.getElementById('layouts-popup');

  if (!openBtns.length || !popup) return;

const closeBtns = popup.querySelectorAll('[data-popup-close]');
  const overlay = popup.querySelector('.popup__overlay');

  const swiperEl = popup.querySelector('.layouts-popup__slider');
  const bottomSwiperEl = popup.querySelector('.layouts-popup__bottom-slider');
  const phoneInput = popup.querySelector('.layouts-popup__inputs input[type="tel"]');

  let swiper;
  let bottomSwiper;

  function openPopup() {
    popup.classList.add('active');
    popup.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    initSwiper();
    swiper?.updateAutoHeight();
    bottomSwiper?.updateAutoHeight();
  }

  function closePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';

    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }

    if (bottomSwiper) {
      bottomSwiper.destroy(true, true);
      bottomSwiper = null;
    }
  }

  function initSwiper() {
    if (swiper) return;

    const slidesCount = swiperEl.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;

    swiper = new Swiper(swiperEl, {
      loop: true,
      autoHeight: true,
      slidesPerView: 1,
      spaceBetween: 0,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        361: {
          slidesPerView: 1.1,
          spaceBetween: 16,
        },
        769: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
      on: {
        init(swiper) {
          updateFraction(swiper.realIndex, slidesCount);
        },
        slideChange(swiper) {
          updateFraction(swiper.realIndex, slidesCount);
          if (bottomSwiper && bottomSwiper.realIndex !== swiper.realIndex) {
            bottomSwiper.slideToLoop(swiper.realIndex);
          }
          swiper.updateAutoHeight();
        }
      }
    });

    bottomSwiper = new Swiper(bottomSwiperEl, {
      loop: true,
      allowTouchMove: false,
      autoHeight: true,
      on: {
        init(swiper) {
          updateFraction(swiper.realIndex, slidesCount);
        },
        slideChange(swiper) {
          updateFraction(swiper.realIndex, slidesCount);
        }
      }
    });
  }

  function updateFraction(index, total) {
    popup.querySelectorAll('.layouts-popup__current').forEach((el) => {
      el.textContent = index + 1;
    });

    popup.querySelectorAll('.layouts-popup__total').forEach((el) => {
      el.textContent = total;
    });
  }

  function formatPhone(value) {
    let digits = value.replace(/\D/g, '');

    if (!digits) {
      return '';
    }

    if (digits[0] === '8') {
      digits = `7${digits.slice(1)}`;
    } else if (digits[0] === '9') {
      digits = `7${digits}`;
    }

    if (digits[0] !== '7') {
      digits = `7${digits}`;
    }

    digits = digits.slice(0, 11);

    const code = digits.slice(1, 4);
    const first = digits.slice(4, 7);
    const second = digits.slice(7, 9);
    const third = digits.slice(9, 11);

    let formatted = '+7';

    if (code) {
      formatted += `(${code}`;
    }

    if (code.length === 3) {
      formatted += ')';
    }

    if (first) {
      formatted += first;
    }

    if (second) {
      formatted += `-${second}`;
    }

    if (third) {
      formatted += `-${third}`;
    }

    return formatted;
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = formatPhone(phoneInput.value);
    });

    phoneInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Backspace' && e.key !== 'Delete') {
        return;
      }

      const digits = phoneInput.value.replace(/\D/g, '');

      if (digits.length <= 1) {
        e.preventDefault();
        phoneInput.value = '';
        return;
      }

      const cursorPosition = phoneInput.selectionStart ?? phoneInput.value.length;
      const hasSelection = phoneInput.selectionStart !== phoneInput.selectionEnd;

      if (hasSelection) {
        return;
      }

      const targetIndex = e.key === 'Backspace' ? cursorPosition - 1 : cursorPosition;
      const targetChar = phoneInput.value[targetIndex];

      if (targetChar && /\D/.test(targetChar)) {
        e.preventDefault();

        const chars = phoneInput.value.split('');
        const direction = e.key === 'Backspace' ? -1 : 1;
        let digitIndex = targetIndex;

        while (digitIndex >= 0 && digitIndex < chars.length && /\D/.test(chars[digitIndex])) {
          digitIndex += direction;
        }

        if (digitIndex >= 0 && digitIndex < chars.length) {
          chars.splice(digitIndex, 1);
          phoneInput.value = formatPhone(chars.join(''));
        }
      }
    });
  }

  openBtns.forEach((openBtn) => {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup();
    });
  });

  window.addEventListener('resize', () => {
    swiper?.updateAutoHeight();
    bottomSwiper?.updateAutoHeight();
  });

closeBtns.forEach((btn) => {
  btn.addEventListener('click', closePopup);
});

  popup.addEventListener('click', (e) => {
    if (e.target.closest('.layouts-popup__arrow--next')) {
      swiper?.slideNext();
      return;
    }

    if (e.target.closest('.layouts-popup__arrow--prev')) {
      swiper?.slidePrev();
      return;
    }

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