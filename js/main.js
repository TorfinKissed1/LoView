import { initHeaderMenu } from './header.js';
import { initPerksSlider } from './sliders/perks-slider.js';
import { initHeroScroll } from './hero.js';
import { initSmallPopups } from './small-popups.js';
import { initMapPopup } from './map-popup.js';
import { initMapSlider } from './sliders/map-slider.js';
import { initArchitectureParallax } from './architecture.js';
import { initVideoPopup } from './video-lighbox.js';
import { initLaviewSliders } from './sliders/laview-slider.js';
import { initBeachesSlider } from './sliders/beaches-slider.js';
import { initApartmentsSlider } from './sliders/apartments-slider.js';
import { initApartmentPopup } from './apartment-popup.js';
import { initLoviewVideoObserver } from './loview-video.js';
import { initInfrastructureAccordion } from './infrastructure.js';
import { initLightbox } from './apartment-popup.js';
import { initCallbackPopup } from './callback.js';
import { initBookPopup } from './book-popup.js';

function initFeedbackFormsValidation() {
  const forms = document.querySelectorAll('.layouts-popup__form, .callback-popup__form');

  forms.forEach((form) => {
    const nameInput = form.querySelector('input[type="text"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const checkboxInput = form.querySelector('input[type="checkbox"]');
    const checkboxLabel = checkboxInput?.closest('label');

    function setInputInvalid(input, isInvalid) {
      if (!input) return;

      input.classList.toggle('is-invalid', isInvalid);
      input.setAttribute('aria-invalid', String(isInvalid));
    }

    function setCheckboxInvalid(isInvalid) {
      if (!checkboxInput) return;

      checkboxLabel?.classList.toggle('is-invalid', isInvalid);
      checkboxInput.setAttribute('aria-invalid', String(isInvalid));
    }

    function validateName() {
      const isInvalid = !nameInput || nameInput.value.trim().length === 0;
      setInputInvalid(nameInput, isInvalid);

      return !isInvalid;
    }

    function validatePhone() {
      const digits = phoneInput?.value.replace(/\D/g, '') ?? '';
      const isInvalid = digits.length !== 11;
      setInputInvalid(phoneInput, isInvalid);

      return !isInvalid;
    }

    function validateCheckbox() {
      const isInvalid = Boolean(checkboxInput && !checkboxInput.checked);
      setCheckboxInvalid(isInvalid);

      return !isInvalid;
    }

    nameInput?.addEventListener('input', validateName);
    phoneInput?.addEventListener('input', validatePhone);
    checkboxInput?.addEventListener('change', validateCheckbox);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const isValid = [validateName(), validatePhone(), validateCheckbox()].every(Boolean);
      //const hasAction = Boolean(form.getAttribute('action')?.trim());

      if (isValid/* && hasAction*/) {
        const formData = new FormData(form);
        try {
            const response = await fetch('/ajax/success.php', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            const popupActive = document.querySelector('.popup.active');
            if (popupActive) {
                popupActive.classList.remove('active');
                popupActive.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }

            if (data.status) {
                const popupSuccess = document.querySelector('#success-popup');
                popupSuccess.classList.add('active');
                popupSuccess.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';

                const overlaySuccess = popupSuccess.querySelector('.popup__overlay');
                const closeBtnSuccess = popupSuccess.querySelector('[data-popup-close]');

                if (overlaySuccess) overlaySuccess.addEventListener('click', function() {
                    popupSuccess.classList.remove('active');
                    popupSuccess.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                });
                if (closeBtnSuccess) closeBtnSuccess.addEventListener('click', function() {
                    popupSuccess.classList.remove('active');
                    popupSuccess.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                });

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && popupSuccess.classList.contains('active')) {
                        popupSuccess.classList.remove('active');
                        popupSuccess.setAttribute('aria-hidden', 'true');
                        document.body.style.overflow = '';
                    }
                });
            } else {
                const popupError = document.querySelector('#error-popup');
                popupError.classList.add('active');
                popupError.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';

                const overlayError = popupError.querySelector('.popup__overlay');
                const closeBtnError = popupError.querySelector('[data-popup-close]');

                if (overlayError) overlayError.addEventListener('click', function() {
                    popupError.classList.remove('active');
                    popupError.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                });
                if (closeBtnError) closeBtnError.addEventListener('click', function() {
                    popupError.classList.remove('active');
                    popupError.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                });

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && popupError.classList.contains('active')) {
                        popupError.classList.remove('active');
                        popupError.setAttribute('aria-hidden', 'true');
                        document.body.style.overflow = '';
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeaderMenu();
  initHeroScroll();
  initPerksSlider();
  initSmallPopups();
  initMapPopup();
  initArchitectureParallax();
  initVideoPopup();
  initMapSlider();
  initLaviewSliders();
  initBeachesSlider();
  initApartmentsSlider();
  initApartmentPopup();
  initInfrastructureAccordion();
  initLoviewVideoObserver();
  initLightbox();
  initCallbackPopup();
  initFeedbackFormsValidation();
  initBookPopup();
});
