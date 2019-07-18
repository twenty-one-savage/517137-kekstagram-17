'use strict';
// Утилитный модуль
// Содержит в себе утилитные значения
(function () {
  window.util = {
    ESC_KEYCODE: 27,
    // Функция для нахождения случайного целого числа в интервале
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  };
})();
