'use strict';
// Зависит от util.js
// Photo module
// Генерирует и вставляет фотографии
(function () {
  var picture = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  // var bigPictureElement = document.querySelector('.big-picture');

  // Шаблон комментария
  // var commentsTemplate = document.querySelector('.social__comment');
  // // Cоздание массива с комментариями
  // var getComments = function (photos) {
  //   var el = commentsTemplate.cloneNode(true);
  //   el.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
  //   el.querySelector('.social__picture').alt = 'Аватар комментатора фотографии';
  //   el.querySelector('.social__text').textContent = photos.comments;
  //   return el;
  // };

  // var renderBigPhoto = function (photos) {
  //   var first = photos[0];
  //   bigPictureElement.querySelector('.big-picture__img img').src = first.url;
  //   bigPictureElement.querySelector('.likes-count').textContent = first.likes;
  //   bigPictureElement.querySelector('.comments-count').textContent = first.comments.length;
  //   bigPictureElement.querySelector('.social__comments').textContent = getComments(photos);
  //   bigPictureElement.querySelector('.social__caption').textContent = first.description;
  // };

  var renderPhotos = function (photo) {
    var elementPhoto = similarPhotoTemplate.cloneNode(true);
    elementPhoto.querySelector('.picture__img').src = photo.url;
    elementPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    elementPhoto.querySelector('.picture__likes').textContent = photo.likes;
    return elementPhoto;
  };

  var makeFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPhotos(arr[i]));
    }
    picture.appendChild(fragment);
  };

  window.photo = function (arr) {
    makeFragment(arr);
  };
})();
