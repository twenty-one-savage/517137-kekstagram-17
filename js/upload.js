'use strict';
// upload module
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
