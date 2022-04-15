import {sendData} from './api.js';


const FILTER_DISABLE_CLASS = 'map__filters--disabled';
const FORM_DISABLE_CLASS = 'ad-form--disabled';
const filterElement = document.querySelector('.map__filters');
const formAd = document.querySelector('.ad-form');
const formFiltersEl = document.querySelector('.map__filters');


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

const activateFilterForm = () => {
  filterElement.classList.remove(FILTER_DISABLE_CLASS);
  const formFilters = filterElement.children;
  Array.from(formFilters).forEach((formItem) => {
    formItem.removeAttribute('disabled');
  });
};

const activateUserForm = () => {
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
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(titleAd, validateTitle, 'Длина должна быть от 30 до 100 символов');


const addressAd = formAd.querySelector('#address');
const validateAddress = (value) => value.length;
pristine.addValidator(addressAd, validateAddress, 'Установите точку на карте');


const priceAd = formAd.querySelector('#price');
const MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const validatePrice = (value) => {
  const type = formAd.querySelector('#type');
  return value.length && parseInt(value, 10) >= MinPrice[type.value];
};
const getPriceErrorMessage = () => {
  const type = formAd.querySelector('#type');
  return `Минимальная цена ${MinPrice[type.value]}`;
};
pristine.addValidator(priceAd, validatePrice, getPriceErrorMessage);
const onHousingTypeChange = () => {
  priceAd.placeholder = MinPrice[this.value];
  pristine.validate(priceAd);
};
formAd.querySelector('#type').addEventListener('change', onHousingTypeChange);


const roomsCountAd = formAd.querySelector('#room_number');
const capacityAd = formAd.querySelector('#capacity');
const RoomOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const validateCapacity = () => RoomOption[roomsCountAd.value].includes(capacityAd.value);

const getCapacityErrorMessage = () => {
  if (roomsCountAd.value < 100) {
    return `Максимум ${RoomOption[roomsCountAd.value].length} гост${RoomOption[roomsCountAd.value].length > 1 ? 'я' : 'ь'}`;
  }
  return 'Не для гостей';
};
const getRoomsCountErrorMessage = () => {
  if (roomsCountAd.value < 100) {
    return 'Недостаточно комнат для гостей';
  }
};
pristine.addValidator(roomsCountAd, validateCapacity, getRoomsCountErrorMessage);
pristine.addValidator(capacityAd, validateCapacity, getCapacityErrorMessage);

const timeIn = formAd.querySelector('#timein');
const timeOut = formAd.querySelector('#timeout');
const setTime = () => {
  if (this.id === 'timein' ) {
    timeOut.value = timeIn.options[timeIn.selectedIndex].value;
  } else {
    timeIn.value = timeOut.options[timeOut.selectedIndex].value;
  }
};
timeIn.addEventListener('change', setTime);
timeOut.addEventListener('change', setTime);

const submitButton = formAd.querySelector('.ad-form__submit');
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const formReset = () => {
  formAd.reset();
  formFiltersEl.reset();
  pristine.reset();
};

const setUserFormSubmit = (onSuccess, onError) => {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          formReset();
          onSuccess();
        })
        .catch(() => {
          onError();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};


export {deactivateForms, activateFilterForm, activateUserForm, setUserFormSubmit, formReset};
