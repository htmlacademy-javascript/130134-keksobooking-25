import {generateCard} from './generate-card.js';

const cardListFragment = document.createDocumentFragment();

const generateCards = (adList) => {
  adList.forEach((adItem) => {
    const newCard = generateCard(adItem);
    cardListFragment.append(newCard);
  });
  return cardListFragment;
};

export {generateCards};
