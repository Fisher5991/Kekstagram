'use strict';

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

  var photoCount = 1;

  var generateComments = function () {
    var commentsNumber = window.utils.generateNumber(0, COMMENTS_TEXT_LIST.length);
    var commentsList = [];

    for (var i = 0; i < commentsNumber; i++) {
      commentsList.push(generateComment());
    }

    return commentsList;
  }

  var generateComment = function () {
    var numberSentences = window.utils.generateNumber(SENTENCE_MIN_NUMBER, SENTENCE_MAX_NUMBER);
    var copyCommentsTextList = COMMENTS_TEXT_LIST.slice();
    var comment;

    for (var i = 0; i < numberSentences; i++) {
      comment += copyCommentsTextList.splice(window.utils.generateNumber(0, copyCommentsTextList.length), 1)[0];
    }

    return comment;
  }

  var generatePhotoId = function () {
    if (photoCount <= PHOTO_NUMBER) {
      return photoCount++;
    }
  }

  window.data = {
    generatePhoto: function (id) {
      var photo = {
        'index': id,
        'url': 'photos/' + generatePhotoId() + '.jpg',
        'likes': window.utils.generateNumber(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
        'comments': generateComments()
      }

      return photo;
    }
  }
})();
