'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000; // ms

  var dataFromServer = function(onSuccess, onError) {
    createRequest('GET', URL, onSuccess, onError);
  };

  var createRequest = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };
  window.load = {
    dataFromServer: dataFromServer
  };
})();
