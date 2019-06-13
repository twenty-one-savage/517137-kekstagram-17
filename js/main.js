'use strict';

// Длина массива
var PHOTOS_QUANTITY = 25;

var photos = [];

// Шаблон
var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Блок, куда вставить созданные элементы
var picture = document.querySelector('.pictures');


var PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTO_NAMES = [
  'Юлия',
  'Виктория',
  'Антон',
  'Дамир',
  'Максим',
  'Лев',
  'Ева'
];

// Функция для нахождения случайного индекса массива
var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// Функция для нахождения случайного целого числа в интервале
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Определяем сколько будет комментариев 1 или 2
var getQuantityComments = function () {
  var quantityComments = getRandomInt(1, 2);
  return (quantityComments === 1) ? PHOTO_COMMENTS[getRandomIndex(PHOTO_COMMENTS)] : PHOTO_COMMENTS[getRandomIndex(PHOTO_COMMENTS)] + ' ' + PHOTO_COMMENTS[getRandomIndex(PHOTO_COMMENTS)]
};

// Cоздание массива с комментариями
var commentaries = [];
var COMMENTARIES_QUANTITY = getRandomInt(1, 5);
var getArrayComments = function (arr) {
  for (var i = 0; i < COMMENTARIES_QUANTITY; i++) {
    arr[i] = {
      comments: getQuantityComments()
    };
  }
};

getArrayComments(commentaries);
console.log(commentaries);
// Функция для наполнения массива
var fillArray = function (arr) {
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      // Не понял, что здесь должно отображаться
      comments: commentaries.length,
      name: PHOTO_NAMES[getRandomIndex(PHOTO_NAMES)]
    };
  }
};

fillArray(photos);
console.log(photos);

// Создаем функцию для создания DOM-элементов
var createPhotos = function (photo) {
  var elementPhoto = similarPhotoTemplate.cloneNode(true);
  elementPhoto.querySelector('.picture__img').src = photo.url;
  elementPhoto.querySelector('.picture__name').textContent = photo.name;
  elementPhoto.querySelector('.picture__comments').textContent = photo.comments;
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

// Вставка созданных элементов в DOM
picture.appendChild(makeFragment(photos));
