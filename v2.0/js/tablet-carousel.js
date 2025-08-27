// js/tablet-carousel.js — Абсолютно плавная карусель

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.midel-carousel .products-container');
  const cards = document.querySelectorAll('.midel-carousel .product-card');

  if (!container || cards.length !== 3) {
    console.warn('tablet-carousel: не найдены элементы');
    return;
  }

  const btnPrev = document.querySelector('.midel-carousel .mid-carousel-prev');
  const btnNext = document.querySelector('.midel-carousel .mid-carousel-next');

  let isAnimating = false;
  const offset = 300; // 250px + 50px gap

  // 🔥 Принудительно включаем аппаратное ускорение
  container.style.transform = 'translateZ(0)';
  container.style.backfaceVisibility = 'hidden';
  container.style.willChange = 'transform';

  // Функция: плавный сдвиг вправо (→)
  function slideNext() {
    if (isAnimating) return;
    isAnimating = true;

    // 1. Убираем transition и сдвигаем "в запас" (виртуально)
    container.style.transition = 'none';
    container.style.transform = `translate3d(${offset}px, 0, 0)`;

    // 2. Принудительная перерисовка (фиксирует сдвиг)
    container.offsetHeight;

    // 3. Включаем плавную анимацию
    container.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    container.style.transform = 'translate3d(0, 0, 0)';

    // 4. Меняем порядок в DOM после анимации
    setTimeout(() => {
      container.appendChild(container.firstElementChild);
      isAnimating = false;
    }, 600);
  }

  // Функция: плавный сдвиг влево (←)
  function slidePrev() {
    if (isAnimating) return;
    isAnimating = true;

    // 1. Убираем transition и сдвигаем влево
    container.style.transition = 'none';
    container.style.transform = `translate3d(-${offset}px, 0, 0)`;

    // 2. Принудительная перерисовка
    container.offsetHeight;

    // 3. Включаем анимацию
    container.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    container.style.transform = 'translate3d(0, 0, 0)';

    // 4. Меняем порядок
    setTimeout(() => {
      container.prepend(container.lastElementChild);
      isAnimating = false;
    }, 600);
  }

  // Обработчики
  btnNext?.addEventListener('click', e => {
    e.preventDefault();
    slideNext();
  });

  btnPrev?.addEventListener('click', e => {
    e.preventDefault();
    slidePrev();
  });
});