const START_RANGE = 1;
const END_RANGE = 10;
const PRICE_MIN = 100;
const PRICE_MAX = 10000;
const ROOMS_MIN = 2;
const ROOMS_MAX = 19;
const TITLES = ['Просторная квартира в центре', 'Новый отель в самом центре', 'Небольшой домик в спальном районе', 'Уютный дворец на первой линии'];
const DESCRIPTIONS = ['Отличная квартирка, ремонт свежий', 'Отель новый, 5 звёзд, есть СПА и ресторан', 'Чудестный домик в тихом районе, свой двор, мангал, качели', 'Дворец он и в Африке дворец'];
const ROOMSTYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LAT_START = 35.65000;
const LAT_END = 35.70000;
const LNG_START = 139.70000;
const LNG_END = 139.80000;
const ADS_COUNT = 10;

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function mixElements(elements) {
  elements.forEach((element, index, items) => {
    const randomIndex = getRandomPositiveInteger(0, elements.length - 1);
    const current = items[index];
    items[index] = items[randomIndex];
    items[randomIndex] = current;
  });
  return elements;
}
function getRandomStringFromArray(elements) {
  return mixElements(elements).slice(0, getRandomPositiveInteger(1, elements.length - 1)).join(', ');
}

function getAvatarNumber () {
  const number = getRandomPositiveInteger(START_RANGE, END_RANGE);
  return number < 10 ? `0${number}` : number;
}

function getPhotos (elements) {
  const elementItem = () => getRandomArrayElement(elements);
  const photos = Array.from({length: getRandomPositiveInteger (3, 10)}, elementItem);
  return photos;
}


const createAd = () => ({
  author: {
    avatar: `img/avatars/user${getAvatarNumber()}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLES),
    address: `${getRandomPositiveFloat(LAT_START, LAT_END, 5)}, ${getRandomPositiveFloat(LNG_START, LNG_END, 5)}`,
    price: getRandomPositiveInteger(PRICE_MIN, PRICE_MAX),
    type: getRandomArrayElement(ROOMSTYPE),
    rooms: getRandomPositiveInteger(ROOMS_MIN, ROOMS_MAX),
    guests: getRandomPositiveInteger(ROOMS_MIN, ROOMS_MAX),
    checkin: getRandomArrayElement(CHECKINOUT),
    checkout: getRandomArrayElement(CHECKINOUT),
    features: getRandomStringFromArray(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getPhotos(PHOTOS),
  },
  location: {
    lat: getRandomPositiveFloat(LAT_START, LAT_END, 5),
    lng: getRandomPositiveFloat(LNG_START, LNG_END, 5),
  }
});

// console.log(createAd());

// const ads = Array.from({length: ADS_COUNT}, createAd);
// console.log(ads);
