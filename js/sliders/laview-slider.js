export function initLaviewSliders() {
  const sliders = document.querySelectorAll('.laview-slider');
  if (!sliders.length) return;

  sliders.forEach((sliderEl) => {
    const isBeachesSlider = sliderEl.classList.contains('beaches__slider');
    const isAutoHeightSlider = isBeachesSlider || sliderEl.classList.contains('roof__slider');

    const swiper = new Swiper(sliderEl, {
      slidesPerView: 1,
      speed: 1000,
      allowTouchMove: true,
      autoHeight: isAutoHeightSlider,
      noSwiping: true,
      noSwipingSelector: '.beaches__slider-pagination, .beaches__slider-pagination *, .roof__slider-pagination, .roof__slider-pagination *',
      loop: sliderEl.classList.contains('laview-slider--loop'),

      navigation: {
        nextEl: sliderEl.querySelector('.laview-slider__nav-button--next'),
        prevEl: sliderEl.querySelector('.laview-slider__nav-button--prev'),
      },
    });

    const buttons = sliderEl.querySelectorAll('[data-slide]');
    const bgImages = sliderEl.querySelectorAll('.laview-slider__bg-img');

    function updateUI(index) {
      buttons.forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });

      if (bgImages.length) {
        bgImages.forEach((img, i) => {
          img.classList.toggle('active', i === index);
        });
      }
    }


    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.slide);
        swiper.slideTo(index);
      });
    });

    swiper.on('slideChange', () => {
      updateUI(swiper.realIndex ?? swiper.activeIndex);
      updateSliderHeight();
    });

    function updateSliderHeight() {
      if (isAutoHeightSlider) {
        swiper.updateAutoHeight(300);
      }
    }

    if (isAutoHeightSlider) {
      swiper.on('imagesReady', updateSliderHeight);

      sliderEl.querySelectorAll('img').forEach((img) => {
        if (img.complete) return;
        img.addEventListener('load', updateSliderHeight, { once: true });
      });

      window.addEventListener('resize', updateSliderHeight);
    }

    updateUI(0);
    updateSliderHeight();
  });
}