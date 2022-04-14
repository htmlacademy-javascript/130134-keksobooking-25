function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

function mixElements(elements) {
  elements.forEach((element, index, items) => {
    const randomIndex = getRandomPositiveInteger(0, elements.length - 1);
    const current = items[index];
    items[index] = items[randomIndex];
    items[randomIndex] = current;
  });
  return elements;
}

function getRandomStringFromArray(elements) {
  return mixElements(elements).slice(0, getRandomPositiveInteger(1, elements.length - 1)).join(', ');
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {debounce, getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomStringFromArray};
