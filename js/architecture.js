export function initArchitectureParallax() {
  const section = document.querySelector('.architecture');
  const inner = section?.querySelector('.architecture__inner');
  const img = section?.querySelector('.architecture__inner-top');
  const content = section?.querySelector('.architecture__content');
  const imgWrapper = section?.querySelector('.architecture__img-wrapper');
  const desktopTitles = section?.querySelector('.architecture__titles-wrapper--desktop');
  const listWrapper = section?.querySelector('.architecture__list-wrapper');
  const mql = window.matchMedia('(max-width: 1000px)');
  const IMG_STOP = 301;
  const CONTENT_STOP = 520;
  const DESKTOP_BOTTOM_GAP = 64;
  let refreshRaf = 0;

  if (!section || !inner || !img || !content) return;

  function syncResponsiveStructure() {
    if (!imgWrapper || !desktopTitles || !listWrapper) return;

    if (mql.matches) {
      if (imgWrapper.nextElementSibling !== desktopTitles) {
        imgWrapper.after(desktopTitles);
      }
    } else if (content.firstElementChild !== desktopTitles) {
      content.insertBefore(desktopTitles, listWrapper);
    }
  }

  function clearDynamicHeight() {
    section.style.removeProperty('--architecture-section-height');
    section.style.removeProperty('--architecture-inner-height');
  }

  function getElementBottom(element, extraOffset = 0) {
    return element.offsetTop + element.offsetHeight + extraOffset;
  }

  function updateDynamicHeight() {
    if (mql.matches) {
      clearDynamicHeight();
      return;
    }

    const innerTop = Number.parseFloat(window.getComputedStyle(inner).top) || 0;
    const visualContentBottom = Math.max(
      getElementBottom(img, IMG_STOP),
      getElementBottom(content, CONTENT_STOP)
    );
    const innerHeight = Math.ceil(visualContentBottom + DESKTOP_BOTTOM_GAP);
    const sectionHeight = Math.ceil(innerTop + innerHeight);

    section.style.setProperty('--architecture-inner-height', `${innerHeight}px`);
    section.style.setProperty('--architecture-section-height', `${sectionHeight}px`);
  }

  function update() {
    if (mql.matches) {
      clearDynamicHeight();
      img.style.transform = 'none';
      content.style.transform = 'none';
      return;
    }

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom < 0 || rect.top > windowHeight) return;

    const sectionHeight = section.offsetHeight;

    const start = windowHeight * 0.3;
    const end = -sectionHeight;

    let progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    const maxImgMove = Math.max(0, sectionHeight - img.offsetHeight);
    const maxContentMove = Math.max(0, sectionHeight - content.offsetHeight);

    const IMG_SPEED = 1.2;
    const CONTENT_SPEED = 1.3;

    const imgProgress = Math.min(1, progress * IMG_SPEED);
    const contentProgress = Math.min(1, progress * CONTENT_SPEED);

    let imgMove = imgProgress * maxImgMove;
    let contentMove = contentProgress * maxContentMove;

    imgMove = Math.min(imgMove, IMG_STOP);
    contentMove = Math.min(contentMove, CONTENT_STOP);

    img.style.transform = `translateY(${imgMove}px)`;
    content.style.transform = `translateY(${contentMove}px)`;
  }

  function refresh() {
    syncResponsiveStructure();
    updateDynamicHeight();
    update();
  }

  function scheduleRefresh() {
    if (refreshRaf) {
      cancelAnimationFrame(refreshRaf);
    }

    refreshRaf = requestAnimationFrame(() => {
      refreshRaf = 0;
      refresh();
    });
  }

  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', scheduleRefresh);
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(scheduleRefresh);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', scheduleRefresh);
  window.addEventListener('load', scheduleRefresh, { once: true });

  section.querySelectorAll('img').forEach((image) => {
    if (image.complete) return;
    image.addEventListener('load', scheduleRefresh, { once: true });
  });

  refresh();
}
