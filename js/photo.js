'use strict';
// Зависит от comment.js и util.js
// Photo module
// Генерирует и вставляет фотографии
(function () {
  // Длина массива
  var PHOTOS_QUANTITY = 25;

  var photos = [];
  // Блок, куда вставить созданные элементы
  var picture = document.querySelector('.pictures');
  // Шаблон
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // var fillArray = function (arr) {
  //   for (var i = 0; i < PHOTOS_QUANTITY; i++) {
  //     var commentaries = window.comment.getArrayComments();
  //     arr[i] = {
  //       url: 'photos/' + (i + 1) + '.jpg',
  //       likes: window.util.getRandomInt(15, 200),
  //       comments: commentaries,
  //     };
  //   }
  // };
  // Создаем функцию для создания DOM-элементов
  var createPhotos = function (photo) {
    var elementPhoto = similarPhotoTemplate.cloneNode(true);
    elementPhoto.querySelector('.picture__img').src = photo.url;
    elementPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    elementPhoto.querySelector('.picture__likes').textContent = photo.likes;
    return elementPhoto;
  };
  // // Функция для создания фрагмента
  // var makeFragment = function (arr) {
  //   // Создаём фрагмент
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < arr.length; i++) {
  //     fragment.appendChild(createPhotos(arr[i]));
  //   }
  //   return fragment;
  // };
  // Создание массива
  // fillArray(photos);

  // Вставка созданных элементов в DOM
  // picture.appendChild(makeFragment(photos));

  // eslint-disable-next-line no-unused-vars,no-shadow
  var successHandler = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PHOTOS_QUANTITY; i++) {
      fragment.appendChild(createPhotos(photos[i]));
    }
    picture.appendChild(fragment);
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
})();
