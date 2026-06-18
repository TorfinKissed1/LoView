export function initApartmentsSlider() {
  const sliderEl = document.querySelector('.apartments__slider');
  if (!sliderEl) return;

  const swiper = sliderEl.swiper;
  if (!swiper) return;

  const slides = Array.from(sliderEl.querySelectorAll('.apartments__slide'));
  const slideCount = slides.length;

  slides.forEach((slide) => {
    const bg = slide.querySelector('.apartments__slide-bg');
    if (!bg) return;

    let media = slide.querySelector('.apartments__slide-media');
    if (!media) {
      media = document.createElement('div');
      media.className = 'apartments__slide-media';
      bg.parentNode.insertBefore(media, bg);
      media.appendChild(bg);
    }

    if (media.querySelector('.apartments__slide-dots')) return;

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'apartments__slide-dots';

    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'apartments__slide-dot';
      dotsContainer.appendChild(dot);
    }

    media.appendChild(dotsContainer);
  });

  function updateDots(index) {
    sliderEl.querySelectorAll('.apartments__slide-dots').forEach((container) => {
      container.querySelectorAll('.apartments__slide-dot').forEach((dot, i) => {
        dot.classList.toggle('apartments__slide-dot--active', i === index);
      });
    });
  }

  const pagination = sliderEl.querySelector('.apartments__slider-pagination');
  const mql = window.matchMedia('(max-width: 768px)');

  function positionPagination() {
    if (!pagination) return;

    if (mql.matches) {
      const activeIdx = swiper.realIndex ?? swiper.activeIndex ?? 0;
      const activeSlide = slides[activeIdx];
      const media = activeSlide?.querySelector('.apartments__slide-media');
      if (media) {
        const top = media.offsetTop + media.offsetHeight + 16;
        pagination.style.top = top + 'px';
      }
    } else {
      pagination.style.top = '';
    }
  }

  updateDots(swiper.realIndex ?? swiper.activeIndex ?? 0);
  positionPagination();

  swiper.on('slideChange', () => {
    updateDots(swiper.realIndex ?? swiper.activeIndex ?? 0);
    positionPagination();
  });

  window.addEventListener('resize', positionPagination);

  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', positionPagination);
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(positionPagination);
  }
}
