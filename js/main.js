import {setUserFormSubmit, formReset} from './form.js';
import {createPriceSlider, resetPriceSlider} from './price-slider.js';
import {resetMap} from './map.js';
import {sendDataError, sendDataSuccess} from './notices.js';


createPriceSlider();

const resetBtn = document.querySelector('.ad-form__reset');
resetBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
  resetPriceSlider();
  resetMap();
});


setUserFormSubmit(() => {
  sendDataSuccess();
  resetPriceSlider();
  setTimeout(() => {
    resetMap();
  }, 200); // без задержки не работает установка координат в поле формы
},
() => {
  sendDataError();
}
);
