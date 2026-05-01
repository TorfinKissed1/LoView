export function initBeachesSlider() {
  const sliderEl = document.querySelector('.beaches__slider');
  if (!sliderEl) return;

  const swiper = sliderEl.swiper;
  if (!swiper) return;

  const slides = Array.from(sliderEl.querySelectorAll('.beaches__slide'));
  const slideCount = slides.length;
  const pagination = sliderEl.querySelector('.beaches__slider-pagination');

  slides.forEach((slide) => {
    const media = slide.querySelector('.beaches__slide-media');
    if (!media || media.querySelector('.beaches__slide-dots')) return;

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'beaches__slide-dots';

    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'beaches__slide-dot';
      dotsContainer.appendChild(dot);
    }

    media.appendChild(dotsContainer);
  });

  function updateDots(index) {
    sliderEl.querySelectorAll('.beaches__slide-dots').forEach((container) => {
      container.querySelectorAll('.beaches__slide-dot').forEach((dot, i) => {
        dot.classList.toggle('beaches__slide-dot--active', i === index);
      });
    });
  }

  const mql = window.matchMedia('(max-width: 1000px)');

  function syncPaginationPosition() {
    if (!pagination) return;

    if (mql.matches) {
      const activeIdx = swiper.activeIndex ?? 0;
      const activeSlide = slides[activeIdx];
      const media = activeSlide?.querySelector('.beaches__slide-media');
      if (media && media.nextElementSibling !== pagination) {
        media.after(pagination);
      }
    } else if (pagination.parentElement !== sliderEl) {
      sliderEl.appendChild(pagination);
    }
  }

  updateDots(swiper.activeIndex);
  syncPaginationPosition();

  swiper.on('slideChange', () => {
    updateDots(swiper.activeIndex);
    syncPaginationPosition();
  });

  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', syncPaginationPosition);
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(syncPaginationPosition);
  }
}