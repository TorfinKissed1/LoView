export function initMapSlider() {
    const button = document.querySelector('.map__button');
    const slides = document.querySelectorAll('.map__slide');

    let currentIndex = 0;

    button.addEventListener('click', () => {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    });
}


