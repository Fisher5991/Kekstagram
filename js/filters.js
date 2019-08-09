'use strict';

(function () {
  var MAX_ARRAY_LENGTH = 10;
  var TIMEOUT = 500;
  var imgFiltersElement = document.querySelector('.img-filters');
  var filterPopular = imgFiltersElement.querySelector('#filter-popular');
  var filterNew = imgFiltersElement.querySelector('#filter-new');
  var filterDiscussed = imgFiltersElement.querySelector('#filter-discussed');
  var allPictures;
  var activeFilter = imgFiltersElement.querySelector('.img-filters__button--active');

  var changeActiveFilter = function (target, activeClass) {
    activeFilter.classList.remove(activeClass);
    activeFilter = target;
    activeFilter.classList.add(activeClass);
  }

  var onFilterPopularClick = function (evt) {
    if (evt.target !== activeFilter) {
      changeActiveFilter(evt.target, 'img-filters__button--active');
      window.utils.stopDebounce(function () {
        window.picture.addPhoto(allPictures);
      }, TIMEOUT);
    }
  }

  var onFilterNewClick = function (evt) {
    if (evt.target !== activeFilter) {
      changeActiveFilter(evt.target, 'img-filters__button--active');
      window.utils.stopDebounce(function () {
        var allPicturesCopy = allPictures.slice();
        var newArray = window.utils.randomizeArray(allPicturesCopy);

        newArray.length = MAX_ARRAY_LENGTH;
        window.picture.addPhoto(newArray);
      }, TIMEOUT);
    }
  }

  var onFilterDiscussedClick = function (evt) {
    if (evt.target !== activeFilter) {
      changeActiveFilter(evt.target, 'img-filters__button--active');
      window.utils.stopDebounce(function () {
        var allPicturesCopy = allPictures.slice();

        allPicturesCopy.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });

        window.picture.addPhoto(allPicturesCopy);
      }, TIMEOUT);
    }
  }

  window.filters = {
    setPictures: function (data) {
      allPictures = data;
    }
  }

  filterPopular.addEventListener('click', onFilterPopularClick);
  filterNew.addEventListener('click', onFilterNewClick);
  filterDiscussed.addEventListener('click', onFilterDiscussedClick);
})();
