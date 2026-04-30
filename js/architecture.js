export function initArchitectureParallax() {
  const section = document.querySelector('.architecture');
  const img = document.querySelector('.architecture__inner-top');
  const content = document.querySelector('.architecture__content');

  if (!section || !img || !content) return;

  function update() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom < 0 || rect.top > windowHeight) return;

    const sectionHeight = section.offsetHeight;

    const start = windowHeight * 0.3;
    const end = -sectionHeight;

    let progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    const maxImgMove = sectionHeight - img.offsetHeight;
    const maxContentMove = sectionHeight - content.offsetHeight;

    const IMG_SPEED = 1.2;
    const CONTENT_SPEED = 1.3;

    const imgProgress = Math.min(1, progress * IMG_SPEED);
    const contentProgress = Math.min(1, progress * CONTENT_SPEED);

    let imgMove = imgProgress * maxImgMove;
    let contentMove = contentProgress * maxContentMove;

    const IMG_STOP = 301;
    const CONTENT_STOP = 520;

    imgMove = Math.min(imgMove, IMG_STOP);
    contentMove = Math.min(contentMove, CONTENT_STOP);

    img.style.transform = `translateY(${imgMove}px)`;
    content.style.transform = `translateY(${contentMove}px)`;
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}