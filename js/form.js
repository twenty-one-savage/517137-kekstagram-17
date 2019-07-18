'use strict';
// Зависит от util.js
// Открытие и закрытии формы редактирования
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var editForm = document.querySelector('.img-upload__overlay');
  var closeIcon = document.querySelector('#upload-cancel');
  var commentField = document.querySelector('.text__description');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var effectLevelContainer = document.querySelector('.effect-level');

  window.form = {
    scaleControlValue: scaleControlValue
  };

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
    if (evt.keyCode === window.util.ESC_KEYCODE && document.activeElement !== commentField) {
      closeEditForm();
    }
    document.removeEventListener('keydown', editFormEscPressHandler());
  };

  uploadFile.addEventListener('change', function () {
    openEditForm();
    // Задаём масштаб картинки по умолчанию в 100%
    scaleControlValue.value = '100%';
    // setPinMaxPosition();
    // Скрываем блок с выбором интенсивности эффекта
    effectLevelContainer.classList.add('hidden');
    document.addEventListener('keydown', editFormEscPressHandler);
  });

  closeIcon.addEventListener('click', closeEditForm);

})();
