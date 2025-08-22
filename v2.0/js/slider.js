// slider.js — Карусель для фраз и изображений

document.addEventListener('DOMContentLoaded', function () {
  // Элементы
  const text1 = document.querySelector('.pregnant-text.type1'); // "Для беременных"
  const text2 = document.querySelector('.pregnant-text.type2'); // "Для кормящих"
  const text3 = document.querySelector('.pregnant-text.type3'); // "Безопасные лакомства"

  const img1 = document.querySelector('.pregnant-img.img1'); // 1.png
  const img2 = document.querySelector('.pregnant-img.img2'); // 2.png
  const img3 = document.querySelector('.pregnant-img.img3'); // 3.png

  const btnPrev = document.querySelector('.carousel-btn.carousel-prev');
  const btnNext = document.querySelector('.carousel-btn.carousel-next');

  // Массив слайдов: [ { text, img }, ... ]
  const slides = [
    { text: text1, img: img1 },
    { text: text2, img: img2 },
    { text: text3, img: img3 }
  ];

  let currentIndex = 0;

  // Функция: скрыть все
  function hideAll() {
    slides.forEach(slide => {
      slide.text.style.opacity = '0';
      slide.text.style.visibility = 'hidden';
      slide.img.style.opacity = '0';
      slide.img.style.visibility = 'hidden';
    });
  }

  // Функция: показать слайд по индексу
  function showSlide(index) {
    const slide = slides[index];
    slide.text.style.opacity = '1';
    slide.text.style.visibility = 'visible';
    slide.img.style.opacity = '1';
    slide.img.style.visibility = 'visible';
  }

  // Инициализация
  hideAll();
  showSlide(currentIndex);

  // Обработчик: вперёд (→)
  btnNext.addEventListener('click', function (e) {
    e.preventDefault();
    hideAll();
    currentIndex = (currentIndex + 1) % slides.length; // Зацикливание вперёд
    showSlide(currentIndex);
  });

  // Обработчик: назад (←)
  btnPrev.addEventListener('click', function (e) {
    e.preventDefault();
    hideAll();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Зацикливание назад
    showSlide(currentIndex);
  });
});