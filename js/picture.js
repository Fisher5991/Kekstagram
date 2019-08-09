'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureLink = pictureTemplate.querySelector('.picture__link');
  var imgFiltersElement = document.querySelector('.img-filters');
  var photoFragment = document.createDocumentFragment();
  var photoList;

  var createPhotoElement = function (photo) {
    var photoElement = pictureLink.cloneNode(true);
    var pictureImage = photoElement.querySelector('.picture__img');
    var pictureLikes = photoElement.querySelector('.picture-likes');
    var pictureComments = photoElement.querySelector('.picture-comments');

    photoElement.href = photo.url;
    pictureImage.src = photo.url;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;
    window.preview.addBigImageOpenHandler(photoElement);
    photoFragment.appendChild(photoElement);
  }

  var saveData = function (data) {
    window.filters.setPictures(data);
    window.picture.addPhoto(data);
  }

  window.picture = {
    getPhotoList: function () {
      return photoList;
    },

    addPhoto: function (photos) {
      var currentPictures = picturesElement.querySelectorAll('.picture__link');
      if (currentPictures) {
        window.utils.removeElements(currentPictures);
      }
      photoList = photos;
      for (var i = 0; i < photoList.length; i++) {
        createPhotoElement(photoList[i]);
      }
      picturesElement.appendChild(photoFragment);
      imgFiltersElement.classList.remove('img-filters--inactive');
    }
  }

  window.backend.load(saveData, window.backend.errorHandler);
})();
