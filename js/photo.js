'use strict';
// Зависит от util.js
// Photo module
// Генерирует и вставляет фотографии
(function (newChild) {
  var picture = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = document.querySelector('.social__comments');
  var commentsCountElement = document.querySelector('.social__comment-count');
  var commentsLoaderElement = document.querySelector('.comments-loader');

  // Cоздание массива с комментариями
  var createComments = function (photo) {
    var commentField = document.createElement('li');
    commentField.classList.add('social__comment');
    var commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg'
    commentImg.alt = 'Аватар комментатора фотографии';
    var commentDescription = document.createElement('p');
    commentDescription.classList.add('social__text');
    commentDescription.textContent = photo.comments.message;
    commentField.appendChild(commentImg, commentDescription);
  };

  // Функция для вывода большого изображения
  var createBigPhoto = function (photo) {
    bigPictureElement.classList.remove('hidden');
    bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureElement.querySelector('.social__comments').textContent = createComments(photo);
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
  };

  var createPhotos = function (photo) {
    var elementPhoto = similarPhotoTemplate.cloneNode(true);
    elementPhoto.querySelector('.picture__img').src = photo.url;
    elementPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    elementPhoto.querySelector('.picture__likes').textContent = photo.likes;
    return elementPhoto;
  };

  var renderBigPhoto = function (photo) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createBigPhoto(photo));
    commentsElement.appendChild(fragment);
  };

  var renderPhotos = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(createPhotos(arr[i]));
    }
    picture.appendChild(fragment);
  };

  var addPhotoCallbacks = function (photo) {
    renderBigPhoto(photo);
  };

  window.photo = {
    renderPhotos: renderPhotos,
    addPhotoCallbacks: addPhotoCallbacks
  };
})();
