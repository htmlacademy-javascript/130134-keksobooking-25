function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    console.log('Диапазон значений может быть только положительный, включая ноль.');
  }
  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    console.log('Минимальное значение должно быть меньше максимального');
  }
}

function getRandomFractional(min, max, round) {
  if (min < 0 || max < 0) {
    console.log('Диапазон значений может быть только положительный, включая ноль.');
  }
  if (min < max) {
    return (Math.random() * (max - min) + min).toFixed(round);
  } else {
    console.log('Минимальное значение должно быть меньше максимального');
  }
}

getRandomInt(0, 22);
getRandomFractional(1.1, 1.5, 3);
