import initialCards from './initialCards.js';
import formConfig from './formConfig.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// коллекция попапов для работы с оверлеем
const popups = Array.from(document.querySelectorAll('.popup'));

// элементы для работы с темплейтом
const cards = document.querySelector('.cards');

// элементы попапа 1 (ред. профиль)
const popupProfile = document.querySelector('.popup_type_profile');
const btnEditProfile = document.querySelector('.button_type_edit');
const btnClosePopupProfile = popupProfile.querySelector('.popup__close-button_profile');
const formPopupProfile = popupProfile.querySelector('.popup__form_profile');
const inputProfileName = popupProfile.querySelector('.popup__input_type_profile-name');
const profileName = document.querySelector('.profile__name');
const inputProfileBio = popupProfile.querySelector('.popup__input_type_profile-bio');
const profileBio = document.querySelector('.profile__bio');
const formValidatorPopupProfile = new FormValidator(formConfig, formPopupProfile);

// элементы попапа 2 (доб. карточку)
const popupPlace = document.querySelector('.popup_type_place');
const btnAddCard = document.querySelector('.button_type_add');
const btnClosePopupPlace = popupPlace.querySelector('.popup__close-button_place');
const formPopupPlace = popupPlace.querySelector('.popup__form_place');
const inputPlaceName = popupPlace.querySelector('.popup__input_type_place-name');
const inputPlaceLink = popupPlace.querySelector('.popup__input_type_place-link');
const formValidatorPopupPlace = new FormValidator(formConfig, formPopupPlace);

// элементы попапа 3 (увеличить карточку)
const popupZoom = document.querySelector('.popup_type_image');
const popupImg = popupZoom.querySelector('.popup__img');
const popupImgTitle = popupZoom.querySelector('.popup__img-title');
const btnClosePopupZoom = popupZoom.querySelector('.popup__close-button_image');

formValidatorPopupProfile.enableValidation();
formValidatorPopupPlace.enableValidation();

// создать экземпляр класса карточки, вызвать при отправке формы попапа 2
function createCard(name, link) {
  const card = new Card(name, link, '.template', openPopupZoom);
  const cardElement = card.createCard();

  return cardElement;
}

// автозаполнение для попапа 1, используется при его открытии
function autofillProfileInputs() {
  inputProfileName.value = profileName.textContent;
  inputProfileBio.value = profileBio.textContent;
}

// сброс инпутов для попапа 2, используется при его открытии
function clearPlaceInputs() {
  inputPlaceName.value = '';
  inputPlaceLink.value = '';
}

// открыть попап – вызывается в отдельных функциях открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_is-open');
  document.addEventListener('keydown', closePopupByEsc);
}

// для попапов с формой (1, 2) – открыть и задать состояние кнопки submit в зависимости от валидности
function openFormPopup(popup, formValidator) {
  formValidator.setSubmitButtonState();
  openPopup(popup);
}

function openPopupProfile(popup, formValidator) {
  autofillProfileInputs();
  openFormPopup(popup, formValidator);
}

function openPopupPlace(popup, formValidator) {
  clearPlaceInputs();
  openFormPopup(popup, formValidator);
}

function openPopupZoom(name, link) {
  popupImg.src = link;
  popupImg.alt = name;
  popupImgTitle.textContent = name;

  openPopup(popupZoom);
};

// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_is-open');
  document.removeEventListener('keydown', closePopupByEsc);
}

// закрыть попап по клику за его пределами
function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    const popupOpened = document.querySelector('.popup_is-open');
    closePopup(popupOpened);
  }
}

// закрыть попап по нажатию на Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_is-open')) {
        closePopup(popup);
      }
    });
  }
}

function submitFormProfile(evt) {
  evt.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileBio.textContent = inputProfileBio.value;
  closePopup(popupProfile);
}

function submitFormPlace(evt) {
  evt.preventDefault();

  cards.prepend(createCard(inputPlaceName.value, inputPlaceLink.value));
  closePopup(popupPlace);
  formPopupPlace.reset();
};

// ---------- Слушатели ----------
// попап 1
btnEditProfile.addEventListener('click', () => openPopupProfile(popupProfile, formValidatorPopupProfile)); // открыть попап
btnClosePopupProfile.addEventListener('click', () => closePopup(popupProfile)); // закрыть попап
formPopupProfile.addEventListener('submit', submitFormProfile); // отправить форму, обновить инфу в профиле и закрыть попап

// попап 2
btnAddCard.addEventListener('click', () => openPopupPlace(popupPlace, formValidatorPopupPlace)); // открыть попап
btnClosePopupPlace.addEventListener('click', () => closePopup(popupPlace)); // закрыть попап
formPopupPlace.addEventListener('submit', submitFormPlace); // отправить форму, добавить карточку и закрыть попап

// попап 3
btnClosePopupZoom.addEventListener('click', () => closePopup(popupZoom));

// закрытие по клику за пределами попапа
popups.forEach((popup) => popup.addEventListener('click', closePopupByOverlayClick));

initialCards.forEach((el) => {
  cards.append(createCard(el.name, el.link));
});
