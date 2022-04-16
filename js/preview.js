const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarInputElement = document.querySelector('#avatar');
const avatarLabelElement = document.querySelector('.ad-form-header__drop-zone');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview');
const housingInputElement = document.querySelector('#images');
const housingLabelElement = document.querySelector('.ad-form__drop-zone');
const housingPreviewElement = document.querySelector('.ad-form__photo');
const fishUrl = avatarPreviewElement.children[0].src;

const onDrag = (evt) => {
  evt.preventDefault();
  evt.target.style.border = 'dashed 3px #ff5722';
};

const setUrl = (container, data) => {
  if (container.hasChildNodes()) {
    container.children[0].src = URL.createObjectURL(data);
  } else {
    container.style.backgroundImage = `url(${URL.createObjectURL(data)})`;
    container.style.backgroundSize = 'contain';
  }
};

const setPreview = (input, label, imgContainer) => {
  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      setUrl(imgContainer, file);
    }
  });

  label.addEventListener('dragenter', onDrag);
  label.addEventListener('dragover', onDrag);
  label.addEventListener('dragleave', (evt) => {
    evt.preventDefault();
    evt.target.style.border = '';
  });

  label.addEventListener('drop', (evt) => {
    evt.preventDefault();
    const file = evt.dataTransfer.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      setUrl(imgContainer, file);
      evt.target.style.border = '';
    }
  });
};

const setImgPreview = () => {
  setPreview(avatarInputElement, avatarLabelElement, avatarPreviewElement);
  setPreview(housingInputElement, housingLabelElement, housingPreviewElement);
};

const clearPreview = () => {
  avatarPreviewElement.children[0].src = fishUrl;
  housingPreviewElement.style.backgroundImage = '';
};


export {setImgPreview, clearPreview};
