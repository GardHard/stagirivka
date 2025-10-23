// js/tablet-carousel.js
// + Добавление/удаление класса 'carousel-centered' для ВТОРОГО (!) карточки в DOM после анимации
// + Засвет убирается в CSS с помощью .carousel-centered::after { opacity: 0; }
// + Инициализация: центральная карточка - вторая в DOM

document.addEventListener('DOMContentLoaded', function () {

  const CONTAINER_SELECTOR = '.corusel .carousel-bottom';
  const CARD_SELECTOR = '.corusel .carousel-one, .corusel .carousel-two, .corusel .carousel-three';
  const BTN_PREV_SELECTOR = '.corusel .corusel-button-left';
  const BTN_NEXT_SELECTOR = '.corusel .corusel-button-right';
  const CENTER_CARD_CLASS = 'carousel-centered'; // Класс для центральной карточки
  // ИСПРАВЛЕНО: OFFSET_PX теперь учитывает ширину карточки + маргины
  const OFFSET_PX = 664 + 40 + 40; // Ширина карточки + левый маргин + правый маргин = 744

  // --- НАЙТИ ЭЛЕМЕНТЫ ---
  const container = document.querySelector(CONTAINER_SELECTOR);
  const cards = document.querySelectorAll(CARD_SELECTOR);

  if (!container || cards.length !== 3) {
    console.warn('tablet-carousel: Не найден .carousel-bottom или не ровно 3 карточки (.carousel-one, .carousel-two, .carousel-three) внутри .corusel');
    console.log('Найден .carousel-bottom:', !!container);
    console.log('Количество карточек:', cards.length);
    return;
  }

  const btnPrev = document.querySelector(BTN_PREV_SELECTOR);
  const btnNext = document.querySelector(BTN_NEXT_SELECTOR);

  if (!btnPrev || !btnNext) {
    console.warn('tablet-carousel: Не найдены кнопки .corusel-button-left или .corusel-button-right');
    console.log('Найдена кнопка Prev:', !!btnPrev);
    console.log('Найдена кнопка Next:', !!btnNext);
    return;
  }

  let isAnimating = false;

  // Функция: обновить класс центральной карточки (теперь - второй в DOM)
  function updateCardShadows() {
    // Убираем класс центральной карточки у всех
    cards.forEach(card => card.classList.remove(CENTER_CARD_CLASS));

    // Находим ВТОРОЙ элемент в DOM (индекс 1)
    const centerCard = container.children[1]; // Второй элемент в контейнере
    if (centerCard) {
        // Проверяем, что это действительно одна из карточек
        if (Array.from(cards).includes(centerCard)) {
            centerCard.classList.add(CENTER_CARD_CLASS); // Добавляем класс центральной
        }
    }
  }

  // Инициализация: установить начальный класс центральной карточки при загрузке
  // ИСПРАВЛЕНО: Теперь центральной считается ВТОРАЯ карточка в DOM
  // Убедимся, что карточки идут в правильном порядке при загрузке: one -> two -> three
  // Тогда второй будет .carousel-two
  // (Предполагается, что HTML изначально имеет такой порядок)
  const initialCenterCard = container.children[1]; // Второй элемент в DOM при загрузке
  if (initialCenterCard && Array.from(cards).includes(initialCenterCard)) {
      initialCenterCard.classList.add(CENTER_CARD_CLASS);
  } else {
      console.warn('Второй элемент в .carousel-bottom не найден или не является карточкой при инициализации');
      console.log('Второй элемент:', initialCenterCard);
  }


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
    container.style.transform = `translate3d(-${OFFSET_PX}px, 0, 0)`;

    // 2. Принудительная перерисовка (фиксирует сдвиг)
    container.offsetHeight;

    // 3. Включаем плавную анимацию
    container.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    container.style.transform = 'translate3d(0, 0, 0)';

    // 4. Меняем порядок в DOM после анимации
    const handleTransitionEnd = () => {
        container.removeEventListener('transitionend', handleTransitionEnd); // Удаляем обработчик
        const firstCard = container.firstElementChild; // Берём текущую "первую" (центральную до анимации)
        if (firstCard && Array.from(cards).includes(firstCard)) { // Проверяем, что это карточка
          container.appendChild(firstCard); // Перемещаем её в конец (становится левой)
          // Обновляем класс центральной карточки (теперь - второй в DOM)
          updateCardShadows(); // <-- Вызов updateCardShadows после перемещения
        }
        isAnimating = false;
      };

    container.addEventListener('transitionend', handleTransitionEnd); // Добавляем обработчик
  }

  // Функция: плавный сдвиг влево (←)
  function slidePrev() {
    if (isAnimating) return;
    isAnimating = true;

    // 1. Убираем transition и сдвигаем влево
    container.style.transition = 'none';
    container.style.transform = `translate3d(${OFFSET_PX}px, 0, 0)`;

    // 2. Принудительная перерисовка
    container.offsetHeight;

    // 3. Включаем анимацию
    container.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    container.style.transform = 'translate3d(0, 0, 0)';

    // 4. Меняем порядок
    const handleTransitionEnd = () => {
        container.removeEventListener('transitionend', handleTransitionEnd);
        const lastCard = container.lastElementChild; // Берём текущую "последнюю" (левую до анимации)
        if (lastCard && Array.from(cards).includes(lastCard)) { // Проверяем, что это карточка
          container.insertBefore(lastCard, container.firstElementChild); // Перемещаем её в начало (становится правой)
          // Обновляем класс центральной карточки (теперь - второй в DOM)
          updateCardShadows(); // <-- Вызов updateCardShadows после перемещения
        }
        isAnimating = false;
      };

    container.addEventListener('transitionend', handleTransitionEnd); // Добавляем обработчик
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