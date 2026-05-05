export function initInfrastructureAccordion() {
  const items = document.querySelectorAll(".infrastructure__item");
  const images = document.querySelectorAll(".infrastructure__image");
  const animationDuration = 350;
  const animationEasing = "ease-out";

  const hideAllImages = () => {
    images.forEach((img) => img.classList.remove("is-active"));
  };

  const showImage = (index) => {
    hideAllImages();
    if (images[index]) {
      images[index].classList.add("is-active");
    }
  };

  const closeOthers = (current) => {
    items.forEach((item) => {
      if (item !== current && item.open) closeItem(item);
    });
  };

  const openItem = (item) => {
    const startHeight = `${item.offsetHeight}px`;

    item.open = true;

    const endHeight = `${item.offsetHeight}px`;

    item.animate(
      { height: [startHeight, endHeight] },
      { duration: animationDuration, easing: animationEasing }
    );
  };

  const closeItem = (item) => {
    const startHeight = `${item.offsetHeight}px`;
    const summary = item.querySelector(".infrastructure__summary");
    const endHeight = `${summary?.offsetHeight ?? 0}px`;

    const animation = item.animate(
      { height: [startHeight, endHeight] },
      { duration: animationDuration, easing: animationEasing }
    );

    animation.onfinish = () => {
      item.open = false;
    };
  };

  items.forEach((item, index) => {
    const summary = item.querySelector(".infrastructure__summary");

    summary?.addEventListener("click", (e) => {
      e.preventDefault();

      if (item.open) {
        closeItem(item);
        return;
      }

      closeOthers(item);
      openItem(item);
      showImage(index);
    });
  });

  const initialIndex = Array.from(items).findIndex((item) => item.open);

  if (initialIndex !== -1) {
    showImage(initialIndex);
  } else {
    items[0].open = true;
    showImage(0);
  }
}