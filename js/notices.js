const mapElement = document.querySelector('.map');

const getDataError = (message) => {
  const errElement = document.createElement('div');
  const titleElement = document.createElement('h3');
  const infoElement = document.createElement('p');
  errElement.classList.add('error-fetch');
  errElement.style.position = 'absolute';
  errElement.style.top = '0';
  errElement.style.left = '0';
  errElement.style.zIndex = '1000';
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

const popupErrorClose = () => {
  sendErrorElement.remove();
  sendErrorElement.removeEventListener('click', popupErrorClickHandler);
  document.removeEventListener('keydown', popupErrorEscHandler);
};

function popupErrorClickHandler (evt) {
  if (evt.target.classList.contains('error') || evt.target.classList.contains('error__button')) {
    popupErrorClose();
  }
}

function popupErrorEscHandler (evt) {
  if (evt.code === 'Escape') {
    popupErrorClose();
  }
}

const sendDataError = () => {
  sendErrorElement.addEventListener('click', popupErrorClickHandler);
  document.addEventListener('keydown', popupErrorEscHandler);
  document.body.appendChild(sendErrorElement);
};


const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);

const popupSuccessClose = () => {
  successElement.remove();
  successElement.removeEventListener('click', popupSuccessClickHandler);
  document.removeEventListener('keydown', popupSuccessEscHandler);
};

function popupSuccessClickHandler (evt) {
  if (evt.target.classList.contains('success')) {
    popupSuccessClose();
  }
}

function popupSuccessEscHandler (evt) {
  if (evt.code === 'Escape') {
    popupSuccessClose();
  }
}

const sendDataSuccess = () => {
  successElement.addEventListener('click', popupSuccessClickHandler);
  document.addEventListener('keydown', popupSuccessEscHandler);
  document.body.appendChild(successElement);
};

export {getDataError, sendDataError, sendDataSuccess};
