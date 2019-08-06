'use strict';
// Зависит от form.js и preview.js
// Применение фильтров и изменеие интенсивности
(function () {
  var chromeFilter = 'effects__preview--chrome';
  var sepiaFilter = 'effects__preview--sepia';
  var marvinFilter = 'effects__preview--marvin';
  var phobosFilter = 'effects__preview--phobos';
  var heatFilter = 'effects__preview--heat';
  var intensityPin = document.querySelector('.effect-level__pin');
  var intensityLine = document.querySelector('.effect-level__line');
  var intensityDepth = document.querySelector('.effect-level__depth');
  var inputIntensity = document.querySelector('.effect-level__value');
  var effectLevelContainer = document.querySelector('.effect-level');
  var effectItems = document.querySelectorAll('.effects__radio');

  // form module
  // Устанавливаем Пин и шкалу в максимальное положение
  var setPinMaxPosition = function () {
    intensityPin.style.left = 100 + '%';
    intensityDepth.style.width = intensityPin.style.left;
  };

  // Функция для применения фильтра
  var setEffect = function (effect) {
    // Сбрасываем класс  (когда переключаемся с фильтра на фильтр, чтобы фильтры не накладывались друг на друга)
    window.preview.imagePreview.className = 'img-upload__preview';
    // Ставим ползунок в максимальное положение
    setPinMaxPosition();
    // При переключении сбрасываем фильтр
    window.preview.imagePreview.style.filter = '';
    window.preview.imagePreview.classList.add('effects__preview--' + effect);
  };

  // По клику на эффект применяем его к основной картинке
  for (var i = 0; i < effectItems.length; i++) {
    effectItems[i].addEventListener('click', function () {
      // eslint-disable-next-line no-invalid-this
      setEffect(this.value);
      // Показываем блок со шкалой, когда выбран эффект
      // eslint-disable-next-line no-invalid-this
      this.value !== 'none' ? effectLevelContainer.classList.remove('hidden') : effectLevelContainer.classList.add('hidden');
    });
  }

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
    // eslint-disable-next-line no-shadow
    for (var i = 0; i <= window.preview.imagePreview.classList.contains.length; i++) {
      switch (window.preview.imagePreview.classList[i]) {
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
    }
    return imageFilterIntensity;
  };

  // Перемщение пина
  // обработаем событие начала перетаскивания нашего пина mousedown.
  intensityPin.addEventListener('mousedown', function () {
    var onMouseMove = function (moveEvt) {
      // var coordinate = function (x) {
      //   this.x = moveEvt.clientX;
      // }
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
      window.preview.imagePreview.style.filter = getFilterIntensity(intensityLine, intensityPin);
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

})();
