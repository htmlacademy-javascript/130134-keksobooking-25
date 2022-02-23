function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Числа должны быть только положительными');
  }
  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    return Math.floor(Math.random() * (min - max + 1) + max);
  }
}

function getRandomFractional(min, max, round) {
  if (min < 0 || max < 0) {
    throw new Error('Числа должны быть только положительными');
  }
  if (min < max) {
    return (Math.random() * (max - min) + min).toFixed(round);
  } else {
    return (Math.random() * (min - max) + max).toFixed(round);
  }
}

getRandomInt(0, 22);
getRandomFractional(1.1, 1.5, 3);
