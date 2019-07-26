'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigImageWrapper = bigPicture.querySelector('.big-picture__img');
  var bigImage = bigImageWrapper.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadImageForm.querySelector('#upload-file');
  var textHashtagsInput = uploadImageForm.querySelector('.text__hashtags');
  var imgUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');

  window.modal = {
    current: undefined,

    show: function (evt) {
      var target = evt.currentTarget;
      bigPicture.classList.remove('hidden');
      this.current = bigPicture;
      bigImage.src = target.href;
      console.log(target.querySelector('.picture-likes').textContent)
      console.log(target.querySelector('.picture-comments').textContent)
      likesCount.textContent = target.querySelector('.picture-likes').textContent;
      commentsCount.textContent = target.querySelector('.picture-comments').textContent;
      window.preview.addBigImageCloseHandler();
      document.addEventListener('keydown', window.modal.onPopupEscPress);
    },

    close: function () {
      window.modal.current.classList.add('hidden');
      if (window.modal.current === imgUploadOverlay) {
        window.form.reset();
      }
      window.modal.current = undefined;
      document.removeEventListener('keydown', window.modal.onPopupEscPress);
    },

    onPopupEscPress: function (evt) {
      if (evt.target !== textHashtagsInput) {
        window.utils.isEscEvent(evt, window.modal.close);
      }
    }
  }
})();
