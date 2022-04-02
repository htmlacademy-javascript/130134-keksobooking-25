import {getAdList} from './data.js';
import {generateCards} from './generate-cards.js';
import {deactivateForms, activateForms} from './form.js';

const mapContainer = document.querySelector('#map-canvas');
const adList = getAdList();
const cardList = generateCards(adList);

deactivateForms();


const map = L.map(mapContainer)
  .on('load', () => {
    activateForms();
  }).setView({
    lat: 35.68025,
    lng: 139.76923,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const MARKER_START_COORDS = {
  lat: 35.68025,
  lng: 139.76923,
};

const addressAd = document.querySelector('#address');
const markerGroup = L.layerGroup().addTo(map);
const markerGroupMain = L.layerGroup().addTo(map);

const createMainMarker = ({lat, lng}) => {
  const mainMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  );

  mainMarker.addTo(markerGroupMain);
  addressAd.value = `${lat}, ${lng}`;

  mainMarker.on('moveend', (evt) => {
    const coords = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    addressAd.value = coords;
  });
};
createMainMarker(MARKER_START_COORDS);


function createCustomPopup (i) {
  return cardList.querySelectorAll('.popup')[i];
}

const createMarker = (point, i) => {
  const {lat, lng} = point.location;
  const adMmarker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: adIcon,
    },
  );

  adMmarker.addTo(markerGroup);
  adMmarker.bindPopup(createCustomPopup(i));
};


adList.forEach((adItem, i) => {
  createMarker(adItem, i);
});
