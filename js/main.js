import {getAdList} from './data.js';
import {deactivateForms, activateForms} from './form.js';
import { createPriceSlider } from './price-slider.js';
import { mapInit } from './map.js';


const adList = getAdList();

deactivateForms();

const {setMarkers} = mapInit(activateForms);
setMarkers(adList);

createPriceSlider();
