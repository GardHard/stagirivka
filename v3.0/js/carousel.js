
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.products-container');
  const cards = document.querySelectorAll('.product-card');

  // Проверка
  if (!container || cards.length < 3) {
    console.warn('Карусель: не найдены .products-container или карточки');
    return;
  }

  const btnPrev = document.querySelector('.mid-carousel-prev');
  const btnNext = document.querySelector('.mid-carousel-next');

  let isAnimating = false; // Блокировка двойного клика
  let cardList = Array.from(cards);

  function updateCarousel() {
    if (isAnimating) return;
    isAnimating = true;

    // Очищаем контейнер
    container.innerHTML = '';
    // Добавляем карточки
    cardList.forEach(card => container.appendChild(card));

    // Принудительно вызываем перерисовку
    container.offsetHeight;

    // Через небольшую задержку — срабатывает transition
    requestAnimationFrame(() => {
      setTimeout(() => {
        isAnimating = false;
      }, 500); // Должно совпадать с transition в CSS
    });
  }

  // Вперёд →
  btnNext?.addEventListener('click', function (e) {
    e.preventDefault();
    if (isAnimating) return;
    cardList.push(cardList.shift());
    updateCarousel();
  });

  // Назад ←
  btnPrev?.addEventListener('click', function (e) {
    e.preventDefault();
    if (isAnimating) return;
    cardList.unshift(cardList.pop());
    updateCarousel();
  });
});