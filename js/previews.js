const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const IMAGE_STYLE = 'width: 70px; height: 70px; object-fit: cover';
const CONTAINER_STYLE = 'padding: 0';
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const avatarFileChooser = document.querySelector('#avatar');
const housePhotoFileChooser = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const housePhotoPreview = document.querySelector('.ad-form__photo');

const hasMatchType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
};

const onAvatarFileChooserChange = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const img = preview.firstElementChild;

  if ( hasMatchType(file) ) {
    img.style = IMAGE_STYLE;
    preview.style = CONTAINER_STYLE;
    img.src = URL.createObjectURL(file);
  }
};

const onHousePhotoFileChooserChange = (fileChooser, preview) => {
  const file = fileChooser.files[0];

  if ( hasMatchType(file) ) {
    let img;

    if (Array.isArray(preview.children) ) {
      img = document.createElement('img');
      img.style = IMAGE_STYLE;
      img.src = URL.createObjectURL(file);
      preview.appendChild(img);
    } else {
      img = preview.firstElementChild;
      img.src = URL.createObjectURL(file);
    }
  }
};

const resetPreviewImages = () => {
  avatarPreview.firstElementChild.src = DEFAULT_AVATAR_URL;
  avatarPreview.style = '';
  avatarPreview.firstElementChild.style = '';
  if (Array.isArray(housePhotoPreview.children) ) {
    housePhotoPreview.firstElementChild.remove();
  }
};

avatarFileChooser.addEventListener('change', () => onAvatarFileChooserChange(avatarFileChooser, avatarPreview));
housePhotoFileChooser.addEventListener('change', () => onHousePhotoFileChooserChange(housePhotoFileChooser, housePhotoPreview));

export {resetPreviewImages};
