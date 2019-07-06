'use strict';

// Длина массива
var PHOTOS_QUANTITY = 25;

var SIZE_STEP = 25;
var ESC_KEYCODE = 27;

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
var editForm = document.querySelector('.img-upload__overlay');
var chromeFilter = 'effects__preview--chrome';
var sepiaFilter = 'effects__preview--sepia';
var marvinFilter = 'effects__preview--marvin';
var phobosFilter = 'effects__preview--phobos';
var heatFilter = 'effects__preview--heat';
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imagePreview = document.querySelector('.img-upload__preview');
var intensityPin = document.querySelector('.effect-level__pin');
var intensityLine = document.querySelector('.effect-level__line');
var intensityDepth = document.querySelector('.effect-level__depth');
var inputIntensity = document.querySelector('.effect-level__value');
var effectLevelContainer = document.querySelector('.effect-level');
var closeIcon = document.querySelector('#upload-cancel');
var effectItems = document.querySelectorAll('.effects__radio');
var commentField = document.querySelector('.text__description');

// Функция для показа editForm
var openEditForm = function () {
  editForm.classList.remove('hidden');
};

// Функция для закрытия editForm
var closeEditForm = function () {
  editForm.classList.add('hidden');
};

// Функция для закрытия editForm по нажатию ESC на всей странице
var editFormEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && document.activeElement !== commentField) {
    closeEditForm();
  }
};

// Обработчик, который реагирует на изменение значения поля uploadFile
uploadFile.addEventListener('change', function () {
  openEditForm();
  setPinMaxPosition();
  // Задаём масштаб картинки по умолчанию в 100%
  scaleControlValue.value = '100%';
  // Скрываем блок с выбором интенсивности эффекта
  effectLevelContainer.classList.add('hidden');
  document.addEventListener('keydown', editFormEscPressHandler);
});

closeIcon.addEventListener('click', closeEditForm);

// Устанавливаем Пин и шкалу в максимальное положение
var setPinMaxPosition = function () {
  intensityPin.style.left = 100 + '%';
  intensityDepth.style.width = intensityPin.style.left;
};

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

// Обработчик на нажатие знака -
scaleControlSmaller.addEventListener('click', function () {
  increaseSizePhoto();
});

// Обработчик на нажатие знака +
scaleControlBigger.addEventListener('click', function () {
  reduceSizePhoto();
});

// По клику на эффект применяем его к основной картинке
for (var i = 0; i < effectItems.length; i++) {
  effectItems[i].addEventListener('click', function () {
    setEffect(this.value);
    // Показываем блок со шкалой, когда выбран эффект
    this.value !== 'none' ? effectLevelContainer.classList.remove('hidden') : effectLevelContainer.classList.add('hidden');
  });
}
// Функция для применения фильтра
var setEffect = function (effect) {
  // Сбрасываем класс  (когда переключаемся с фильтра на фильтр, чтобы фильтры не накладывались друг на друга)
  imagePreview.className = 'img-upload__preview';
  // Ставим ползунок в максимальное положение
  setPinMaxPosition();
  // При переключении сбрасываем фильтр
  imagePreview.style.filter = '';
  imagePreview.classList.add('effects__preview--' + effect);
};

// Заводим функцию, в которой, находим насыщенность фильтра
var getFilterIntensity = function (line, pin) {
  // Заводим переменную, в которой будет храниться наыщенность эффекта
  var imageFilterIntensity;
  // Найдём процент положения пина относительно всего отрезка
  var percent = Math.floor(((pin.getBoundingClientRect().x + pin.offsetWidth / 2) - line.getBoundingClientRect().x) / (line.offsetWidth / 100));
  // Записываем уровень интенсивности в инпут
  inputIntensity.value = percent;
  // Проверка, если картинка содержит следующий класс, то фильтр будет следующим...
  // Не знаю как поступить иначе, понимаю, что условие очень хрупкое
  switch (imagePreview.classList[1]) {
    case chromeFilter:
      imageFilterIntensity = 'grayscale(' + parseFloat(percent / 100).toFixed(2) + ')';
      break;
    case sepiaFilter:
      imageFilterIntensity = 'sepia(' + parseFloat(percent / 100).toFixed(2) + ')';
      break;
    case marvinFilter:
      imageFilterIntensity = 'invert(' + parseFloat(percent).toFixed(2) + '%' + ')';
      break;
    case phobosFilter:
      imageFilterIntensity = 'blur(' + parseFloat(3 / 100 * percent).toFixed(2) + 'px' + ')';
      break;
    case heatFilter:
      imageFilterIntensity = 'brightness(' + parseFloat(1 + (2 / 100 * percent)).toFixed(2) + ')';
      break;
  }
  return imageFilterIntensity;
};

// Перемщение пина
// обработаем событие начала перетаскивания нашего пина mousedown.
intensityPin.addEventListener('mousedown', function () {
  var onMouseMove = function (moveEvt) {
    var shift = {
      x: moveEvt.clientX
    };

    //  Определяем левый край
    var leftEdge = shift.x - intensityLine.getBoundingClientRect().left;
    if (leftEdge < 0) {
      leftEdge = 0;
    }
    // Определяем правый край
    var rightEdge = intensityLine.offsetWidth;
    if (leftEdge > rightEdge) {
      leftEdge = rightEdge;
    }

    intensityPin.style.left = leftEdge + 'px';
    // Перемещение шкалы вместе с пином
    intensityDepth.style.width = intensityPin.style.left;
    // Применение css к редактируемой картинке
    imagePreview.style.filter = getFilterIntensity(intensityLine, intensityPin);
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // Добавим обработчики события передвижения мыши и отпускания кнопки мыши.
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
