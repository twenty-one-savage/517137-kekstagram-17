'use strict';
// Зависит от util.js
// Модуль с комментариями
// Генерирует массив с комментариями
(function () {
  window.comment = {
    PHOTO_COMMENTS: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
    ],
    PHOTO_NAMES: [
      'Юлия',
      'Виктория',
      'Антон',
      'Дамир',
      'Максим',
      'Лев',
      'Ева'
    ],
    getQuantityComments: function () {
      var quantityComments = window.util.getRandomInt(1, 2);
      return (quantityComments === 1) ? window.comment.PHOTO_COMMENTS[window.util.getRandomInt(0, window.comment.PHOTO_COMMENTS.length)] : window.comment.PHOTO_COMMENTS[window.util.getRandomInt(0, window.comment.PHOTO_COMMENTS.length)] + ' ' + window.comment.PHOTO_COMMENTS[window.util.getRandomInt(0, window.comment.PHOTO_COMMENTS.length)];
    },
    getArrayComments: function () {
      var arr = [];
      var arrLength = window.util.getRandomInt(1, 5);
      for (var i = 0; i < arrLength; i++) {
        arr[i] = {
          avatar: 'img/avatar-' + (i + 1) + '.svg',
          message: window.comment.getQuantityComments(),
          name: window.comment.PHOTO_NAMES[window.util.getRandomInt(0, window.comment.PHOTO_NAMES.length)]
        };
      }
      return arr;
    }
  };
})();
