import {resetForm, adForm} from './form.js';
import {createSuccessPopup, createErrorPopup} from './card.js';
import {showAlert} from './utils.js';
import  {createMarker} from './map.js';

const OFFERS_QUANTITY = 10;

const getData = () => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            createMarker(offers.slice(0,OFFERS_QUANTITY));
          });
      } else {
        showAlert('Не удалось загрузить данные');
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');},
    );
};

const sendData = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          createSuccessPopup();
          resetForm();
        } else {
          createErrorPopup();
        }
      })
      .catch(() => {
        createErrorPopup();
      });
  });
};

export {sendData, getData};
