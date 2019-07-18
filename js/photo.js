'use strict';
// Зависит от comment.js и util.js
// Photo module
// Генерирует и вставляет фотографии
(function () {
  window.photo = {
    // Длина массива
    PHOTOS_QUANTITY: 25,
    photos: [],
    // Блок, куда вставить созданные элементы
    picture: document.querySelector('.pictures'),
    // Шаблон
    similarPhotoTemplate: document.querySelector('#picture').content.querySelector('.picture'),
    fillArray: function (arr) {
      for (var i = 0; i < window.photo.PHOTOS_QUANTITY; i++) {
        var commentaries = window.comment.getArrayComments();
        arr[i] = {
          url: 'photos/' + (i + 1) + '.jpg',
          likes: window.util.getRandomInt(15, 200),
          comments: commentaries,
        };
      }
    },
    // Создаем функцию для создания DOM-элементов
    createPhotos: function (photo) {
      var elementPhoto = window.photo.similarPhotoTemplate.cloneNode(true);
      elementPhoto.querySelector('.picture__img').src = photo.url;
      elementPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
      elementPhoto.querySelector('.picture__likes').textContent = photo.likes;
      return elementPhoto;
    },
    // Функция для создания фрагмента
    makeFragment: function (arr) {
      // Создаём фрагмент
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(window.photo.createPhotos(arr[i]));
      }
      return fragment;
    }
  };
  window.photo.fillArray(window.photo.photos);
  // Вставка созданных элементов в DOM
  window.photo.picture.appendChild(window.photo.makeFragment(window.photo.photos));
})();
