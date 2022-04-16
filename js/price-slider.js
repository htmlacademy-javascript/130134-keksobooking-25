const DEFAULT_PRICE = 5000;
const priceSliderElement = document.querySelector('.ad-form__slider');
const priceInputElement = document.querySelector('#price');

const createPriceSlider = () => {
  noUiSlider.create(priceSliderElement, {
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

  priceSliderElement.noUiSlider.on('update', () => {
    priceInputElement.value = priceSliderElement.noUiSlider.get();
  });
};

const resetPriceSlider = () => priceSliderElement.noUiSlider.set(DEFAULT_PRICE);


export {createPriceSlider, resetPriceSlider};
