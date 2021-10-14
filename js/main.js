import {OFFERS_QUANTITY, AVATARS, TITLES, PRICES, TYPES, ROOMS, GUESTS, CHECKIN, CHECKOUT, FEATURES, DESCRIPTION, PHOTOS, LOCATION} from './data.js';
import {getRandomInt, getRandomFloat, createRandomInteger, getRandomArrayElement, shuffleArray} from './utils.js';

//  Create new avatar
const getNewRandomInt = createRandomInteger(AVATARS.min, AVATARS.max);

const createAvatar = () => {
  const newAvatar = getNewRandomInt();

  return String(newAvatar).padStart(2, '0');
};

const createArray = (array) => {
  const newArray = array.slice();
  const randomNumber = getRandomInt(1, newArray.length);

  return shuffleArray(newArray).slice(0, randomNumber);
};

const newOffer = () => {
  const locationLat = Number(getRandomFloat(LOCATION.lat.min, LOCATION.lat.max, LOCATION.number));
  const locationLng = Number(getRandomFloat(LOCATION.lng.min, LOCATION.lng.max, LOCATION.number));

  return {
    author: {
      avatar: `img/avatars/user${createAvatar()}.png`,
    },

    offer: {
      title:  getRandomArrayElement(TITLES),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInt(PRICES.min, PRICES.max),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(ROOMS.min, ROOMS.max),
      guests: getRandomInt(GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: createArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: createArray(PHOTOS),
    },

    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const getOffers = (amount) => Array.from({ length: amount }, newOffer);
getOffers(OFFERS_QUANTITY);
