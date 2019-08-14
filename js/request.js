'use strict';
// Зависит от load.js,sort.js
// request module
// Модуль с ответами сервера Успех/Ошибка
(function () {
  var photos = [];
  var successHandler = function (data) {
    for (var i = 0; i < data.length; i++) {
      photos.push(data[i]);
    }
    // Отрисовка картинок
    window.photo.renderPhotos(photos);
    // Показываем окно с фильтрами
    window.sort.imgFiltersElement.classList.remove('img-filters--inactive');
    // Показываем отсортированные фотографии
    window.sort.addSortCallbacks();
    // Показываем большую фотографию
    window.photo.addPhotoCallbacks(photos[0]);
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
  // Сохраняем пришедшие данные в массив
  window.request = {
    photos: photos
  };
  window.load.dataFromServer(successHandler, errorHandler);
})();
