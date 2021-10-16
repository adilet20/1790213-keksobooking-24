import {getRandomInt, getRandomFloat, createRandomInteger, getRandomArrayElement, shuffleArray} from './utils.js';

// author
const OFFERS_QUANTITY = 10;

const AVATARS = {
  min: 1,
  max: 10,
};

// offer

const TITLES = [
  'Tokyo - остановитесь в самом центре',
  'Асакуса',
  'Акихабара',
  'Нихонбаси',
  'Синджюку',
  'Акасака',
  'Гиндза',
];

const PRICES = {
  min: 10000,
  max: 50000,
};

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const ROOMS = {
  min: 1,
  max: 3,
};

const GUESTS = {
  min: 1,
  max: 6,
};

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Очень доступно, чисто, уютно',
  'Комфортные комнаты',
  'Весело и ярко',
  'Отличное расположение',
  'Номер с основными удобствами и кроватью размера',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LOCATION = {
  lat: {
    min: 35.65000,
    max: 35.70000,
  },
  lng: {
    min: 139.70000,
    max: 139.80000,
  },
  number: 5,
};

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

const generateOffer = () => {
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

export const getOffers = (amount) => Array.from({ length: amount }, generateOffer);
getOffers(OFFERS_QUANTITY);
