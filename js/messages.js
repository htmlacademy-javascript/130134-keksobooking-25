import {formReset} from './form.js';

const mapElement = document.querySelector('.map');

const getDataError = (message) => {
  const errElement = document.createElement('div');
  const titleElement = document.createElement('h3');
  const infoElement = document.createElement('p');
  errElement.style.position = 'absolute';
  errElement.style.top = 0;
  errElement.style.left = 0;
  errElement.style.zIndex = 1000;
  errElement.style.backgroundColor = '#ff6d49';
  errElement.style.padding = '10px';
  errElement.style.width = '100%';
  titleElement.style.textAlign = 'center';
  titleElement.style.color = 'white';
  titleElement.textContent = 'Ошибка! Не удалось загрузить объявления';
  infoElement.style.textAlign = 'center';
  infoElement.style.color = 'white';
  infoElement.textContent = message;

  errElement.appendChild(titleElement);
  errElement.appendChild(infoElement);
  mapElement.appendChild(errElement);

};

const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const sendErrorElement = sendErrorTemplate.cloneNode(true);
const popupErrorClose = (evt) => {
  if (evt.target.classList.contains('error') || evt.target.classList.contains('error__button')) {
    sendErrorElement.remove();
    sendErrorElement.removeEventListener('click', popupErrorClose);
    document.removeEventListener('keydown', popupErrorEscClose);
  }
};
function popupErrorEscClose (evt) {
  if (evt.code === 'Escape') {
    sendErrorElement.remove();
    sendErrorElement.removeEventListener('click', popupErrorClose);
    document.removeEventListener('keydown', popupErrorEscClose);
  }
}

const sendDataError = () => {
  sendErrorElement.addEventListener('click', popupErrorClose);
  document.addEventListener('keydown', popupErrorEscClose);
  document.body.appendChild(sendErrorElement);
};


const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const popupSuccessClose = (evt) => {
  if (evt.target.classList.contains('success')) {
    successElement.remove();
    successElement.removeEventListener('click', popupSuccessClose);
    document.removeEventListener('keydown', popupSuccessEscClose);
  }
};
function popupSuccessEscClose (evt) {
  if (evt.code === 'Escape') {
    successElement.remove();
    successElement.removeEventListener('click', popupSuccessClose);
    document.removeEventListener('keydown', popupSuccessEscClose);
  }
}

const onSuccess = () => {
  successElement.addEventListener('click', popupSuccessClose);
  document.addEventListener('keydown', popupSuccessEscClose);
  formReset();
  document.body.appendChild(successElement);
};

export {getDataError, sendDataError, onSuccess};
