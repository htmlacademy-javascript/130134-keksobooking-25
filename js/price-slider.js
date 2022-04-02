const priceSlider = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');
const typeInput = document.querySelector('#type');

function createPriceSlider () {
  noUiSlider.create(priceSlider, {
    range: {
      min: 0,
      max: 100000,
    },
    start: parseInt(priceInput.placeholder, 10),
    step: 100,
    connect: 'lower',
  });

  priceSlider.noUiSlider.on('update', () => {
    priceInput.value = priceSlider.noUiSlider.get();
  });
}

typeInput.addEventListener('change', () => {
  priceSlider.noUiSlider.updateOptions({
    start: parseInt(priceInput.placeholder, 10),
  });
});


export {createPriceSlider};
