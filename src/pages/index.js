import initialCards from '../utils/initialCards.js';
import formConfig from '../utils/formConfig.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

// коллекция попапов для работы с оверлеем
const popups = Array.from(document.querySelectorAll('.popup'));

// элементы попапа 1 (ред. профиль)
const btnEditProfile = document.querySelector('.button_type_edit');
const formPopupProfile = popupProfile.querySelector('.popup__form_profile');
const inputProfileName = popupProfile.querySelector('.popup__input_type_profile-name');
const inputProfileBio = popupProfile.querySelector('.popup__input_type_profile-bio');
const formValidatorPopupProfile = new FormValidator(formConfig, formPopupProfile);

// элементы попапа 2 (доб. карточку)
const btnAddCard = document.querySelector('.button_type_add');
const btnClosePopupPlace = popupPlace.querySelector('.popup__close-button_place');
const formPopupPlace = popupPlace.querySelector('.popup__form_place');
const inputPlaceName = popupPlace.querySelector('.popup__input_type_place-name');
const inputPlaceLink = popupPlace.querySelector('.popup__input_type_place-link');
const formValidatorPopupPlace = new FormValidator(formConfig, formPopupPlace);

const cards = new Section({ items: initialCards, renderer: createCard }, '.cards');
cards.renderItems();

const popupZoom = new PopupWithImage('.popup_type_image');
popupZoom.setEventListeners();

const popupProfile = new PopupWithForm({ popupSelector: '.popup_type_profile', submitFormFunc: submitFormProfile });
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm({ popupSelector: '.popup_type_place', submitFormFunc: submitFormPlace });
popupPlace.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userBioSelector: '.profile__bio' });

formValidatorPopupProfile.enableValidation();
formValidatorPopupPlace.enableValidation();

function handleCardClick({ name: name, link: link }) {
  popupZoom.open({ name: name, link: link });
}

// создать экземпляр класса карточки, вызвать при отправке формы попапа 2
function createCard(name, link) {
  const card = new Card(name, link, '.template', () => {
    handleCardClick({ name: name, link: link });
  });
  const cardElement = card.createCard();
  cards.addItem(cardElement);
}

// сброс инпутов для попапа 2, используется при его открытии
function clearPlaceInputs() {
  inputPlaceName.value = '';
  inputPlaceLink.value = '';
}

// для попапов с формой (1, 2) – открыть и задать состояние кнопки submit в зависимости от валидности
function openFormPopup(popup, formValidator) {
  formValidator.setSubmitButtonState();
  openPopup(popup);
}

function openPopupPlace(popup, formValidator) {
  clearPlaceInputs();
  openFormPopup(popup, formValidator);
}

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

function submitFormProfile(inputValues) {
  userInfo.setUserInfo({
    name: inputValues['input-profile-name'],
    bio: inputValues['input-profile-bio']
  });
}

function submitFormPlace(inputValues) {
  createCard(inputValues['input-place-name'], inputValues['input-place-bio']);
};

// ---------- Слушатели ----------
btnEditProfile.addEventListener('click', () => {
  popupProfile.open();

  inputProfileName.value = userInfo.getUserInfo().name;
  inputProfileBio.value = userInfo.getUserInfo().bio;

  formValidatorPopupProfile.setSubmitButtonState();

  popupProfile.inputs.forEach((input) => {
    formValidatorPopupProfile.hideInputError(input);
  });
});

// попап 2
btnAddCard.addEventListener('click', () => openPopupPlace(popupPlace, formValidatorPopupPlace)); // открыть попап
btnClosePopupPlace.addEventListener('click', () => closePopup(popupPlace)); // закрыть попап
formPopupPlace.addEventListener('submit', submitFormPlace); // отправить форму, добавить карточку и закрыть попап

// закрытие по клику за пределами попапа
popups.forEach((popup) => popup.addEventListener('click', closePopupByOverlayClick));
