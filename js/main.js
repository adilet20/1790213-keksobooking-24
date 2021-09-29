function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
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
getRandomFloat(1.2, 4.4, 2);
