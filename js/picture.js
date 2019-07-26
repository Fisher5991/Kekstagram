'use strict';

(function () {
  // var PHOTO_NUMBER = 25;
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureLink = pictureTemplate.querySelector('.picture__link');
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

  var addPhoto = function (photos) {
    photoList = photos;
    for (var i = 0; i < photoList.length; i++) {
      createPhotoElement(photoList[i]);
    }
    picturesElement.appendChild(photoFragment);
  }

  window.picture = {
    getPhotoList: function () {
      return photoList;
    }
  }

  window.backend.load(addPhoto, window.backend.errorHandler);
})();
