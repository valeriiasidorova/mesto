import initialCards from '../utils/initialCards.js';
import formConfig from '../utils/formConfig.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

// элементы попапа 1 (ред. профиль)
const btnEditProfile = document.querySelector('.button_type_edit');
const formPopupProfile = document.querySelector('.popup__form_profile');
const inputProfileName = document.querySelector('.popup__input_type_profile-name');
const inputProfileBio = document.querySelector('.popup__input_type_profile-bio');
const formValidatorPopupProfile = new FormValidator(formConfig, formPopupProfile);

// элементы попапа 2 (доб. карточку)
const btnAddCard = document.querySelector('.button_type_add');
const formPopupPlace = document.querySelector('.popup__form_place');
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

function createCard(name, link) {
  const card = new Card(name, link, '.template', () => {
    handleCardClick({ name: name, link: link });
  });
  const cardElement = card.createCard();
  cards.addItem(cardElement);
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

// попап 1
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
btnAddCard.addEventListener('click', () => {
  popupPlace.open();

  formValidatorPopupPlace.setSubmitButtonState();

  popupPlace.inputs.forEach((input) => {
    formValidatorPopupPlace.hideInputError(input);
  });
})
