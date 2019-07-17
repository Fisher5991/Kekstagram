'use strict';

(function () {
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadImageForm.querySelector('#upload-file');
  var imgUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
  var uploadFormCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var uploadEffects = uploadImageForm.querySelector('.img-upload__effects');
  var imgPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var resizeValueInput = uploadImageForm.querySelector('.resize__control--value');
  var textDescriptionTextarea = uploadImageForm.querySelector('.text__description');
  var imgPreviewPicture = imgPreview.querySelector('img');
  var resizeMinusBtn = imgUploadOverlay.querySelector('.resize__control--minus');
  var resizePlusBtn = imgUploadOverlay.querySelector('.resize__control--plus');
  var textHashtagsInput = uploadImageForm.querySelector('.text__hashtags');
  var inputFlag = false;
  var currentFilter;
  var currentFilterName;
  var scale = document.querySelector('.scale');
  var scaleLine = scale.querySelector('.scale__line');
  var scalePin = scaleLine.querySelector('.scale__pin');
  var scaleLevel = scaleLine.querySelector('.scale__level');
  var SCALE_PIN_WIDTH = scalePin.offsetWidth;
  var SCALE_LINE_WIDTH = 453;
  var DEFAULT_PERCENT = '20%';

  var SCALE_PIN_COORD = {
    min: 0,
    max: SCALE_LINE_WIDTH
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

  var filterToValue = {
    'none': '',
    'chrome': 'grayscale',
    'sepia': 'sepia',
    'marvin': 'invert',
    'phobos': 'blur',
    'heat': 'brightness'
  }

  var MAX_FILTER_VALUE = {
    'none': '',
    'chrome': '1',
    'sepia': '1',
    'marvin': '100%',
    'phobos': '3px',
    'heat': '3'
  }

  var changeFilter = function (oldFilter, newFilter) {
    imgPreview.classList.remove(oldFilter);
    imgPreview.classList.add(newFilter)
  }

  var changeSaturation = function (xPercent, filter, filterName) {
    var currentValue;
    currentFilter = filter;
    currentFilterName = filterName;
    currentValue = (parseInt(MAX_FILTER_VALUE[currentFilterName], 10)) / 100 * xPercent + MAX_FILTER_VALUE[currentFilterName].replace(/[-.0-9]*/g, '');
    imgPreview.style.filter = filterToValue[currentFilterName] + '(' + currentValue + ')';
  }

  var getUniqueElements = function (array) {
    var object = {};

    array.forEach(function (element) {
      var string = element.toLowerCase();
      object[string] = true;
    });

    return Object.keys(object);
  }

  var onUploadCancelButtonClick = function (evt) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
  }

  var adjustScale = function (possibleValue) {
    resizeValueInput.value = possibleValue + '%';
    imgPreviewPicture.style = 'transform: scale(' + possibleValue / 100 + ')';
  }

  var onUploadImageSubmit = function (evt) {
    var hashtagsValues = textHashtagsInput.value;
    var hashtagsList;
    var invalidityTextList = [];
    var hashtagsNumber;
    var uniqueHashtagsList;
    var hashtagsLength;
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
        window.form.reset();
      }, 1000);
    }
  }

  var onHashtagsFieldInput = function () {
    if (!inputFlag) {
      textHashtagsInput.setCustomValidity('');
      inputFlag = true;
    }
  }

  uploadFormCancel.addEventListener('click', onUploadCancelButtonClick);
  uploadImageForm.addEventListener('submit', onUploadImageSubmit);
  textHashtagsInput.addEventListener('input', onHashtagsFieldInput);
  window.initializeScale(resizeMinusBtn, adjustScale, LimitationInput);
  window.initializeScale(resizePlusBtn, adjustScale, LimitationInput);
  window.initializeFilters(uploadEffects, changeFilter, changeSaturation);

  imgPreview.style = "position: relative; z-index: -1";
  textDescriptionTextarea.maxLength = LimitationInput.descriptionTextarea.maxLength;
  resizeValueInput.step = LimitationInput.resizeValueInput.step;
  resizeValueInput.min = LimitationInput.resizeValueInput.min;
  resizeValueInput.max = LimitationInput.resizeValueInput.max;
  resizeValueInput.value = LimitationInput.resizeValueInput.default;
  uploadImageForm.action = "https://js.dump.academy/kekstagram";
  uploadImageForm.method = "post";
  uploadImageForm.enctype = "multipart/form-data";
  scale.classList.add('hidden');

  var onScalePinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    }

    var offsetX;
    var offsetXPercent;

    var onScalePinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x
      }

      startCoords = {
        x: moveEvt.clientX
      }

      offsetX = scalePin.offsetLeft + shift.x;
      offsetXPercent = offsetX / SCALE_LINE_WIDTH * 100;

      if (offsetX >= SCALE_PIN_COORD.min && offsetX <= SCALE_PIN_COORD.max) {
        scalePin.style.left = offsetXPercent + '%';
        scaleLevel.style.width = offsetXPercent + '%';
        changeSaturation(offsetXPercent, currentFilter, currentFilterName);
      }
    }

    var onScalePinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onScalePinMouseMove);
      document.removeEventListener('mouseup', onScalePinMouseUp)
    }

    document.addEventListener('mousemove', onScalePinMouseMove);
    document.addEventListener('mouseup', onScalePinMouseUp);
  }

  scalePin.addEventListener('mousedown', onScalePinMouseDown);

  window.form = {
    reset: function () {
      uploadImageForm.reset();
      imgPreview.style.filter = 'none';
      scalePin.style.left = DEFAULT_PERCENT;
      scaleLevel.style.width = DEFAULT_PERCENT;
      scale.classList.add('hidden');
      imgPreview.classList.remove(currentFilter);
    }
  }
})();
