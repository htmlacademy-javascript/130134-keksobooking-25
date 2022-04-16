import {setUserFormSubmit, formReset} from './form.js';
import {createPriceSlider, resetPriceSlider} from './price-slider.js';
import {resetMap} from './map.js';
import {sendDataError, sendDataSuccess} from './notices.js';


createPriceSlider();

const resetBtnElement = document.querySelector('.ad-form__reset');
resetBtnElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
  resetPriceSlider();
  resetMap();
});


setUserFormSubmit(() => {
  sendDataSuccess();
  resetPriceSlider();
  resetMap();
},
() => {
  sendDataError();
}
);
