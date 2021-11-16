import {disableForm, activateForm, mapFilters, adForm, resetForm, setFilterChange, address, resetButton}from './form.js';
import {createSuccessPopup, createErrorPopup} from './card.js';
import {createMap, createMarker, mapCoordinates, mainMarker, fillMap, resetMarker} from './map.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce} from './utils.js';
import {selectAds} from './filter.js';
import {setPreviews} from './previews.js';
setPreviews();

const  OFFERS_QUANTITY = 10;
const RERENDER_DELAY = 300;

const renderSimilarAds = (similarAds, markerGroup) => {
  markerGroup.clearLayers();
  similarAds
    .slice()
    .filter(selectAds)
    .slice(0, OFFERS_QUANTITY)
    .forEach((similarAd) => {
      createMarker(similarAd, markerGroup);
    });
};

disableForm(adForm);
disableForm(mapFilters);

const map = createMap();
const layerGroupMarker = L.layerGroup().addTo(map);

map.on('load', () => {
  address.value = `${mapCoordinates.lat}, ${mapCoordinates.lng}`;

  mainMarker.on('move', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  activateForm(adForm);

  getData(
    (similarAds) => {
      renderSimilarAds(similarAds,  layerGroupMarker);
      setFilterChange( debounce( () => renderSimilarAds(similarAds,  layerGroupMarker), RERENDER_DELAY) );
      resetForm( () => resetMarker(map), mapCoordinates, debounce( () => renderSimilarAds(similarAds, layerGroupMarker), RERENDER_DELAY) );
      activateForm(mapFilters);
    },
    (message) => {
      showAlert(message);
      resetForm( () => resetMarker(map), mapCoordinates);
    },
  );
});

fillMap(map);

const sendDataForm = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        resetButton.click();
        createSuccessPopup();
      },
      () => createErrorPopup(),
      new FormData(evt.target),
    );
  });
};

sendDataForm();
