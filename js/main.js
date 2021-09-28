function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random  ссылку на источник!

// eslint-disable-next-line no-unused-vars
function getRandomFloat(from ,to, digits) {
  const main = getRandomInt(from, to);
  let float = '';

  // eslint-disable-next-line id-length
  for (let i = 0; i < digits; i++) {
    float += getRandomInt(1, 9);
  }


  // eslint-disable-next-line prefer-template
  const result =  main + '.' + float;
  return parseFloat(result);
}

