import {getAdList} from './data.js';
import {generateCards} from './generate-cards.js';
import {deactivateForms, activateForms} from './form.js';

const mapContainer = document.querySelector('#map-canvas');
const adList = getAdList();
const cardList = generateCards(adList);
mapContainer.append(cardList.querySelector('.popup'));


// deactivateForms();

// document.addEventListener('keypress', (evt) => {
//   if(evt.key === 'Enter') {
//     activateForms();
//   }
// }, { once: true });
