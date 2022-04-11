import {getAdList} from './api.js';
import {deactivateForms, activateForms, setUserFormSubmit} from './form.js';
import { createPriceSlider } from './price-slider.js';
import { mapInit } from './map.js';
import {getDataError, sendDataError, onSuccess} from './messages.js';


deactivateForms();

const {setMarkers} = mapInit(activateForms);
getAdList(setMarkers, getDataError);

createPriceSlider();

setUserFormSubmit(onSuccess, sendDataError);
