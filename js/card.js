const popup = document.querySelector('#card').content.querySelector('.popup');
const popupPotoElement = document.querySelector('#card').content.querySelector('.popup__photo');
const mapCanvas = document.querySelector('#map-canvas');
const getFragment = document.createDocumentFragment();

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
  const getPopup = popup.cloneNode(true);

  const titleElement = getPopup.querySelector('.popup__title');
  const addressElement = getPopup.querySelector('.popup__text--address');
  const priceElement = getPopup.querySelector('.popup__text--price');
  const typeElement = getPopup.querySelector('.popup__type');
  const capacityElement = getPopup.querySelector('.popup__text--capacity');
  const timeElement = getPopup.querySelector('.popup__text--time');
  const avatarElement = getPopup.querySelector('.popup__avatar');
  const featuresElement = getPopup.querySelector('.popup__features');
  const descriptionElement = getPopup.querySelector('.popup__description');

  const description =item.offer.description;
  const features = item.offer.features;
  const avatar = item.author.avatar;
  const type = houseType[item.offer.type];
  const price = item.offer.price;
  const address = item.offer.address;
  const title = item.offer.title;
  const rooms = item.offer.rooms;
  const guests = item.offer.guests;
  const checkin = item.offer.checkin;
  const checkout = item.offer.checkout;

  const photosElement =getPopup.querySelector('.popup__photos');
  const photoElement = photosElement.querySelector('.popup__photo');
  const photosArray = generatePhoto(item.offer.photos);

  if (title) {
    titleElement.textContent = title;
  }
  else {
    titleElement.remove();
  }

  if (address) {
    addressElement.textContent = address;
  }
  else {
    addressElement.remove();
  }

  if (price) {
    priceElement.textContent = `${price} ₽/ночь`;
  }
  else {
    priceElement.remove();
  }

  if (type) {
    typeElement.textContent = type;
  }
  else {
    typeElement.remove();
  }

  if (rooms && guests) {
    capacityElement.textContent = `${rooms} комнаты для ${guests} гостей`;
  }
  else {
    capacityElement.remove();
  }

  if (checkin && checkout) {
    timeElement.textContent = `Заезд после ${checkin}, Выезд до ${checkout}`;
  }
  else {
    timeElement.remove();
  }

  if (features) {
    featuresElement.textContent = features;
  }
  else {
    featuresElement.remove();
  }

  if (description) {
    descriptionElement.textContent = description;
  }
  else {
    descriptionElement.remove();
  }
  photoElement.remove();
  if (photosArray.length) {
    photosElement.append(...photosArray);
  }
  else {
    photosElement.remove();
  }

  if (avatar) {
    avatarElement.src = avatar;
  }
  else {
    avatarElement.remove();
  }

  getFragment.appendChild(getPopup);

  return mapCanvas.appendChild(getFragment);
};

export {createNewOffer};
