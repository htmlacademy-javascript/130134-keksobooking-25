import {getAdList} from './data.js';
import {generateCards} from './generate-cards.js';

const mapContainer = document.querySelector('#map-canvas');
const adList = getAdList();
const cardList = generateCards(adList);
mapContainer.append(cardList.querySelector('.popup'));
