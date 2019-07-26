'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var SUCCESS_STATUS = 200;

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Нет интернет-соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Сервер не успел обработать запрос за' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000;

    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    upload: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    },

    getJSONP: function (cbName) {
      var scriptLoader = document.createElement('script');
      scriptLoader.src = URL + '/data?callback=' + cbName;
      document.body.appendChild(scriptLoader);
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  }
})();
