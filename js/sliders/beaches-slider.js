export function initBeachesSlider() {
  const sliderEl = document.querySelector('.beaches__slider');
  if (!sliderEl) return;

  const slider = new Swiper(sliderEl, {
    slidesPerView: 1,
    speed: 1200,
    allowTouchMove: true,
    navigation: {
      nextEl: '.beaches__slider-button--next',
      prevEl: '.beaches__slider-button--prev',
    },
  });

  const buttons = document.querySelectorAll('.beaches__button');
  const bgImages = document.querySelectorAll('.beaches__bg-img');

  function updateUI(index) {
    buttons.forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });

    bgImages.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  updateUI(slider.activeIndex);

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      slider.slideTo(index);
    });
  });

  slider.on('slideChange', () => {
    updateUI(slider.activeIndex);
  });
}