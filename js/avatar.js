const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarInput = document.querySelector('#avatar');
const avatarLabel = document.querySelector('.ad-form-header__drop-zone');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const setAvatarPreview = () => {
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};


export {setAvatarPreview};
