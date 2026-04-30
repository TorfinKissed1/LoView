export function initLaviewSliders() {
  const sliders = document.querySelectorAll('.laview-slider');
  if (!sliders.length) return;

  sliders.forEach((sliderEl) => {
    const swiper = new Swiper(sliderEl, {
      slidesPerView: 1,
      speed: 1000,
      allowTouchMove: true,
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
    });

    updateUI(0);
  });
}