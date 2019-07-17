'use strict';

(function () {
  var uploadImageForm = document.querySelector('#upload-select-image');
  var resizeValueInput = uploadImageForm.querySelector('.resize__control--value');
  var imgUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
  var resizeMinusBtn = imgUploadOverlay.querySelector('.resize__control--minus');
  var resizePlusBtn = imgUploadOverlay.querySelector('.resize__control--plus');
  var adjustScale;
  var LimitationInput;

  var onResizeBtnClick = function (evt) {
    evt.preventDefault();

    if (evt.target === resizeMinusBtn) {
      var possibleValue = parseInt(resizeValueInput.value, 10) - LimitationInput.resizeValueInput.step * 100;
      if (possibleValue >= LimitationInput.resizeValueInput.min * 100) {
        adjustScale(possibleValue);
      }
    } else {
      var possibleValue = parseInt(resizeValueInput.value, 10) + LimitationInput.resizeValueInput.step * 100;
      if (possibleValue <= LimitationInput.resizeValueInput.max * 100) {
        adjustScale(possibleValue);
      }
    }
  }

  window.initializeScale = function (element, adjust, limitation) {
    if (limitation) {
      LimitationInput = limitation;
    }
    adjustScale = adjust;
    element.addEventListener('click', onResizeBtnClick);
  }
})();
