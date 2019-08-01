'use strict';
// Зависит от load.js и render.js
// sort module
// Сортировка фотографий
(function () {
  var imgFiltersElement = document.querySelector('.img-filters');
  var imgFiltersNewElement = document.querySelector('#filter-new');
  // Сортировка фотографий по новым
  var sortByNew = function () {
    // Для начала скопируем массив, чтобы его не деструктировать
    window.request.photos.slice(0, 10);
    console.log(window.request.photos);
  };

  imgFiltersNewElement.addEventListener('click', sortByNew);

  window.sort = {
    imgFiltersElement: imgFiltersElement
  };
})();
