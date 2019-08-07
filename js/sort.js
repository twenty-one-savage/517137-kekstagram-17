'use strict';
// Зависит от load.js
// sort module
// Сортировка фотографий
(function () {
  var imgFiltersElement = document.querySelector('.img-filters');
  var imgFiltersPopularElement = document.querySelector('#filter-popular');
  var imgFiltersNewElement = document.querySelector('#filter-new');
  var imgFiltersDiscussedElement = document.querySelector('#filter-discussed');

  var sortByPopular = function () {
    delPhoto();
    var arr = window.request.photos;
    window.photo(arr);
  };

  // Сортировка фотографий по новым
  var sortByNew = function () {
    delPhoto();
    var arr = window.request.photos.slice();

    var getRandomPhotos = function () {
      return 0.5 - Math.random();
    };

    arr.sort(getRandomPhotos);
    var newArr = arr.slice(0, 10);
    window.photo(newArr);
  };

  // Функция для отображения обсуждаемых фото
  var sortByDiscussed = function () {
    delPhoto();
    var arr = window.request.photos.slice();
    arr.sort(function (x, y) {
      return x.comments.length - y.comments.length;
    }).reverse();
    window.photo(arr);
  };

  var delPhoto = function () {
    var allPhotosElement = Array.from(document.querySelectorAll('.picture'));
    allPhotosElement.forEach(function (it) {
      it.style.display = 'none';
    });
  };

  // sortByPopular = window.debounce(sortByPopular);
  // sortByNew = window.debounce(sortByNew);
  // sortByDiscussed = window.debounce(sortByDiscussed);

  var addSortCallbacks = function () {
    imgFiltersPopularElement.addEventListener('click', sortByPopular);
    imgFiltersNewElement.addEventListener('click', sortByNew);
    imgFiltersDiscussedElement.addEventListener('click', sortByDiscussed);
  }

  window.sort = {
    imgFiltersElement: imgFiltersElement,
    addSortCallbacks: addSortCallbacks
  };
})();
