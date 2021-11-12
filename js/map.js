import {createNewOffer} from './card.js';
import{disableForm, activateForm, mapFilters, adForm, resetForm} from './form.js';

const mapCoordinates = {
  lat: 35.682272,
  lng: 139.753137,
};


const resetButton = document.querySelector('.ad-form__reset');
const address = document.querySelector('#address');

disableForm(adForm);
disableForm(mapFilters);

const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activateForm(adForm);
    activateForm(mapFilters);
  })
  .setView({
    lat: mapCoordinates.lat,
    lng: mapCoordinates.lng,
  }, 14);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainPin = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: mapCoordinates.lat,
    lng: mapCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPin,
  },
);

mainMarker.addTo(mapCanvas);

mainMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const createMarker = (offers) => {
  offers.forEach((element) =>{

    const pin = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon:pin,
      },
    );

    marker
      .addTo(mapCanvas)
      .bindPopup(createNewOffer(element));
  });
};

const resetMarker = () => {
  mainMarker.setLatLng({
    lat: mapCoordinates.lat,
    lng: mapCoordinates.lng,
  });
  address.value = `${mainMarker.getLatLng().lat.toFixed(5)}, ${mainMarker.getLatLng().lng.toFixed(5)}`;
};


resetButton.addEventListener('click', () => {
  resetForm();
});

export {createMarker, resetMarker};
