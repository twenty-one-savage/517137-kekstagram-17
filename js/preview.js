'use strict';
// Зависит от form.js
// preview.js
// Меняем размеры картинки по нажатию на кнопки
(function () {
  var SIZE_STEP = 25;
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var imagePreview = document.querySelector('.img-upload__preview');

  window.preview = {
    imagePreview: imagePreview
  };

  // Получаем текущий масштаб картинки
  var getCurrentSize = function () {
    return parseInt(window.form.scaleControlValue.value, 10);
  };

  // Увеличиваем масштаб картинки
  var increaseSizePhoto = function () {
    var currentSize = getCurrentSize();
    if (currentSize > 25) {
      currentSize -= SIZE_STEP;
      window.form.scaleControlValue.value = currentSize + '%';
      imagePreview.style.transform = 'scale(' + currentSize / 100 + ')';
    }
  };

  // Уменьшаем масштаб картинки
  var reduceSizePhoto = function () {
    var currentSize = getCurrentSize();
    if (currentSize < 100) {
      currentSize += SIZE_STEP;
      window.form.scaleControlValue.value = currentSize + '%';
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

})();
