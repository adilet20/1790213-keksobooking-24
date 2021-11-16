import { showAlert } from './utils.js';

const FILE_TYPES = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
  'image/x-icon',
  'image/tiff',
];


const IMAGE_STYLE = 'width: 70px; height: 70px; object-fit: cover';

const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';
const ALERT_MESSAGE = 'Неподдерживаемый формат файла';

const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('.ad-form__input');
const photosPreviewContainer = document.querySelector('.ad-form__photo');

const setAvatarPreview = (input, preview) => {
  const file = input.files[0];
  const matches = FILE_TYPES.includes(file.type);

  if (matches) {
    const previewFotoImg = document.createElement('img');
    preview.src = URL.createObjectURL(file);
    previewFotoImg.style = IMAGE_STYLE;
  } else {
    showAlert(ALERT_MESSAGE);
  }
};

const setPhotoPreview = (input, previewContainer) => {
  const file = input.files[0];
  const matches = FILE_TYPES.includes(file.type);

  if (matches) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      previewContainer.style.backgroundImage = `url("${reader.result}")`;
      previewContainer.style.backgroundSize = 'cover';
    });
  } else {
    showAlert(ALERT_MESSAGE);
  }
};

const onAvatarChange = () => setAvatarPreview(avatarInput, avatarPreview);

const onPhotoChange = () => setPhotoPreview(photoInput, photosPreviewContainer);

const setPreviews = () => {
  avatarInput.addEventListener('change', onAvatarChange);
  photoInput.addEventListener('change', onPhotoChange);
};

const clearAvatarPreview = () => {
  avatarInput.value = '';
  avatarPreview.src = DEFAULT_AVATAR_URL;
};

const clearPhotosPreview = () => {
  photosPreviewContainer.style.backgroundImage = 'none';
};

const resetPreviewImages = () => {
  clearAvatarPreview();
  clearPhotosPreview();
};

export {
  setPreviews,
  resetPreviewImages
};
