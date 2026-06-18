export function initRoofSlider() {
  const swiper = new Swiper(".roof__slider", {
    slidesPerView: 1,
    speed: 800,
    allowTouchMove: true,
    loop: true,

    navigation: {
      nextEl: ".roof__slider-nav-button--next",
      prevEl: ".roof__slider-nav-button--prev",
    },
  });

  const buttons = document.querySelectorAll(
    ".roof__slider-pagination-button"
  );

  function setActive(index) {
    buttons.forEach((btn) => btn.classList.remove("active"));
    buttons[index]?.classList.add("active");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.slide);
      swiper.slideTo(index);
    });
  });

  swiper.on("slideChange", () => {
    setActive(swiper.activeIndex);
  });

  setActive(0);

  

  return swiper;
}