export function initInfrastructureAccordion() {
  const items = document.querySelectorAll(".infrastructure__item");
  const images = document.querySelectorAll(".infrastructure__image");

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
      if (item !== current) item.open = false;
    });
  };

  items.forEach((item, index) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        closeOthers(item);
        showImage(index);
      }
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