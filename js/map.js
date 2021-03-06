import {generateCard} from './generate-card.js';
import {fetchData} from './api.js';
import {filter} from './filter.js';
import {getDataError} from './notices.js';
import {activateFilterForm, activateUserForm} from './form.js';


const MAP_ZOOM = 13;
const MARKER_START_COORDS = {
  lat: 35.68025,
  lng: 139.76923,
};
const mapContainerElement = document.querySelector('#map-canvas');
const addressAdElement = document.querySelector('#address');

const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const createMainMarker = ({lat, lng}, layer) => {
  const mainMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: true,
      icon: mainIcon,
      zIndexOffset: 900,
    },
  );

  mainMarker.addTo(layer);
  addressAdElement.value = `${lat}, ${lng}`;

  mainMarker.on('move', (evt) => {
    const coords = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    addressAdElement.value = coords;
  });
};

const map = L.map(mapContainerElement);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);
const markerGroupMain = L.layerGroup().addTo(map);

const createMarker = (point) => {
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
  adMmarker.bindPopup(generateCard(point));
};

map.on('load', () => {
  createMainMarker(MARKER_START_COORDS, markerGroupMain);
  setMarkers();
  activateUserForm();
}).setView(MARKER_START_COORDS, MAP_ZOOM);


function setMarkers () {
  markerGroup.clearLayers();
  fetchData()
    .then((data) => {
      const filteredData = filter(data);
      filteredData.forEach((dataItem) => {
        createMarker(dataItem);
      });
    })
    .then(activateFilterForm)
    .catch(getDataError);
}

const resetMap = () => {
  map.setView(MARKER_START_COORDS, MAP_ZOOM);
  markerGroup.clearLayers();
  markerGroupMain.clearLayers();
  createMainMarker(MARKER_START_COORDS, markerGroupMain);
  setMarkers();
};


export {setMarkers, resetMap};
