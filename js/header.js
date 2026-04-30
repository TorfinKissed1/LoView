export function initHeaderMenu() {
  const menuBtn = document.querySelector('.header__link--menu');
  const mobileMenuBtn = document.querySelector('.header-mobile__burger');
  const burgerMenu = document.querySelector('.burger-menu');
  const overlay = document.querySelector('.burger-overlay');
  const mobileLogo = document.querySelector('.header-mobile__logo-link');

  if (!burgerMenu || !overlay) return;

  let startY = 0;
  let currentY = 0;
  let isSwiping = false;

  const openMenu = () => {
    burgerMenu.classList.add('is-open');
    overlay.classList.add('is-open');

    menuBtn?.classList.add('is-active');
    mobileMenuBtn?.classList.add('is-active');
    mobileLogo?.classList.add('is-visible');

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  const closeMenu = () => {
    burgerMenu.classList.remove('is-open');
    overlay.classList.remove('is-open');

    menuBtn?.classList.remove('is-active');
    mobileMenuBtn?.classList.remove('is-active');
    mobileLogo?.classList.remove('is-visible');

    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  const toggleMenu = () => {
    if (burgerMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  menuBtn?.addEventListener('click', toggleMenu);
  mobileMenuBtn?.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  burgerMenu.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    isSwiping = true;
  });

  burgerMenu.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    currentY = e.touches[0].clientY;
  });

  burgerMenu.addEventListener('touchend', () => {
    const diff = startY - currentY;
    if (diff > 50) {
      closeMenu();
    }
    isSwiping = false;
  });
}