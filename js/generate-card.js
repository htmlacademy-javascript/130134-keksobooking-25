const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const generateCard = (adItem) => {
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = adItem.offer;
  const roomTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = roomTypes[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featureItems = features.split(', ');
  const featureList = cardElement.querySelectorAll('.popup__feature');
  featureList.forEach((featureListItem) => {
    const isAvailable = featureItems.some((featureItem) => featureListItem.classList.contains(`popup__feature--${featureItem}`));
    if (!isAvailable) {
      featureListItem.remove();
    }
  });

  if (description) {
    cardElement.querySelector('.popup__description').textContent = description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }


  const photoListElement = cardElement.querySelector('.popup__photos');
  const photoItem = photoListElement.querySelector('.popup__photo');
  photos.forEach((photo) => {
    const photoElement = photoItem.cloneNode(true);
    photoElement.src = photo;
    photoListElement.append(photoElement);
  });
  // первый пустой img остается в разметке, я его топорно удаляю. Может как-то иначе можно?
  photoItem.remove();

  cardElement.querySelector('.popup__avatar').src = adItem.author.avatar;

  return cardElement;
};

export {generateCard};
