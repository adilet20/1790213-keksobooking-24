// eslint-disable-next-line no-unused-vars
const random = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random  ссылку на источник!

// eslint-disable-next-line no-unused-vars
const newRando = function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
};

Math.floor(Math.random() * 9) - 10;


