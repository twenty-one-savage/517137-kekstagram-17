'use strict';
// Зависит от util.js
// Photo module
// Генерирует и вставляет фотографии
(function () {
  var COMMENTS_COUNT = 5;
  var picture = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPictureElement = document.querySelector('.big-picture');
  var commentsElement = document.querySelector('.social__comments');
  var listComment = bigPictureElement.querySelector('.social__comments');
  var commentsCountElement = document.querySelector('.social__comment-count');
  var commentsLoaderElement = document.querySelector('.comments-loader');

  // Cоздание массива с комментариями
  var createComment = function (photo) {
    var commentField = document.createElement('li');
    commentField.classList.add('social__comment');
    var commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = 'img/avatar-' + window.util.getRandomInt(1, 6) + '.svg';
    commentImg.alt = 'Аватар комментатора фотографии';
    commentImg.width = 35;
    commentImg.height = 35;
    commentField.appendChild(commentImg);
    var commentDescription = document.createElement('p');
    commentDescription.classList.add('social__text');
    commentDescription.textContent = photo.message;
    commentField.appendChild(commentDescription);
    return commentField;
  };

  // Функция для вывода большого изображения
  var createBigPhoto = function (photo) {
    bigPictureElement.classList.remove('hidden');
    bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
    renderComments(photo.comments);
    commentsCountElement.classList.add('visually-hidden');
    commentsLoaderElement.classList.add('visually-hidden');
  };

  var renderComments = function (comments) {
    listComment.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COMMENTS_COUNT; i++) {
      var comment = createComment(comments[i]);
      fragment.appendChild(comment);
    }
    listComment.appendChild(fragment);
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
