import './index.css';
import {
  btnEditProfile,
  formPopupProfile,
  inputProfileName,
  inputProfileBio,
  btnAddCard,
  formPopupPlace
} from '../utils/constants.js';
import initialCards from '../utils/initialCards.js';
import formConfig from '../utils/formConfig.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';

// экземпляры классов
const cards = new Section({
  items: initialCards, renderer: (card) => cards.appendItem(createCard(card.name, card.link))
}, '.cards');
cards.renderItems();

const popupZoom = new PopupWithImage('.popup_type_image');
popupZoom.setEventListeners();

const popupProfile = new PopupWithForm({ popupSelector: '.popup_type_profile', submitFormFunc: submitFormProfile });
popupProfile.setEventListeners();

const popupPlace = new PopupWithForm({ popupSelector: '.popup_type_place', submitFormFunc: submitFormPlace });
popupPlace.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userBioSelector: '.profile__bio' });

const formValidatorPopupProfile = new FormValidator(formConfig, formPopupProfile);
formValidatorPopupProfile.enableValidation();

const formValidatorPopupPlace = new FormValidator(formConfig, formPopupPlace);
formValidatorPopupPlace.enableValidation();


function handleCardClick({ name: name, link: link }) {
  popupZoom.open({ name: name, link: link });
};

function createCard(name, link) {
  const card = new Card(name, link, '.template', () => {
    handleCardClick({ name: name, link: link });
  });
  const cardElement = card.createCard();

  return cardElement;
};

function submitFormProfile(inputValues) {
  userInfo.setUserInfo({
    name: inputValues['input-profile-name'],
    bio: inputValues['input-profile-bio']
  });
  popupProfile.close();
};

function submitFormPlace(inputValues) {
  const card = {
    name: inputValues['input-place-name'],
    link: inputValues['input-place-link']
  }
  cards.prependItem(createCard(card.name, card.link));
  popupPlace.close();
};

// ---------- Слушатели ----------
// попап 1
btnEditProfile.addEventListener('click', () => {
  popupProfile.open();

  inputProfileName.value = userInfo.getUserInfo().name;
  inputProfileBio.value = userInfo.getUserInfo().bio;

  formValidatorPopupProfile.resetValidation();
});

// попап 2
btnAddCard.addEventListener('click', () => {
  popupPlace.open();

  formValidatorPopupPlace.resetValidation();
});
