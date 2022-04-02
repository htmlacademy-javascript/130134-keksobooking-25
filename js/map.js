import {generateCard} from './generate-card.js';

const mapContainer = document.querySelector('#map-canvas');
const MARKER_START_COORDS = {
  lat: 35.68025,
  lng: 139.76923,
};

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

const addressAd = document.querySelector('#address');


const createMainMarker = ({lat, lng}, layer) => {
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

  mainMarker.addTo(layer);
  addressAd.value = `${lat}, ${lng}`;

  mainMarker.on('moveend', (evt) => {
    const coords = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    addressAd.value = coords;
  });
};


function mapInit (load) {
  const map = L.map(mapContainer)
    .on('load', () => {
      load();
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

  const markerGroup = L.layerGroup().addTo(map);
  const markerGroupMain = L.layerGroup().addTo(map);

  createMainMarker(MARKER_START_COORDS, markerGroupMain);

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

  const setMarkers = (data) => {
    data.forEach((dataItem) => {
      createMarker(dataItem);
    });
  };

  return {setMarkers};
}

export {mapInit};