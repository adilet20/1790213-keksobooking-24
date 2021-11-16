// import { get } from "browser-sync";
import {isEscapeKey} from './utils.js';


const cardTemplatePopup = document.querySelector('#card').content.querySelector('.popup');

const  houseType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createNewOffer = (item) => {
  const popupTemplate = cardTemplatePopup.cloneNode(true);

  const titleElement = popupTemplate.querySelector('.popup__title');
  const addressElement = popupTemplate.querySelector('.popup__text--address');
  const priceText = item.offer.price ? `${item.offer.price} ₽/ночь`: '';
  const priceElement = popupTemplate.querySelector('.popup__text--price');
  const typeElement = popupTemplate.querySelector('.popup__type');
  const capacityElement = popupTemplate.querySelector('.popup__text--capacity');
  const timeElement = popupTemplate.querySelector('.popup__text--time');
  const avatarElement = popupTemplate.querySelector('.popup__avatar');
  const descriptionElement =popupTemplate.querySelector('.popup__description');

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
  setElementContent(item.offer.description, descriptionElement);

  const photosElement =popupTemplate.querySelector('.popup__photos');
  const photoElement = photosElement.querySelector('.popup__photo');

  if (Array.isArray(item.offer.photos)) {
    for (const photo of item.offer.photos) {
      const photoClone = photoElement.cloneNode(true);
      photoClone.src = photo;
      photosElement.appendChild(photoClone);
    }
    photoElement.remove();
  } else {
    photosElement.remove();
  }

  const features = item.offer.features;
  const featuresElement = popupTemplate.querySelector('.popup__features');
  const popupFeatures =featuresElement.querySelectorAll('.popup__feature');

  if (Array.isArray(features)) {
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
  return popupTemplate;
};

const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

// const showPopup = (popupTemplate) => {
//   const popup = popupTemplate.cloneNode(true);
//   document.body.append(popup);

//   let onEscKeyDown = () => {};
//   let onDocumentClick = () => {};


//   const removePopup = () => {
//     popup.remove();
//     document.removeEventListener('keydown', onEscKeyDown);
//     document.removeEventListener('click', onDocumentClick);
//   };

//   onEscKeyDown = (evt) => {
//     if (isEscapeKey(evt)) {
//       evt.preventDefault();
//       removePopup();
//     }
//   };

//   onDocumentClick = () => {
//     removePopup();
//     document.removeEventListener('click', onEscKeyDown);
//   };

//   document.addEventListener('click', onDocumentClick);
//   document.addEventListener('keydown', onEscKeyDown);
// };
// const createSuccessPopup = () => showPopup(successPopup);
// const createErrorPopup = () => showPopup(errorPopup);

const showPopup = (popupTemplate) => {
  document.body.append(popupTemplate);
  document.addEventListener ('click', () =>{
    popupTemplate.remove();
  });
  document.addEventListener ('keydown', (evt) => {
    if (isEscapeKey(evt))  {
      evt.preventDefault();
      popupTemplate.remove();
      document.removeEventListener('keydown', (evt));
    }
  });
};

const createSuccessPopup = () => showPopup(successPopup);
const createErrorPopup = () => showPopup(errorPopup);


export {createNewOffer,  createSuccessPopup, createErrorPopup};

