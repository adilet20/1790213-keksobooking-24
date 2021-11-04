const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableForm = (form, disabledClass) => {
  form.classList.add(disabledClass);
  for (const formElement of form.children) {
    formElement.setAttribute('disabled', '');
  }
};

const  activateForm  = (form, disabledClass) => {
  form.classList.remove(disabledClass);
  for (const formElement of form.children) {
    formElement.removeAttribute('disabled');
  }
};

disableForm(adForm);
disableForm(mapFilters);
activateForm(adForm);
activateForm(mapFilters);


const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MAX_CAPACITY = 0;
const MAX_ROOMS = 100;


const PRICES_OF_TYPES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adTitle = adForm.querySelector('#title');
const adPrice = adForm.querySelector('#price');
const adType = adForm.querySelector('#type');
const adCapacity = adForm.querySelector('#capacity');
const adRooms = adForm.querySelector('#room_number');
const adTimeIn = adForm.querySelector('#timein');
const adTimeOut = adForm.querySelector('#timeout');
const formSubmit = document.querySelector('.ad-form__submit');


const checkPrice = () => {
  if (adPrice.validity.valueMissing) {
    return adPrice.setCustomValidity('Пожалуйста, введите цену');
  } else if (adPrice.value < PRICES_OF_TYPES[adType.value]) {
    return adPrice.setCustomValidity(`Минимальная цена ${  PRICES_OF_TYPES[adType.value] } руб. за ночь`);
  }
  return adPrice.setCustomValidity('');
};

const checkCapacity = () => {
  const rooms = parseInt(adRooms.value, 10);
  const capacity= parseInt(adCapacity.value, 10);

  if (rooms  === MAX_ROOMS && capacity !== MAX_CAPACITY) {
    return adCapacity.setCustomValidity('Выберите другой вариант');
  } else if (adRooms.value !==  String(MAX_ROOMS) && adCapacity.value ===  String( MAX_CAPACITY)) {
    return adCapacity.setCustomValidity('Выберите другой вариант');
  } else if (adCapacity.value > adRooms.value) {
    return adCapacity.setCustomValidity('Выберите другой вариант');
  }
  return adCapacity.setCustomValidity('');
};

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    adTitle.setCustomValidity('');
  }

  adTitle.reportValidity();
});

adType.addEventListener('change', () => {
  adPrice.placeholder=`${  PRICES_OF_TYPES[adType.value] }`;
});

adPrice.addEventListener('input', () => {
  checkPrice();
  adPrice.reportValidity();
});

adCapacity.addEventListener('change', () => {
  checkCapacity();
  adCapacity.reportValidity();
});

adTimeIn.addEventListener('change', () => {
  adTimeOut.value = adTimeIn.value;
});

adTimeOut.addEventListener('change', () => {
  adTimeIn.value = adTimeOut.value;
});

formSubmit.addEventListener('click', () => {
  checkPrice();
  checkCapacity();
});
