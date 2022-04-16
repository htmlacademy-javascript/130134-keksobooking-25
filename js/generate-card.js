const generateCard = (adItem) => {
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = adItem.offer;
  const RoomTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
    hotel: 'Отель',
  };

  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = RoomTypes[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;


  if (features) {
    const featureItems = features.slice();
    const featureListElements = cardElement.querySelectorAll('.popup__feature');
    featureListElements.forEach((featureListItem) => {
      const isAvailable = featureItems.some((featureItem) => featureListItem.classList.contains(`popup__feature--${featureItem}`));
      if (!isAvailable) {
        featureListItem.remove();
      }
    });
  }

  if (description) {
    cardElement.querySelector('.popup__description').textContent = description;
  } else {
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }

  const photoListElement = cardElement.querySelector('.popup__photos');
  if (photos) {
    const photoItemElement = photoListElement.querySelector('.popup__photo');
    const listPhotos = photos.map((photo) => {
      const photoElement = photoItemElement.cloneNode(true);
      photoElement.src = photo;
      return photoElement;
    });
    photoItemElement.replaceWith(...listPhotos);
  } else {
    photoListElement.remove();
  }


  cardElement.querySelector('.popup__avatar').src = adItem.author.avatar;

  return cardElement;
};

export {generateCard};
