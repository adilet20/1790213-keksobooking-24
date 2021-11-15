import {createNewOffer} from './card.js';

const MAIN_PIN_ICON_URL = 'img/main-pin.svg';
const COMMON_PIN_ICON_URL = 'img/pin.svg';
const SHADOW_PIN_URL = 'leaflet/images/marker-shadow.png';
const MAIN_PIN_ICON_WIDTH = 52;
const MAIN_PIN_ICON_HEIGHT = 52;
const COMMON_PIN_ICON_WIDTH = 40;
const COMMON_PIN_ICON_HEIGHT = 40;
const ZOOM = 13;

const mapCoordinates = {
  lat: 35.682272,
  lng: 139.753137,
};


const createPinIcon = (pinIconWidth, pinIconHeight, url) => {
  const pinIcon = L.icon({
    iconUrl: url,
    shadowUrl: SHADOW_PIN_URL,
    iconSize: [pinIconWidth, pinIconHeight],
    shadowSize: [pinIconWidth, pinIconHeight],
    iconAnchor: [pinIconWidth / 2, pinIconHeight],
    shadowAnchor: [pinIconWidth / 3.2, pinIconHeight],
  });
  return pinIcon;
};

const createMarker = (similarAd, markerGroup) => {
  const commonPinIcon = createPinIcon(COMMON_PIN_ICON_WIDTH, COMMON_PIN_ICON_HEIGHT, COMMON_PIN_ICON_URL);
  const lat = similarAd.location.lat;
  const lng = similarAd.location.lng;
  const commonMarker = L.marker({
    lat,
    lng,
  },
  {
    icon: commonPinIcon,
  });

  commonMarker
    .addTo(markerGroup)
    .bindPopup(createNewOffer(similarAd));
};

const mainPinIcon = createPinIcon(MAIN_PIN_ICON_WIDTH, MAIN_PIN_ICON_HEIGHT, MAIN_PIN_ICON_URL);

const mainMarker = L.marker(
  mapCoordinates,
  {
    icon: mainPinIcon,
    draggable: true,
  },
);

const createMap = () => L.map('map-canvas', { 'tap': false });

const fillMap = (map) => {
  map.setView(mapCoordinates, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
};

const resetMarker = (map) => {
  map.setView(mapCoordinates, ZOOM);
  mainMarker.setLatLng(mapCoordinates);
  map.closePopup();
};

export {mapCoordinates, mainMarker, createMarker, createMap, fillMap, resetMarker};
