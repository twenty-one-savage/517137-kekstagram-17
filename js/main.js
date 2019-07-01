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

// 1.2. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file,
// который стилизован под букву «О» в логотипе.
// После выбора изображения (изменения значения поля #upload-file),
// показывается форма редактирования изображения.
var uploadFile = document.querySelector('#upload-file');
var editForm = document.querySelector('.img-upload__overlay');

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
  if (evt.keyCode === 27) {
    closeEditForm();
  }
};

// Обработчик, который реагирует на изменение значения поля uploadFile
uploadFile.addEventListener('change', function () {
  // Показываем editForm
  openEditForm();
  // Добавляем обработчик, который по нажатию клавиши ESC закрывает окно
  document.addEventListener('keydown', editFormEscPressHandler);
});

// 1.3 Закрытие формы редактирования изображения производится либо
// нажатием на кнопку #upload-cancel, либо нажатием клавиши Esc.
var closeIcon = document.querySelector('#upload-cancel');

// Обработчик, который закрывает окно по клику на closeIcon
closeIcon.addEventListener('click', closeEditForm);

// При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imagePreview = document.querySelector('.img-upload__preview');

// Задаём масштаб картинки по умолчанию в 100%
scaleControlValue.value = '100%';

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

// При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
// добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту.
// Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.

// Контейнер для эффектов, на который будем добавлять обработчик (Делегирование обработчиков)
var containerEffects = document.querySelector('.effects__list');

// Инпуты с фильтрами
var inputDefaultFilter = document.querySelector('#none');
var inputChromeFilter = document.querySelector('#effect-chrome');
var inputSepiaFilter = document.querySelector('#effect-sepia');
var inputMarvinFilter = document.querySelector('#effect-marvin');
var inputPhobosFilter = document.querySelector('#effect-phobos');
var inputHeatFilter = document.querySelector('#effect-heat');

// Классы фильтров
var defaultFilter = document.querySelector('effects__preview--none');
var chromeFilter = document.querySelector('effects__preview--chrome');
var sepiaFilter = document.querySelector('effects__preview--sepia');
var marvinFilter = document.querySelector('effects__preview--marvin');
var phobosFilter = document.querySelector('effects__preview--phobos');
var heatFilter = document.querySelector('effects__preview--heat');

