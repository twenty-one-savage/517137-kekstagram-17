'use strict';

// Длина массива
var PHOTOS_QUANTITY = 25;
var SIZE_STEP = 25;

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

// Функция для нахождения случайного целого числа в интервале
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// Определяем сколько будет комментариев 1 или 2
var getQuantityComments = function () {
  var quantityComments = getRandomInt(1, 2);
  return (quantityComments === 1) ? PHOTO_COMMENTS[getRandomInt(0, PHOTO_COMMENTS.length)] : PHOTO_COMMENTS[getRandomInt(0, PHOTO_COMMENTS.length)] + ' ' + PHOTO_COMMENTS[getRandomInt(0, PHOTO_COMMENTS.length)];
};

// Cоздание массива с комментариями
var getArrayComments = function () {
  var arr = [];
  var arrLength = getRandomInt(1, 5);
  for (var i = 0; i < arrLength; i++) {
    arr[i] = {
      avatar: 'img/avatar-' + (i + 1) + '.svg',
      message: getQuantityComments(),
      name: PHOTO_NAMES[getRandomInt(0, PHOTO_NAMES.length)]
    };
  }
  return arr;
};

// Функция для наполнения массива
var fillArray = function (arr) {
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    var commentaries = getArrayComments();
    arr[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(15, 200),
      comments: commentaries,
    };
  }
};

fillArray(photos);

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

// Вставка созданных элементов в DOM
picture.appendChild(makeFragment(photos));

// module4-task1

var uploadFile = document.querySelector('#upload-file');
var closeIcon = document.querySelector('#upload-cancel');
var editForm = document.querySelector('.img-upload__overlay');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imagePreview = document.querySelector('.img-upload__preview');
var intensityPin = document.querySelector('.effect-level__pin');
var inputIntensity = document.querySelector('.effect-level__value');
var effectLevelBar = document.querySelector('.effect-level');

var openEditForm = function () {
  editForm.classList.remove('hidden');
  document.addEventListener('keydown', editFormEscPressHandler);
  // Устанавливаем значение в 100 (Оно должно быть по умолчанию)
  scaleControlValue.value = '100%';
  // Пин должен быть в коцне полосы
  // Так не работает
  // inputIntensity.value = 100;
};

// Открываем форму редактирования при загрузке фотографии
uploadFile.addEventListener('change', function () {
  openEditForm();
  // Здесь нужно удалить обработчик change???
});

var closeEditForm = function () {
  editForm.classList.add('hidden');
  document.removeEventListener('keydown', editFormEscPressHandler);
  // Сбрасываем значение поля
  uploadFile.value = '';
};

var editFormEscPressHandler = function (evt) {
  if (evt.keyCode === 27) {
    closeEditForm();
  }
};

closeIcon.addEventListener('click', function () {
  closeEditForm();
});

// Получаем текущий масштаб картинки
var getCurrentSize = function () {
  return parseInt(scaleControlValue.value, 10);
};

// Увеличиваем масштаб картинки
var increaseSizePhoto = function () {
  var currentSize = getCurrentSize();
  if (currentSize > 25) {
    currentSize -= SIZE_STEP;
    scaleControlValue.value = currentSize + '%';
    imagePreview.style.transform = 'scale(' + currentSize / 100 + ')';
  }
};

// Уменьшаем масштаб картинки
var reduceSizePhoto = function () {
  var currentSize = getCurrentSize();
  if (currentSize < 100) {
    currentSize += SIZE_STEP;
    scaleControlValue.value = currentSize + '%';
    imagePreview.style.transform = 'scale(' + currentSize / 100 + ')';
  }
};

// Обработчик на нажатие -
scaleControlSmaller.addEventListener('click', function () {
  increaseSizePhoto();
});

// Обработчик на нажатие +
scaleControlBigger.addEventListener('click', function () {
  reduceSizePhoto();
});

// Применение фильтров (Делегирование)

// Находим общий контейнер
var containerEffects = document.querySelector('.effects__list');

// Фильтры
var defaultFilter = document.querySelector('#none');
var chromeFilter = document.querySelector('#effect-chrome');
var sepiaFilter = document.querySelector('#effect-sepia');
var marvinFilter = document.querySelector('#effect-marvin');
var phobosFilter = document.querySelector('#effect-phobos');
var heatFilter = document.querySelector('#effect-heat');

// Полуачем нужный модификатор
var getImageModificator = function (target) {
  var imageModificator;
  switch (target) {
    case defaultFilter:
      imageModificator = '--none';
      break;
    case chromeFilter:
      imageModificator = '--chrome';
      break;
    case sepiaFilter:
      imageModificator = '--sepia';
      break;
    case marvinFilter:
      imageModificator = '--marvin';
      break;
    case phobosFilter:
      imageModificator = '--phobos';
      break;
    case heatFilter:
      imageModificator = '--heat';
      break;
  }
  return imageModificator;
};

// Функция для применения фильтра
var getCurrentEffect = function (evt) {
  var target = evt.target;
  imagePreview.className = 'img-upload__preview';
  var imageModificator = getImageModificator(target);
  imagePreview.classList.add('effects__preview' + imageModificator);
};

containerEffects.addEventListener('click', getCurrentEffect);

// Примение насыщенности

var getRightIntensity = function (min, max) {
  return (max / 5);
};
// Заводим функцию, в которой, находим насыщенность фильтра
var getFilterIntensity = function () {
  // Заводим переменную, в которой будет храниться наыщенность эффекта
  var imageFilterIntensity;
  // Проверка, если картинка содержит следующий класс, то насыщенность будет такая..
  switch (imagePreview.classList.contains) {
    case 'effects__preview--chrome' :
      imageFilterIntensity = 'grayscale(' + getRightIntensity(0, 1) + ')';
      break;
    case 'effects__preview--sepia' :
      imageFilterIntensity = 'sepia(' + getRightIntensity(0, 1) + ')';
      break;
    case 'effects__preview--marvin' :
      imageFilterIntensity = 'invert(' + getRightIntensity(0, 100) + '%' + ')';
      break;
    case 'effects__preview--phobos' :
      imageFilterIntensity = 'blur(' + getRightIntensity(0, 3) + 'px' + ')';
      break;
    case 'effects__preview--heat' :
      imageFilterIntensity = 'brightness(' + getRightIntensity(0, 3) + ')';
      break;
  }
  return imageFilterIntensity;
};

// Обработчик, на отпускание пина, мы заводим функцию, которая нам поставит нужную насыщенность фильтра
intensityPin.addEventListener('mouseup', function () {
  imagePreview.style.filter = getFilterIntensity();
  inputIntensity = getRightIntensity;
});
