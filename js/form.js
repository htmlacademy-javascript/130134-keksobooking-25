import {sendData} from './api.js';
import {setImgPreview, clearPreview} from './preview.js';


const FILTER_DISABLE_CLASS = 'map__filters--disabled';
const FORM_DISABLE_CLASS = 'ad-form--disabled';
const MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const RoomOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
const filterElement = document.querySelector('.map__filters');
const formAdElement = document.querySelector('.ad-form');
const formFiltersElement = document.querySelector('.map__filters');

setImgPreview();

const deactivateForms = () => {
  filterElement.classList.add(FILTER_DISABLE_CLASS);
  const formFilters = filterElement.children;
  Array.from(formFilters).forEach((formItem) => {
    formItem.setAttribute('disabled', '');
  });

  formAdElement.classList.add(FORM_DISABLE_CLASS);
  const formAdItems = formAdElement.children;
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
  formAdElement.classList.remove(FORM_DISABLE_CLASS);
  const formAdItems = formAdElement.children;
  Array.from(formAdItems).forEach((formItem) => {
    formItem.removeAttribute('disabled');
  });
};

const pristine = new Pristine(formAdElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);


const titleAdElement = formAdElement.querySelector('#title');
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
pristine.addValidator(titleAdElement, validateTitle, 'Длина должна быть от 30 до 100 символов');


const addressAdElement = formAdElement.querySelector('#address');
const validateAddress = (value) => value.length;
pristine.addValidator(addressAdElement, validateAddress, 'Установите точку на карте');


const priceAdElement = formAdElement.querySelector('#price');

const validatePrice = (value) => {
  const type = formAdElement.querySelector('#type');
  return value.length && parseInt(value, 10) >= MinPrice[type.value];
};
const getPriceErrorMessage = () => {
  const type = formAdElement.querySelector('#type');
  return `Минимальная цена ${MinPrice[type.value]}`;
};
pristine.addValidator(priceAdElement, validatePrice, getPriceErrorMessage);
const onHousingTypeChange = () => {
  priceAdElement.placeholder = MinPrice[this.value];
  pristine.validate(priceAdElement);
};
formAdElement.querySelector('#type').addEventListener('change', onHousingTypeChange);


const roomsCountAdElement = formAdElement.querySelector('#room_number');
const capacityAdElement = formAdElement.querySelector('#capacity');

const validateCapacity = () => RoomOption[roomsCountAdElement.value].includes(capacityAdElement.value);

const getCapacityErrorMessage = () => {
  if (roomsCountAdElement.value < 100) {
    return `Максимум ${RoomOption[roomsCountAdElement.value].length} гост${RoomOption[roomsCountAdElement.value].length > 1 ? 'я' : 'ь'}`;
  }
  return 'Не для гостей';
};
const getRoomsCountErrorMessage = () => {
  if (roomsCountAdElement.value < 100) {
    return 'Недостаточно комнат для гостей';
  }
};
pristine.addValidator(roomsCountAdElement, validateCapacity, getRoomsCountErrorMessage);
pristine.addValidator(capacityAdElement, validateCapacity, getCapacityErrorMessage);

const timeInElement = formAdElement.querySelector('#timein');
const timeOutElement = formAdElement.querySelector('#timeout');
const setTime = (evt) => {
  if (evt.target.id === 'timein' ) {
    timeOutElement.value = timeInElement.options[timeInElement.selectedIndex].value;
  } else {
    timeInElement.value = timeOutElement.options[timeOutElement.selectedIndex].value;
  }
};
timeInElement.addEventListener('change', setTime);
timeOutElement.addEventListener('change', setTime);

const submitButtonElement = formAdElement.querySelector('.ad-form__submit');
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const formReset = () => {
  formAdElement.reset();
  clearPreview();
  formFiltersElement.reset();
  pristine.reset();
};

const setUserFormSubmit = (onSuccess, onError) => {
  formAdElement.addEventListener('submit', (evt) => {
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
