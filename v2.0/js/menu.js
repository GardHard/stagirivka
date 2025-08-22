// menu.js — Скрипт бокового меню

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const sidebarClose = document.querySelector('.sidebar-close');
  const overlay = document.querySelector('.overlay');

  // Открыть меню
  function openMenu() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // запрещаем скролл
  }

  // Закрыть меню
  function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // возвращаем скролл
  }

  // Обработчики
  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (sidebarClose) sidebarClose.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
});