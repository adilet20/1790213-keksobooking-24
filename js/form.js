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
