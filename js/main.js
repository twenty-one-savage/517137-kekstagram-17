'use strict';

// Длина массива
var PHOTOS_LENGTH = 25;

var photos = [];

// Шаблон
var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Блок, куда вставить созданные элементы
var picture = document.querySelector('.picture');


var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var names = [
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

// Функция для наполнения массива
var fillArray = function (arr) {
  for (var i = 0; i < PHOTOS_LENGTH; i++) {
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      comments: comments[getRandomIndex(comments)],
      name: names[getRandomIndex(names)]
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
  // element.querySelector('.picture__comments').textContent = photo.comments;
  // element.querySelector('.picture__likes').textContent = photo.likes;
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
