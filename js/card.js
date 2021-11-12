// import { get } from "browser-sync";
import {checkElement, isEscapeKey} from './utils.js';


const cardTemplatePopup = document.querySelector('#card').content.querySelector('.popup');
const popupPotoElement = document.querySelector('#card').content.querySelector('.popup__photo');
// const mapCanvas = document.querySelector('#map-canvas');
// const getFragment = document.createDocumentFragment();


const  houseType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

//photo generator
const generatePhoto = (array) => {
  const popupPhotoContainer = [];
  array.forEach((item) => {
    const popupPhotoItem =  popupPotoElement.cloneNode(true);
    popupPhotoItem.src = item;
    popupPhotoContainer.push( popupPhotoItem);
  });
  return popupPhotoContainer;
};

const createNewOffer = (item) => {
  const getPopup = cardTemplatePopup.cloneNode(true);

  const titleElement = getPopup.querySelector('.popup__title');
  const addressElement = getPopup.querySelector('.popup__text--address');
  const priceText = item.offer.price ? `${item.offer.price} ₽/ночь`: '';
  const priceElement = getPopup.querySelector('.popup__text--price');
  const typeElement = getPopup.querySelector('.popup__type');
  const capacityElement = getPopup.querySelector('.popup__text--capacity');
  const timeElement = getPopup.querySelector('.popup__text--time');
  const avatarElement = getPopup.querySelector('.popup__avatar');
  // const featuresElement = getPopup.querySelector('.popup__features');
  const descriptionElement = getPopup.querySelector('.popup__description');

  const photosElement =getPopup.querySelector('.popup__photos');
  const photoElement = photosElement.querySelector('.popup__photo');
  const photosArray = generatePhoto(item.offer.photos);

  const setElementContent = (itemValue, element) => {
    if (!itemValue) {
      element.remove();
    }else {
      element.textContent = itemValue;
    }
  };

  setElementContent(item.offer.title, titleElement);
  setElementContent(item.offer.address, addressElement);
  setElementContent(priceText, priceElement);
  setElementContent(houseType[item.offer.type], typeElement);
  setElementContent(`${item.offer.rooms} комнаты для ${item.offer.guests} гостей`,  capacityElement);
  setElementContent(`Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`, timeElement);
  // setElementContent(item.offer.features, featuresElement);
  setElementContent(item.offer.description, descriptionElement);
  setElementContent(item.offer.photos, photoElement);

  const features = item.offer.features;
  const featuresElement = getPopup.querySelector('.popup__features');
  const popupFeatures =featuresElement.querySelectorAll('.popup__feature');

  if (!checkElement(features)) {
    popupFeatures.forEach((popupFeature) => {
      const isNecessary = features.some(
        (similarFeature) => popupFeature.classList.contains(`popup__feature--${similarFeature}`),
      );
      if (!isNecessary) {
        popupFeature.remove();
      }
    });
  }else {
    featuresElement.remove();
  }

  const avatar = item.author.avatar;
  if (avatar) {
    avatarElement.src = avatar;
  }
  else {
    avatarElement.remove();
  }
  photosElement.innerHTML = '';
  if (photosArray.length) {
    photosElement.append(...photosArray);
  }
  else {
    photosElement.remove();
  }
  return getPopup;
  // getFragment.appendChild(getPopup);

  // return mapCanvas.appendChild(getFragment);
};

const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');
const successClone = success.cloneNode(true);
const errorClone = error.cloneNode(true);

const appendInBody = function (element) {
  body.appendChild(element);
  document.addEventListener('keydown',(evt) => {
    if (isEscapeKey(evt)) {
      element.remove();
    }
  });
  element.addEventListener('click', () => {
    element.remove();
  });
};


export {createNewOffer, successClone, errorClone, appendInBody};

