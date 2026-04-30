export function initPerksSlider() {
  const sliderElement = document.querySelector('.perks__slider');

  if (!sliderElement || typeof Swiper === 'undefined') {
    return;
  }

  const currentEl = document.querySelector('.perks__slider-current');
  const totalEl = document.querySelector('.perks__slider-total');

  const getRealSlidesCount = () =>
    sliderElement.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)').length;

  const updateFraction = (swiper) => {
    if (currentEl) {
      currentEl.textContent = String(swiper.realIndex + 1);
    }

    if (totalEl) {
      totalEl.textContent = String(getRealSlidesCount());
    }
  };

  const perksSlider = new Swiper(sliderElement, {
    slidesPerView: 1,
    loop: true,
    speed: 700,
    navigation: {
      nextEl: '.perks__slider-nav-button--next',
      prevEl: '.perks__slider-nav-button--prev',
    },
    on: {
      init(swiper) {
        updateFraction(swiper);
      },
      slideChange(swiper) {
        updateFraction(swiper);
      },
    },
  });

  return perksSlider;
}