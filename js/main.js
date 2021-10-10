// author

const OFFERS_QUANTITY = 10;

// address
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const PRECISION_LAT = 5;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const PRECISION_LNG = 5;


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

function getRandomInt(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (upper - lower + 1)) + lower;

  return result;
}

getRandomInt(1,5);
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random  ссылку на источник!


function getRandomFloat(min, max, digits = 2) {
  if (min >= max || min < 0) {
    throw new Error;
  }
  const randomFloat = Math.random() * (max - min) + min;
  const result = randomFloat.toFixed(digits);

  return result;
}

getRandomFloat(1, 4, 2);

// Creating New Generator

const createRandomInteger = (min, max) => {
  const previousValue = [];

  return () => {
    let  currentValue = getRandomInt (min, max);
    if (previousValue.length >= (max - min + 1)) {
      throw new Error;
    }
    while (previousValue.includes(currentValue)) {
      currentValue = getRandomInt (min, max);
    }

    previousValue.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const shuffleArray = (array) => {
  // eslint-disable-next-line id-length
  for (let i = array.length - 1; i > 0; i--) {
    // eslint-disable-next-line id-length
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getNewRandomInt = createRandomInteger(AVATARS.min, AVATARS.max);

//  Create new avatar

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
  const latitude = getRandomFloat(MIN_LAT, MAX_LAT, PRECISION_LAT);
  const longitude = getRandomFloat(MIN_LNG, MAX_LNG, PRECISION_LNG);

  return {
    author: {
      avatar: `img/avatars/user${createAvatar()}.png`,
    },

    offer: {
      title:  getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
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
      lat: latitude,
      lng: longitude,
    },
  };
};

const getOffers = (amount) => Array.from({ length: amount }, newOffer);
getOffers(OFFERS_QUANTITY);


