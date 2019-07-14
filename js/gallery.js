(function () {
  // var imgUploadText = uploadImageForm.querySelector('.img-upload__text');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadImageForm.querySelector('#upload-file');
  var imgUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');

  var onUploadFileChange = function (evt) {
    imgUploadOverlay.classList.remove('hidden');
    window.modal.current = imgUploadOverlay;
    document.addEventListener('keydown', window.modal.onPopupEscPress);
  }

  uploadFileInput.addEventListener('change', onUploadFileChange);
})();
