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
      var id = evt.currentTarget.getAttribute('data-index');
      bigPicture.classList.remove('hidden');
      this.current = bigPicture;
      bigImage.src = evt.currentTarget.href;
      likesCount.textContent = window.picture.getPhotoList()[id].likes;
      commentsCount.textContent = window.picture.getPhotoList()[id].comments.length;
      window.preview.addBigImageCloseHandler();
      document.addEventListener('keydown', window.modal.onPopupEscPress);
      console.log(this.current);
    },

    close: function () {
      this.current.classList.add('hidden');
      if (this.current === imgUploadOverlay) {
        window.form.reset();
      }
      this.current = undefined;
      document.removeEventListener('keydown', window.modal.onPopupEscPress);
    },

    onPopupEscPress: function (evt) {
      if (evt.target !== textHashtagsInput) {
        window.utils.isEscEvent(evt, window.modal.close);
      }
    }
  }
})();
