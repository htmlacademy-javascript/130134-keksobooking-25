const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarInput = document.querySelector('#avatar');
const avatarLabel = document.querySelector('.ad-form-header__drop-zone');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const housingInput = document.querySelector('#images');
const housingLabel = document.querySelector('.ad-form__drop-zone');
const housingPreview = document.querySelector('.ad-form__photo');
const fishUrl = avatarPreview.children[0].src;

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
  setPreview(avatarInput, avatarLabel, avatarPreview);
  setPreview(housingInput, housingLabel, housingPreview);
};

const clearPreview = () => {
  avatarPreview.children[0].src = fishUrl;
  housingPreview.style.backgroundImage = '';
};


export {setImgPreview, clearPreview};
