(function () {
  var SENTENCE_MIN_NUMBER = 1;
  var SENTENCE_MAX_NUMBER = 2;
  var LIKES_MIN_NUMBER = 15;
  var LIKES_MAX_NUMBER = 200;
  var PHOTO_NUMBER = 25;
  var COMMENTS_TEXT_LIST = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ]

  var photoList = [];
  var photoCount = 1;

  var generateNumber = function (minNumber, maxNumber) {
    return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
  }

  var generatePhotoData = function (id) {
    var generateComments = function () {
      var commentsNumber = generateNumber(0, COMMENTS_TEXT_LIST.length);
      var commentsList = [];

      for (var i = 0; i < commentsNumber; i++) {
        commentsList.push(generateComment());
      }

      return commentsList;
    }

    var generateComment = function () {
      var numberSentences = generateNumber(SENTENCE_MIN_NUMBER, SENTENCE_MAX_NUMBER);
      var copyCommentsTextList = COMMENTS_TEXT_LIST.slice();
      var comment;

      for (var i = 0; i < numberSentences; i++) {
        comment += copyCommentsTextList.splice(generateNumber(0, copyCommentsTextList.length), 1)[0];
      }

      return comment;
    }

    var generatePhotoId = function () {
      if (photoCount <= PHOTO_NUMBER) {
        return photoCount++;
      }
    }

    var photo = {
      'index': id,
      'url': 'photos/' + generatePhotoId() + '.jpg',
      'likes': generateNumber(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
      'comments': generateComments()
    }

    return photo;
  }

  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureLink = pictureTemplate.querySelector('.picture__link');
  var photoFragment = document.createDocumentFragment();
  var bigPicture = document.querySelector('.big-picture');
  var bigImageWrapper = bigPicture.querySelector('.big-picture__img');
  var bigImage = bigImageWrapper.querySelector('img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var closePhotoBtn = bigPicture.querySelector('.big-picture__cancel');

  var ESC_KEYCODE = 27;

  window.util = {
    isEscEvent: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb();
      }
    }
  }

  var closeModal = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal)
  }

  var onPhotoBtnClick = function (evt) {
    evt.preventDefault();
    closeModal();
  }

  var onPhotoClick = function (evt) {
    var id = evt.currentTarget.getAttribute('data-index');
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    bigImage.src = evt.currentTarget.href;
    likesCount.textContent = photoList[id].likes;
    commentsCount.textContent = photoList[id].comments.length;
    closePhotoBtn.addEventListener('click', onPhotoBtnClick);
    document.addEventListener('keydown', onPopupEscPress);
  }

  var createPhotoElement = function (photo) {
    var photoElement = pictureLink.cloneNode(true);
    var pictureImage = photoElement.querySelector('.picture__img');
    var pictureLikes = photoElement.querySelector('.picture-likes');
    var pictureComments = photoElement.querySelector('.picture-comments');

    photoElement.setAttribute('data-index', photo.index);
    photoElement.href = photo.url;
    pictureImage.src = photo.url;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;
    photoElement.addEventListener('click', onPhotoClick)
    photoFragment.appendChild(photoElement);
  }

  var addPhoto = function () {
    for (var i = 0; i < PHOTO_NUMBER; i++) {
      photoList.push(generatePhotoData(i));
      createPhotoElement(photoList[i]);
    }
    picturesElement.appendChild(photoFragment);
    console.log(photoList);
  }

  addPhoto();
})();
