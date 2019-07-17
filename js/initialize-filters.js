'use strict';

(function () {
  var scale = document.querySelector('.scale');
  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadEffects = uploadImageForm.querySelector('.img-upload__effects');
  var imgUploadOverlay = uploadImageForm.querySelector('.img-upload__overlay');
  var imgPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var scaleLine = scale.querySelector('.scale__line');
  var scalePin = scaleLine.querySelector('.scale__pin');
  var scaleLevel = scaleLine.querySelector('.scale__level');
  var defaultFilter = 'effect-none';
  var currentFilter;
  var currentFilterName;
  var DEFAULT_PERCENT = '20%';
  var changeFilter;
  var changeSaturation;

  var onEffectChange = function (evt) {
    var prevFilter = currentFilter;
    var defaultValue;

    if (prevFilter === defaultFilter || !prevFilter) {
      scale.classList.remove('hidden');
    }

    currentFilter = evt.target.id;

    changeFilter(prevFilter, currentFilter);

    if (currentFilter === defaultFilter) {
      scale.classList.add('hidden');
    }

    scalePin.style.left = DEFAULT_PERCENT;
    scaleLevel.style.width = DEFAULT_PERCENT;
    currentFilterName = currentFilter.replace('effect-', '');

    if (currentFilter !== defaultFilter) {
      changeSaturation(parseInt(DEFAULT_PERCENT, 10), currentFilter, currentFilterName);
    } else {
      imgPreview.style.filter = 'none';
    }
  }

  window.initializeFilters = function (elements, addNewFilter, addNewSaturation) {
    changeFilter = addNewFilter;
    changeSaturation = addNewSaturation;
    elements.addEventListener('change', onEffectChange, true);
  }
})();
