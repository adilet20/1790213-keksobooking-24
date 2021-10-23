const popup = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const getFragment = document.createDocumentFragment();

const OFFER_TYPES = document.querySelector('#type').children;

const createNewOffer = (item) => {
  const getPopup = popup.cloneNode(true);

  const title = getPopup.querySelector('.popup__title');
  const address = getPopup.querySelector('.popup__text--address');
  const price = getPopup.querySelector('.popup__text--price');
  const type = OFFER_TYPES[item.offer.type];
  const typeElement = getPopup.querySelector('.popup__type');
  const capacity = getPopup.querySelector('.popup__text--capacity');
  const time = getPopup.querySelector('.popup__text--time');
  const description = getPopup.querySelector('.popup__description');
  const avatar = getPopup.querySelector('.popup__avatar');

  const gedChecked = (itemValue, element) => (itemValue.length === 0) ? element.remove() : element.textContent = itemValue;
  gedChecked (item.Offer.title, title);
  gedChecked (item.Offer.address, address);
  gedChecked (item.Offer.description, description);

  if (item.offer.price === 0) {
    price.remove();
  } else {
    price.textContent = `${item.offer.price} ₽/ночь`;
  }

  if (item.offer.capacity === 0) {
    capacity.remove();
  } else {
    capacity.textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  }

  if (type) {
    typeElement.textContent = type;
  } else {
    typeElement.remove();
  }

  if (item.offer.time === 0) {
    time.remove();
  } else {
    time.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  }

  avatar.onerror = () => {
    avatar.remove();
  };
  //features
  const popupFeatures = getPopup.querySelector('.popup__features');
  const popupFeatureItem = popupFeatures.querySelectorAll('.popup__feature');
  const modifiers = item.Offer.features.map((featureValue) =>`popup__feature--${featureValue}`);
  popupFeatureItem.forEach((popupFeature) => {
    const modifier = popupFeature.classList[1];

    if (!modifiers.includes(modifier)) {
      popupFeature.remove();
    }
  });

  //photos
  const popupPhotoContainer =getPopup.querySelector('.popup__photos');
  const popupPhoto =popupPhotoContainer.querySelector('.popup__photo');
  if (item.offer.photos.length === 0) {
    popupPhotoContainer.remove();
  } else { item.offer.photos.forEach((photoSrc, index) => {
    if (index > 0) {
      const popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = photoSrc;
      popupPhotoContainer.appendChild(popupPhotoItem);
    } else {
      popupPhoto.src = item.Offer.photos;
    }
  });
  }
  getFragment.appendChild(getPopup);

  return mapCanvas.appendChild(getFragment);
};

export {createNewOffer};
