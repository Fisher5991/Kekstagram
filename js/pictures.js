(function () {
  var SENTENCE_MIN_NUMBER = 1;
  var SENTENCE_MAX_NUMBER = 2;
  var PHOTO_MIN_NUMBER = 1;
  var PHOTO_MAX_NUMBER = 25;
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

  var generateNumber = function (minNumber, maxNumber) {
    return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
  }

  var generatePhotoData = function () {
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

    var photo = {
      'url': 'photos/' + generateNumber(PHOTO_MIN_NUMBER, PHOTO_MAX_NUMBER) + '.jpg',
      'likes': generateNumber(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
      'comments': generateComments()
    }

    return photo;
  }

  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content;
  var pictureLink = pictureTemplate.querySelector('.picture__link');
  var photoFragment = document.createDocumentFragment();
  var bigPicture = document.querySelector('.big-picture');
  var bigImage = bigPicture.querySelector('.big-picture__img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');

  var createPhotoElement = function (photo) {
    var photoElement = pictureLink.cloneNode(true);
    var pictureImage = photoElement.querySelector('.picture__img');
    var pictureLikes = photoElement.querySelector('.picture-likes');
    var pictureComments = photoElement.querySelector('.picture-comments');

    pictureImage.src = photo.url;
    pictureComments = photo.comments.length;
    photoFragment.appendChild(photoElement);
  }

  var addPhoto = function () {
    for (var i = 0; i < PHOTO_NUMBER; i++) {
      photoList.push(generatePhotoData());
      createPhotoElement(photoList[i]);
    }

    pictures.appendChild(photoFragment);
  }

  var showBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bigImage.src = photoList[0].url;
    likesCount.textContent = photoList[0].likes;
    commentsCount.textContent = photoList[0].comments.length;
  }

  addPhoto();
  showBigPicture();
})();
