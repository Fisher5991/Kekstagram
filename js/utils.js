'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    generateNumber: function (minNumber, maxNumber) {
      return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
    },

    isEscEvent: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb.call(window.modal);
      }
    }
  }
})();
