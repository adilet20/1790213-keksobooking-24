const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);
  for (const formElement of form.children) {
    formElement.setAttribute('disabled', '');
  }
};

const  activateForm  = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
  for (const formElement of form.children) {
    formElement.removeAttribute('disabled');
  }
};

disableForm(adForm);
disableForm(mapFilters);
activateForm(adForm);
activateForm(mapFilters);
