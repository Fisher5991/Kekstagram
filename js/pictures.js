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

  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadImageForm.querySelector('#upload-file');
  var imgUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
  var uploadFormCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

  var ESC_KEYCODE = 27;

  var currentModal;
  var imgUploadText = uploadImageForm.querySelector('.img-upload__text');
  var textDescriptionTextarea = uploadImageForm.querySelector('.text__description');
  var textHashtagsInput = uploadImageForm.querySelector('.text__hashtags');
  var resizeValueInput = uploadImageForm.querySelector('.resize__control--value');
  var uploadEffects = uploadImageForm.querySelector('.img-upload__effects');
  var imgPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var imgPreviewPicture = imgPreview.querySelector('img');
  var currentFilter;
  var resizeMinusBtn = imgUploadOverlay.querySelector('.resize__control--minus');
  var resizePlusBtn = imgUploadOverlay.querySelector('.resize__control--plus');
  var inputFlag = false;

  window.util = {
    isEscEvent: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb();
      }
    }
  }

  var closeModal = function () {
    currentModal.classList.add('hidden');
    if (currentModal === imgUploadOverlay) {
      uploadFileInput.value = '';
    }
    currentModal = undefined;
    document.removeEventListener('keydown', onPopupEscPress);
  }

  var onPopupEscPress = function (evt) {
    if (evt.target !== textHashtagsInput) {
      window.util.isEscEvent(evt, closeModal)
    }
  }

  var onPhotoBtnClick = function (evt) {
    evt.preventDefault();
    closeModal();
  }

  var onPhotoClick = function (evt) {
    var id = evt.currentTarget.getAttribute('data-index');
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    currentModal = bigPicture;
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
  }

  var onUploadCancelButtonClick = function (evt) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
  }

  var onUploadFileChange = function (evt) {
    imgUploadOverlay.classList.remove('hidden');
    currentModal = imgUploadOverlay;
    document.addEventListener('keydown', onPopupEscPress);
  }

  var onEffectChange = function (evt) {
    if (currentFilter) {
      imgPreview.classList.remove(currentFilter);
    }
    currentFilter = evt.target.id;
    imgPreview.classList.add(currentFilter);
  }

  var LimitationInput = {
    'descriptionTextarea': {
      'maxLength': 140
    },

    'resizeValueInput': {
      'step': 0.25,
      'min': 0.25,
      'max': 1,
      'default': '100%'
    },

    'hashtagsInput': {
      'firstSymbol': '#',
      'number': 5,
      'length': 20
    }
  }

  var setDefaultSettings = function () {
    textDescriptionTextarea.maxLength = LimitationInput.descriptionTextarea.maxLength;
    resizeValueInput.step = LimitationInput.resizeValueInput.step;
    resizeValueInput.min = LimitationInput.resizeValueInput.min;
    resizeValueInput.max = LimitationInput.resizeValueInput.max;
    resizeValueInput.value = LimitationInput.resizeValueInput.default;
    imgPreview.style = "position: relative; z-index: -1";
    uploadImageForm.action = "https://js.dump.academy/kekstagram";
    uploadImageForm.method = "post";
    uploadImageForm.enctype = "multipart/form-data";
  }

  var onResizeMinusBtnClick = function (evt) {
    evt.preventDefault();
    var possibleValue = parseInt(resizeValueInput.value, 10) - LimitationInput.resizeValueInput.step * 100;
    if (possibleValue >= LimitationInput.resizeValueInput.min * 100) {
      resizeValueInput.value = possibleValue + '%';
      imgPreviewPicture.style = 'transform: scale(' + possibleValue / 100 + ')';
    }
  }

  var onResizePlusBtnClick = function (evt) {
    evt.preventDefault();
    var possibleValue = parseInt(resizeValueInput.value, 10) + LimitationInput.resizeValueInput.step * 100;
    if (possibleValue <= LimitationInput.resizeValueInput.max * 100) {
      resizeValueInput.value = possibleValue + '%';
      imgPreviewPicture.style = 'transform: scale(' + possibleValue / 100 + ')';
    }
  }

  var getUniqueElements = function (array) {
    var object = {};

    array.forEach(function (element) {
      var string = element.toLowerCase();
      object[string] = true;
    });

    return Object.keys(object);
  }

  var onUploadImageSubmit = function (evt) {
    var hashtagsValues = textHashtagsInput.value;
    var hashtagsList;
    var invalidityTextList = [];
    var hashtagsNumber;
    var uniqueHashtagsList;
    var uniqueHashtagsValues;
    var firstSymbolFlag = false;
    var lengthFlag = false;

    if (!hashtagsValues) {
      return;
    }

    hashtagsList = hashtagsValues.split(' ');
    hashtagsLength = hashtagsList.length;
    hashtagsNumber = Math.min(LimitationInput.hashtagsInput.number, hashtagsLength);

    while (hashtagsNumber--) {
      if ((hashtagsList[hashtagsNumber][0] !== LimitationInput.hashtagsInput.firstSymbol) && !firstSymbolFlag) {
        invalidityTextList.push('Хэш-тег должен начинаться с символа `#` (решётка) и состоять из одного слова');
        firstSymbolFlag = true;
      }

      if ((hashtagsList[hashtagsNumber].length > LimitationInput.hashtagsInput.length) && !lengthFlag) {
        invalidityTextList.push('Максимальная длина одного хэш-тега 20 символов');
        invalidityTextList.push('Хэш-теги разделяются пробелами');
        lengthFlag = true;
      }

      if (firstSymbolFlag && lengthFlag) {
        break;
      }
    };

    if (hashtagsList.length > LimitationInput.hashtagsInput.number) {
      invalidityTextList.push('Нельзя указать больше пяти хэш-тегов');
    }

    uniqueHashtagsList = getUniqueElements(hashtagsList);
    uniqueHashtagsValues = uniqueHashtagsList.join(' ');

    if (hashtagsValues !== uniqueHashtagsValues) {
      invalidityTextList.push('Один и тот же хэш-тег не может быть использован дважды');
      invalidityTextList.push('Теги не чувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом');
    }

    if (invalidityTextList.length) {
      evt.preventDefault();
      textHashtagsInput.setCustomValidity(invalidityTextList.join('. \n'));
      textHashtagsInput.style = "border: 1px solid red";
      inputFlag = false;
    } else {
      setTimeout(function () {
        uploadImageForm.reset();
      }, 1000);
    }
  }

  var onHashtagsFieldInput = function () {
    if (!inputFlag) {
      textHashtagsInput.setCustomValidity('');
      inputFlag = true;
    }
  }

  uploadFileInput.addEventListener('change', onUploadFileChange);
  uploadFormCancel.addEventListener('click', onUploadCancelButtonClick);
  uploadEffects.addEventListener('change', onEffectChange, true);
  resizeMinusBtn.addEventListener('click', onResizeMinusBtnClick);
  resizePlusBtn.addEventListener('click', onResizePlusBtnClick);
  uploadImageForm.addEventListener('submit', onUploadImageSubmit);
  textHashtagsInput.addEventListener('input', onHashtagsFieldInput);

  addPhoto();
  setDefaultSettings();
})();
