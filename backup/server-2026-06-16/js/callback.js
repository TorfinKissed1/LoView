export function initCallbackPopup() {
  const openBtn = document.querySelector('.footer__button');
  const popup = document.querySelector('#call-popup'); 
  

  if (!openBtn || !popup) return;

  const overlay = popup.querySelector('.popup__overlay');
  const closeBtn = popup.querySelector('[data-popup-close]');
  const phoneInput = popup.querySelector('input[type="tel"]');

  function openPopup() {
    popup.classList.add('active'); 
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openPopup);

  function formatPhone(value) {
    let digits = value.replace(/\D/g, '');

    if (!digits) {
      return '';
    }

    if (digits[0] === '8') {
      digits = `7${digits.slice(1)}`;
    } else if (digits[0] === '9') {
      digits = `7${digits}`;
    }

    if (digits[0] !== '7') {
      digits = `7${digits}`;
    }

    digits = digits.slice(0, 11);

    const code = digits.slice(1, 4);
    const first = digits.slice(4, 7);
    const second = digits.slice(7, 9);
    const third = digits.slice(9, 11);

    let formatted = '+7';

    if (code) {
      formatted += `(${code}`;
    }

    if (code.length === 3) {
      formatted += ')';
    }

    if (first) {
      formatted += first;
    }

    if (second) {
      formatted += `-${second}`;
    }

    if (third) {
      formatted += `-${third}`;
    }

    return formatted;
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = formatPhone(phoneInput.value);
    });

    phoneInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Backspace' && e.key !== 'Delete') {
        return;
      }

      const digits = phoneInput.value.replace(/\D/g, '');

      if (digits.length <= 1) {
        e.preventDefault();
        phoneInput.value = '';
        return;
      }

      const cursorPosition = phoneInput.selectionStart ?? phoneInput.value.length;
      const hasSelection = phoneInput.selectionStart !== phoneInput.selectionEnd;

      if (hasSelection) {
        return;
      }

      const targetIndex = e.key === 'Backspace' ? cursorPosition - 1 : cursorPosition;
      const targetChar = phoneInput.value[targetIndex];

      if (targetChar && /\D/.test(targetChar)) {
        e.preventDefault();

        const chars = phoneInput.value.split('');
        const direction = e.key === 'Backspace' ? -1 : 1;
        let digitIndex = targetIndex;

        while (digitIndex >= 0 && digitIndex < chars.length && /\D/.test(chars[digitIndex])) {
          digitIndex += direction;
        }

        if (digitIndex >= 0 && digitIndex < chars.length) {
          chars.splice(digitIndex, 1);
          phoneInput.value = formatPhone(chars.join(''));
        }
      }
    });
  }
  

  if (overlay) overlay.addEventListener('click', closePopup);
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape' && popup.classList.contains('active')) {
      closePopup();
    }
  });
}