import {setMarkers} from './map.js';
import {debounce} from './util.js';

const MARKERS_MAX_COUNT = 10;
const RERENDER_DELAY = 500;
const filterElement = document.querySelector('.map__filters');
const housingFilterElement = filterElement.querySelector('#housing-type');
const priceFilterElement = filterElement.querySelector('#housing-price');
const roomsFilterElement = filterElement.querySelector('#housing-rooms');
const guestsFilterElement = filterElement.querySelector('#housing-guests');
const featureFilterElements = filterElement.querySelectorAll('.map__checkbox');


const checkHousing = (item) => housingFilterElement.value === 'any' || (housingFilterElement.value === item.offer.type);

const checkPrice = (item) => {
  switch (priceFilterElement.value) {
    case 'low':
      return item.offer.price < 10000;
    case 'middle':
      return item.offer.price >= 10000 && item.offer.price < 50000;
    case 'high':
      return item.offer.price >= 50000;
    default:
      return true;
  }
};

const checkRooms = (item) => roomsFilterElement.value === 'any' || (roomsFilterElement.value === item.offer.rooms.toString());

const checkGuests = (item) => guestsFilterElement.value === 'any' || (guestsFilterElement.value === item.offer.guests.toString());

const featuresFilter = (item) => {
  const checkedFeatures = Array.from(featureFilterElements).filter((it) => it.checked).map((it) => it.value);
  if (!checkedFeatures.length) {
    return true;
  }
  if (!item.offer.features) {
    return false;
  }
  const selectedFeatures = checkedFeatures.filter((it) => item.offer.features.includes(it));
  return checkedFeatures.length === selectedFeatures.length;
};

const filter = (data) => data.filter((item) => checkHousing(item)
    && checkPrice(item)
    && checkRooms(item)
    && checkGuests(item)
    && featuresFilter(item)
).slice(0, MARKERS_MAX_COUNT);

filterElement.addEventListener('change', debounce(() => setMarkers(), RERENDER_DELAY));


export {filter};
