const DEFAULT_PRICE = 5000;
const priceSlider = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

const createPriceSlider = () => {
  noUiSlider.create(priceSlider, {
    range: {
      min: 0,
      max: 100000,
    },
    start: DEFAULT_PRICE,
    step: 100,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });

  priceSlider.noUiSlider.on('update', () => {
    priceInput.value = priceSlider.noUiSlider.get();
  });
};

const resetPriceSlider = () => priceSlider.noUiSlider.set(DEFAULT_PRICE);


export {createPriceSlider, resetPriceSlider};
