export function initArchitectureParallax() {
  const section = document.querySelector('.architecture');
  const img = document.querySelector('.architecture__inner-top');
  const content = document.querySelector('.architecture__content');
  const imgWrapper = section?.querySelector('.architecture__img-wrapper');
  const desktopTitles = section?.querySelector('.architecture__titles-wrapper--desktop');
  const listWrapper = section?.querySelector('.architecture__list-wrapper');
  const mql = window.matchMedia('(max-width: 1000px)');

  if (!section || !img || !content) return;

  let sectionH = 0;
  let houseH = 0;
  let contentH = 0;
  let amp = 0;

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

  function layout() {
    if (mql.matches) {
      section.style.height = '';
      img.style.transform = 'none';
      content.style.transform = 'none';
      return;
    }

    img.style.transform = 'none';
    content.style.transform = 'none';

    houseH = img.offsetHeight;
    contentH = content.offsetHeight;

    amp = Math.max(110, Math.min(180, Math.round(houseH * 0.15)));
    sectionH = Math.max(houseH, contentH) + Math.round(amp * 1.6);
    section.style.height = sectionH + 'px';

    update();
  }

  function update() {
    if (mql.matches) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom < 0 || rect.top > windowHeight) return;

    let progress = (windowHeight - rect.top) / (windowHeight + sectionH);
    progress = Math.max(0, Math.min(1, progress));

    const imgMove = progress * amp;
    const contentMove = amp * (1.6 - 0.6 * progress);

    img.style.transform = `translateY(${imgMove}px)`;
    content.style.transform = `translateY(${contentMove}px)`;
  }

  syncResponsiveStructure();
  layout();

  const onResize = () => {
    syncResponsiveStructure();
    layout();
  };

  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', onResize);
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(onResize);
  }

  section.querySelectorAll('img').forEach((image) => {
    if (!image.complete) image.addEventListener('load', layout, { once: true });
  });

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', update, { passive: true });
}
