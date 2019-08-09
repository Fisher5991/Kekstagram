'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var lastTimeout;

  window.utils = {
    generateNumber: function (minNumber, maxNumber) {
      return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
    },

    isEscEvent: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb.call(window.modal);
      }
    },

    randomizeArray: function (arr) {
      var currentIndex = arr.length;
      var temporaryValue;
      var randomIndex;

      while (currentIndex !== 0) {
        currentIndex -= 1;
        randomIndex = window.utils.generateNumber(0, currentIndex);

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
      }

      return arr;
    },

    removeElements: function (elements) {
      [].forEach.call(elements, function (it) {
        it.remove();
      });
    },

    stopDebounce: function (cb, time, arg) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        cb(arg);
      }, time);
    }
  }
})();
