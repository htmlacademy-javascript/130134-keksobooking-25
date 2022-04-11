import {getAdList} from './api.js';
import {deactivateForms, activateForms} from './form.js';
import { createPriceSlider } from './price-slider.js';
import { mapInit } from './map.js';


deactivateForms();

const {setMarkers} = mapInit(activateForms);
getAdList(setMarkers);

createPriceSlider();
