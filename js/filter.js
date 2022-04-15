import {setMarkers} from './map.js';
import { debounce } from './util.js';

const MARKERS_MAX_COUNT = 10;
const filterElement = document.querySelector('.map__filters');
const housingFilter = filterElement.querySelector('#housing-type');
const priceFilter = filterElement.querySelector('#housing-price');
const roomsFilter = filterElement.querySelector('#housing-rooms');
const guestsFilter = filterElement.querySelector('#housing-guests');
const featureFilterElements = filterElement.querySelectorAll('.map__checkbox');
const RERENDER_DELAY = 1500;

function checkHousing(item) {
  return housingFilter.value === 'any' ? true : (housingFilter.value === item.offer.type);
}

function checkPrice(item) {
  switch (priceFilter.value) {
    case 'low':
      return item.offer.price < 10000;
    case 'middle':
      return item.offer.price >= 10000 && item.offer.price < 50000;
    case 'high':
      return item.offer.price >= 50000;
    default:
      return true;
  }
}

function checkRooms(item) {
  return roomsFilter.value === 'any' ? true : (roomsFilter.value === item.offer.rooms.toString());
}

function checkGuests(item) {
  return guestsFilter.value === 'any' ? true : (guestsFilter.value === item.offer.guests.toString());
}

function featuresFilter(item) {
  const featuresChecked = Array.from(featureFilterElements).filter((it) => it.checked).map((it) => it.value);
  if (!featuresChecked.length) {
    return true;
  }
  if (!item.offer.features) {
    return false;
  }
  const selectedFeatures = featuresChecked.filter((it) => item.offer.features.includes(it));
  return featuresChecked.length === selectedFeatures.length;
}

function filter(data) {
  const filterData = data.filter((item) => checkHousing(item)
  && checkPrice(item)
  && checkRooms(item)
  && checkGuests(item)
  && featuresFilter(item)
  ).slice(0, MARKERS_MAX_COUNT);

  return filterData;
}

housingFilter.addEventListener('change', () => {
  setMarkers();
});
priceFilter.addEventListener('change', () => {
  setMarkers();
});
roomsFilter.addEventListener('change', () => {
  setMarkers();
});
guestsFilter.addEventListener('change', () => {
  setMarkers();
});

for (const featureItem of featureFilterElements) {
  featureItem.addEventListener('change', debounce(() => setMarkers(), RERENDER_DELAY));
}


export {filter};
