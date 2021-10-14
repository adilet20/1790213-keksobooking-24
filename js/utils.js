export const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (upper - lower + 1)) + lower;

  return result;
};


export  const getRandomFloat = (min, max, digits = 2) => {
  if (min >= max || min < 0) {
    throw new Error;
  }
  const randomFloat = Math.random() * (max - min) + min;
  const result = randomFloat.toFixed(digits);

  return result;
};

// Creating New Generator

export const createRandomInteger = (min, max) => {
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

export const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

export const shuffleArray = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const ji = Math.floor(Math.random() * (index + 1));
    [array[index], array[ji]] = [array[ji], array[index]];
  }
  return array;
};
