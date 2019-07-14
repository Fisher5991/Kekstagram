'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var closePhotoBtn = bigPicture.querySelector('.big-picture__cancel');

  var onClosePhotoBtnClick = function (evt) {
    evt.preventDefault();
    window.modal.close();
  }

  var onPhotoClick = function (evt) {
    evt.preventDefault();
    window.modal.show(evt);
  }

  window.preview = {
    addBigImageOpenHandler: function (photoElement) {
      photoElement.addEventListener('click', onPhotoClick);
    },

    addBigImageCloseHandler: function () {
      closePhotoBtn.addEventListener('click', onClosePhotoBtnClick);
    }
  }
})();
