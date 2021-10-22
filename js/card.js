import {ads} from './data.js';

const popup = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const createNewOffer = ads();
const getFragment = document.createDocumentFragment();

const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

createNewOffer.forEach ((item) => {
  const getPopup = popup.cloneNode(true);

  getPopup.querySelector('.popup__title').textContent = item.Offer.title;
  getPopup.querySelector('.popup__text--address').textContent = item.Offer.address;
  getPopup.querySelector('.popup__text--price').textContent = `${item.Offer.price} ₽/ночь`;
  getPopup.querySelector('.popup__type').textContent = OFFER_TYPES[item.Offer.type];
  getPopup.querySelector('.popup__text--capacity').textContent = `${item.Offer.rooms} комнаты для ${item.Offer.guests} гостей`;
  getPopup.querySelector('.popup__text--time').textContent = `Заезд после ${item.Offer.checkin} выезд до ${item.Offer.checkout}`;
  getPopup.querySelector('.popup__description').textContent = item.Offer.description;
  getPopup.querySelector('.popup__avatar').src = item.Author.avatar;

  //features
  const popupFeatures = getPopup.querySelector('.popup__features');
  const popupFeatureItem = popupFeatures.querySelectorAll('.popup__feature');

  if (Array.isArray(item.Offer.features)) {
    const modifiers = item.Offer.features.map((featureValue) =>`popup__feature--${featureValue}`);

    popupFeatureItem.forEach((popupFeature) => {
      const modifier = popupFeature.classList[1];
      if (!modifiers.includes(modifier)) {
        popupFeature.remove();
      }
    });
  } else {
    const modifiers = `popup__feature--${item.Offer.features}`;
    popupFeatureItem.forEach ((popupFeature) => {
      const modifier = popupFeature.classList[1];
      if (modifiers !== modifier) {
        popupFeature.remove();
      }
    });
  }
  //photos
  const popupPhotoContainer =getPopup.querySelector('.popup__photos');
  const popupPhoto =popupPhotoContainer.querySelector('.popup__photo');
  if (Array.isArray(item.Offer.photos)) {
    item.Offer.photos.forEach ((photoSrc, index) => {
      if (index === 0) {
        popupPhoto.src = item.Offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotoContainer.appendChild(popupPhotoItem);
      }
    });
  } else {
    popupPhoto.src = item.Offer.photos;
  }
  getFragment.appendChild(getPopup);
});

mapCanvas.appendChild(getFragment);


