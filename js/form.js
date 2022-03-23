const FILTER_DISABLE_CLASS = 'map__filters--disabled';
const FORM_DISABLE_CLASS = 'ad-form--disabled';
const filterElement = document.querySelector('.map__filters');
const formAd = document.querySelector('.ad-form');

const deactivateForms = () => {
  filterElement.classList.add(FILTER_DISABLE_CLASS);
  const formFilters = filterElement.children;
  Array.from(formFilters).forEach((formItem) => {
    formItem.setAttribute('disabled', '');
  });

  formAd.classList.add(FORM_DISABLE_CLASS);
  const formAdItems = formAd.children;
  Array.from(formAdItems).forEach((formItem) => {
    formItem.setAttribute('disabled', '');
  });
};

const activateForms = () => {
  filterElement.classList.remove(FILTER_DISABLE_CLASS);
  const formFilters = filterElement.children;
  Array.from(formFilters).forEach((formItem) => {
    formItem.removeAttribute('disabled');
  });

  formAd.classList.remove(FORM_DISABLE_CLASS);
  const formAdItems = formAd.children;
  Array.from(formAdItems).forEach((formItem) => {
    formItem.removeAttribute('disabled');
  });
};


const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);


const titleAd = formAd.querySelector('#title');
function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}
pristine.addValidator(titleAd, validateTitle, 'Длина должна быть от 30 до 100 символов');


const addressAd = formAd.querySelector('#address');
function validateAddress(value) {
  return value.length;
}
pristine.addValidator(addressAd, validateAddress, 'Установите точку на карте');


const priceAd = formAd.querySelector('#price');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
function validatePrice(value) {
  const type = formAd.querySelector('#type');
  return value.length && parseInt(value, 10) >= minPrice[type.value];
}
function getPriceErrorMessage() {
  const type = formAd.querySelector('#type');
  return `Минимальная цена ${minPrice[type.value]}`;
}
pristine.addValidator(priceAd, validatePrice, getPriceErrorMessage);
function onHousingTypeChange() {
  priceAd.placeholder = minPrice[this.value];
  pristine.validate(priceAd);
}
formAd.querySelector('#type').addEventListener('change', onHousingTypeChange);


const roomsCountAd = formAd.querySelector('#room_number');
const capacityAd = formAd.querySelector('#capacity');
const roomOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

function validateCapacity() {
  return roomOption[roomsCountAd.value].includes(capacityAd.value);
}

function getCapacityErrorMessage() {
  if (roomsCountAd.value < 100) {
    return `Максимум ${roomOption[roomsCountAd.value].length} гост${roomOption[roomsCountAd.value].length > 1 ? 'я' : 'ь'}`;
  }
  return `Не для гостей`;
}
function getRoomsCountErrorMessage() {
  if (roomsCountAd.value < 100) {
    return `Недостаточно комнат для гостей`;
  }
}
pristine.addValidator(roomsCountAd, validateCapacity, getRoomsCountErrorMessage);
pristine.addValidator(capacityAd, validateCapacity, getCapacityErrorMessage);


formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


export {deactivateForms, activateForms};
