import {getAdList} from './data.js';
import {generateCards} from './generate-cards.js';
import {deactivateForms, activateForms} from './form.js';

const mapContainer = document.querySelector('#map-canvas');
const adList = getAdList();
const cardList = generateCards(adList);


deactivateForms();

// document.addEventListener('keypress', (evt) => {
//   if(evt.key === 'Enter') {
//     activateForms();
//   }
// }, { once: true });


const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  }).setView({
    lat: 35.65960192064806,
    lng: 139.74541672508437,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker(
  {
    lat: 35.65960192064806,
    lng: 139.74541672508437,
  },
  {
    draggable: true,
  }
);


marker.addTo(map);


