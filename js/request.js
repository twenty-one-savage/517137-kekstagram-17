'use strict';
// Зависит от load.js,sort.js
// request module
// Модуль с ответами сервера Успех/Ошибка
(function () {
  var successHandler = function (data) {
    // Сохраняем пришедшие данные в массив
    window.request = {
      photos: data
    };
    // Показываем окно с фильтрами
    window.sort.imgFiltersElement.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.load(successHandler, errorHandler);
  // console.log(successHandler);
  // window.request = {
  //   photos: 'nhfkb'
  // };
})();
