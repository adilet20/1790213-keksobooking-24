const DATE_MAP_URL= 'https://24.javascript.pages.academy/keksobooking/data';
const SEND_FORM_URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => fetch(DATE_MAP_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Не удалось загрузить данные');
  })
  .then((offers) => {
    onSuccess(offers);
  })
  .catch((err) => {
    onError(err);
  });

const sendData = (onSuccess, onError, body) => {
  fetch(SEND_FORM_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }

      throw new Error('Не удалось загрузить данные');
    })
    .catch((err) => {
      onError(err);
    });
};

export {getData, sendData};
