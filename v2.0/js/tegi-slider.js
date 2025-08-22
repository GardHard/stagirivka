// js/tegi-slider.js — Синхронное переключение кругов и фраз

document.addEventListener('DOMContentLoaded', function () {
  // Элементы: изображения
  const img1 = document.querySelector('.tegi-images .tegi-img.img1');
  const img2 = document.querySelector('.tegi-images .tegi-img.img2');
  const img3 = document.querySelector('.tegi-images .tegi-img.img3');

  // Элементы: круги
  const circle1 = document.querySelector('.tegi .circle-1');
  const circle2 = document.querySelector('.tegi .circle-2');
  const circle3 = document.querySelector('.tegi .circle-3');
  const circles = [circle1, circle2, circle3];

  // Элементы: фразы
  const label1 = document.querySelector('.tegi-label.label-1');
  const label2 = document.querySelector('.tegi-label.label-2');
  const label3 = document.querySelector('.tegi-label.label-3');
  const labels = [label1, label2, label3];

  // Проверка
  if (!img1 || !img2 || !img3 || !circle1 || !circle2 || !circle3 || !label1 || !label2 || !label3) {
    console.warn('tegi-slider: не найдены элементы');
    return;
  }

  // Функция: скрыть все изображения
  function hideAllImages() {
    [img1, img2, img3].forEach(img => {
      img.classList.remove('visible');
    });
  }

  // Функция: сбросить состояние — ВСЕ становятся НЕАКТИВНЫМИ
  function resetStates() {
    circles.forEach(circle => {
      circle.classList.add('inactive'); // ✅ Добавляем .inactive всем
    });
    labels.forEach(label => {
      label.classList.add('inactive');  // ✅ Все фразы — неактивные
      label.classList.remove('active'); // ✅ Убираем active
    });
  }

  // Функция: установить активный элемент
  function setActive(circle, label) {
    circle.classList.remove('inactive'); // ✅ Активный круг — не неактивный
    label.classList.remove('inactive');  // ✅ Активная фраза — не неактивная
    label.classList.add('active');       // ✅ Активная фраза
  }

  // Инициализация: активен первый круг
  hideAllImages();
  showImage(img1);
  resetStates(); // Сначала все неактивные
  setActive(circle1, label1); // Потом первый — активный

  // Обработчики кликов
  circle1?.addEventListener('click', e => {
    e.preventDefault();
    hideAllImages();
    showImage(img1);
    resetStates(); // Все → неактивные
    setActive(circle1, label1); // Один → активный
  });

  circle2?.addEventListener('click', e => {
    e.preventDefault();
    hideAllImages();
    showImage(img2);
    resetStates();
    setActive(circle2, label2);
  });

  circle3?.addEventListener('click', e => {
    e.preventDefault();
    hideAllImages();
    showImage(img3);
    resetStates();
    setActive(circle3, label3);
  });

  // Вспомогательная функция: показать изображение
  function showImage(img) {
    img.classList.add('visible');
  }
});