// Функция для получения нужного модификатора
var getImageModificator = function (target) {
  var imageModificator;
  switch (target) {
    case inputDefaultFilter:
      imageModificator = '--none';
      break;
    case inputChromeFilter:
      imageModificator = '--chrome';
      break;
    case inputSepiaFilter:
      imageModificator = '--sepia';
      break;
    case inputMarvinFilter:
      imageModificator = '--marvin';
      break;
    case inputPhobosFilter:
      imageModificator = '--phobos';
      break;
    case inputHeatFilter:
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

var getRightIntensity = function (elementWidth, max) {
  return elementWidth.offsetWidth / max;
};

// Заводим функцию, в которой, находим насыщенность фильтра
var getFilterIntensity = function () {
  // Заводим переменную, в которой будет храниться наыщенность эффекта
  var imageFilterIntensity;
  // Проверка, если картинка содержит следующий класс, то фильтр будет следующим...
  switch (imagePreview.classList.contains) {
    case chromeFilter :
      imageFilterIntensity = 'grayscale(' + getRightIntensity(intensityDepth, 1) + ')';
      break;
    case sepiaFilter :
      imageFilterIntensity = 'sepia(' + getRightIntensity(intensityDepth, 1) + ')';
      break;
    case marvinFilter :
      imageFilterIntensity = 'invert(' + getRightIntensity(intensityDepth, 100) + '%' + ')';
      break;
    case phobosFilter :
      imageFilterIntensity = 'blur(' + getRightIntensity(intensityDepth, 3) + 'px' + ')';
      break;
    case heatFilter :
      imageFilterIntensity = 'brightness(' + getRightIntensity(intensityDepth, 3) + ')';
      break;
  }
  return imageFilterIntensity;
};

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

};

// Перемщение пина
// Находим элемент, который будем перемещать
var intensityPin = document.querySelector('.effect-level__pin');
var intensityDepth = document.querySelector('.effect-level__depth');
var inputIntensity = document.querySelector('.effect-level__value');

// Находим контейнер для пина (Родительский элемент)
var effectLine = intensityPin.parentElement;
// обработаем событие начала перетаскивания нашего пина mousedown.
intensityPin.addEventListener('mousedown', function (evt) {
  // Отменяем дейсвтие по умолчанию, хотя в данном случае этого можно и не делать
  evt.preventDefault();
  // Запомним координаты точки, с которой мы начали перемещать пин.
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  // Находим координаты контейнера, в котором двигается пин
  var sliderCoords = getCoords(effectLine);
  // При каждом движении мыши нам нужно обновлять смещение относительно первоначальной точки, чтобы диалог смещался на необходимую величину.
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    var leftEdge = moveEvt.clientX - shift.x - sliderCoords.left;
    if (leftEdge < 0) {
      leftEdge = 0;
    }
    // Переменная для правого края, то есть за эту координату наш пин не сможет двигаться
    var rightEdge = effectLine.offsetWidth - (intensityPin.offsetWidth / 2);
    if (leftEdge > rightEdge) {
      leftEdge = rightEdge;
    }
    intensityPin.style.left = leftEdge + 'px';
    // Перемещение шкалы вместе с пином
    intensityDepth.style.width = leftEdge + 'px';
    // Применение css к редактируемой картинке
    imagePreview.style.filter = getFilterIntensity();
    // Запись значения фильтра в инпут
    inputIntensity.value = getFilterIntensity();
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


// Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .effect-level__value.
// При изменении уровня интенсивности эффекта, CSS-стили элемента .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1);
// Для эффекта «Сепия» — filter: sepia(0..1);
// Для эффекта «Марвин» — filter: invert(0..100%);
// Для эффекта «Фобос» — filter: blur(0..3px);
// Для эффекта «Зной» — filter: brightness(1..3).


// var uploadFile = document.querySelector('#upload-file');
// var closeIcon = document.querySelector('#upload-cancel');
// var editForm = document.querySelector('.img-upload__overlay');
// var scaleControlSmaller = document.querySelector('.scale__control--smaller');
// var scaleControlBigger = document.querySelector('.scale__control--bigger');
// var scaleControlValue = document.querySelector('.scale__control--value');
// var imagePreview = document.querySelector('.img-upload__preview');
// var intensityPin = document.querySelector('.effect-level__pin');
// var inputIntensity = document.querySelector('.effect-level__value');
// var effectLevelBar = document.querySelector('.effect-level');
//
// var openEditForm = function () {
//   editForm.classList.remove('hidden');
//   document.addEventListener('keydown', editFormEscPressHandler);
//   // Устанавливаем значение в 100 (Оно должно быть по умолчанию)
//   scaleControlValue.value = '100%';
//   // Пин должен быть в коцне полосы
//   // Так не работает
//   // inputIntensity.value = 100;
// };
//
// // Открываем форму редактирования при загрузке фотографии
// uploadFile.addEventListener('change', function () {
//   openEditForm();
//   // Здесь нужно удалить обработчик change???
// });
//
// var closeEditForm = function () {
//   editForm.classList.add('hidden');
//   document.removeEventListener('keydown', editFormEscPressHandler);
//   // Сбрасываем значение поля
//   uploadFile.value = '';
// };
//
// var editFormEscPressHandler = function (evt) {
//   if (evt.keyCode === 27) {
//     closeEditForm();
//   }
// };
//
// closeIcon.addEventListener('click', function () {
//   closeEditForm();
// });
//
// // Получаем текущий масштаб картинки
// var getCurrentSize = function () {
//   return parseInt(scaleControlValue.value, 10);
// };
//
// // Увеличиваем масштаб картинки
// var increaseSizePhoto = function () {
//   var currentSize = getCurrentSize();
//   if (currentSize > 25) {
//     currentSize -= SIZE_STEP;
//     scaleControlValue.value = currentSize + '%';
//     imagePreview.style.transform = 'scale(' + currentSize / 100 + ')';
//   }
// };
//
// // Уменьшаем масштаб картинки
// var reduceSizePhoto = function () {
//   var currentSize = getCurrentSize();
//   if (currentSize < 100) {
//     currentSize += SIZE_STEP;
//     scaleControlValue.value = currentSize + '%';
//     imagePreview.style.transform = 'scale(' + currentSize / 100 + ')';
//   }
// };
//
// // Обработчик на нажатие -
// scaleControlSmaller.addEventListener('click', function () {
//   increaseSizePhoto();
// });
//
// // Обработчик на нажатие +
// scaleControlBigger.addEventListener('click', function () {
//   reduceSizePhoto();
// });
//
// // Применение фильтров (Делегирование)
//
// // Находим общий контейнер
// var containerEffects = document.querySelector('.effects__list');
//
// // Фильтры
// var defaultFilter = document.querySelector('#none');
// var chromeFilter = document.querySelector('#effect-chrome');
// var sepiaFilter = document.querySelector('#effect-sepia');
// var marvinFilter = document.querySelector('#effect-marvin');
// var phobosFilter = document.querySelector('#effect-phobos');
// var heatFilter = document.querySelector('#effect-heat');
//
// // Полуачем нужный модификатор
// var getImageModificator = function (target) {
//   var imageModificator;
//   switch (target) {
//     case defaultFilter:
//       imageModificator = '--none';
//       break;
//     case chromeFilter:
//       imageModificator = '--chrome';
//       break;
//     case sepiaFilter:
//       imageModificator = '--sepia';
//       break;
//     case marvinFilter:
//       imageModificator = '--marvin';
//       break;
//     case phobosFilter:
//       imageModificator = '--phobos';
//       break;
//     case heatFilter:
//       imageModificator = '--heat';
//       break;
//   }
//   return imageModificator;
// };
//
// // Функция для применения фильтра
// var getCurrentEffect = function (evt) {
//   var target = evt.target;
//   imagePreview.className = 'img-upload__preview';
//   var imageModificator = getImageModificator(target);
//   imagePreview.classList.add('effects__preview' + imageModificator);
// };
//
// containerEffects.addEventListener('click', getCurrentEffect);
//
// // Примение насыщенности
//
// var getRightIntensity = function (min, max) {
//   return (max / 5);
// };
// // Заводим функцию, в которой, находим насыщенность фильтра
// var getFilterIntensity = function () {
//   // Заводим переменную, в которой будет храниться наыщенность эффекта
//   var imageFilterIntensity;
//   // Проверка, если картинка содержит следующий класс, то насыщенность будет такая..
//   switch (imagePreview.classList.contains) {
//     case 'effects__preview--chrome' :
//       imageFilterIntensity = 'grayscale(' + getRightIntensity(0, 1) + ')';
//       break;
//     case 'effects__preview--sepia' :
//       imageFilterIntensity = 'sepia(' + getRightIntensity(0, 1) + ')';
//       break;
//     case 'effects__preview--marvin' :
//       imageFilterIntensity = 'invert(' + getRightIntensity(0, 100) + '%' + ')';
//       break;
//     case 'effects__preview--phobos' :
//       imageFilterIntensity = 'blur(' + getRightIntensity(0, 3) + 'px' + ')';
//       break;
//     case 'effects__preview--heat' :
//       imageFilterIntensity = 'brightness(' + getRightIntensity(0, 3) + ')';
//       break;
//   }
//   return imageFilterIntensity;
// };
//
// // Обработчик, на отпускание пина, мы заводим функцию, которая нам поставит нужную насыщенность фильтра
// intensityPin.addEventListener('mouseup', function () {
//   imagePreview.style.filter = getFilterIntensity();
//   inputIntensity = getRightIntensity;
// });
