// import {ads} from './data.js';
// import  './card.js';
// createNewOffer(ads[3]);
import './form.js';
import {initMap} from './map.js';

import{disableForm, mapFilters, adForm} from './form.js';
import {sendData, getData} from './api.js';

disableForm(adForm);
disableForm(mapFilters);

initMap();

getData();
sendData();
