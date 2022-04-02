const priceSlider = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

function createPriceSlider () {
  noUiSlider.create(priceSlider, {
    range: {
      min: 0,
      max: 100000,
    },
    start: parseInt(priceInput.placeholder, 10),
    step: 100,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  priceSlider.noUiSlider.on('update', () => {
    priceInput.value = priceSlider.noUiSlider.get();
  });
}


export {createPriceSlider};
