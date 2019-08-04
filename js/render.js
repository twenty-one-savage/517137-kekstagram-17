'use strict';
// Photo module
// Генерирует и вставляет фотографии
(function () {
  // Блок, куда вставить созданные элементы
  var picture = document.querySelector('.pictures');
  // Шаблон
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  // Создаем функцию для создания DOM-элементов
  var createPhotos = function (photo) {
    var elementPhoto = similarPhotoTemplate.cloneNode(true);
    elementPhoto.querySelector('.picture__img').src = photo.url;
    elementPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    elementPhoto.querySelector('.picture__likes').textContent = photo.likes;
    return elementPhoto;
  };
  // Функция для создания фрагмента
  var makeFragment = function (arr) {
    // Создаём фрагмент
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(createPhotos(arr[i]));
    }
    return fragment;
  };

  window.render = function (data) {
    // Вставка созданных элементов в DOM
    picture.appendChild(makeFragment(data));
  };

})();
