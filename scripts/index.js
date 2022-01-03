const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const editButton = document.querySelector('.button_type_edit');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const inputBio = document.querySelector('.popup__input_type_bio');
const profileBio = document.querySelector('.profile__bio');

// задача 1: создать темплейт
// найти в DOM  (".template").content
// cloneNode('true')
// forEach
// append

function openPopup() {
  popup.classList.add('popup_is-open');
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
}

function closePopup() {
  popup.classList.remove('popup_is-open');
}

/*
  function popupClickHandler(event) {
    if (event.target.classList.contains('popup')) {
      closePopup();
    }
  }
*/

function submitForm(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
// popup.addEventListener('click', popupClickHandler);
popupForm.addEventListener('submit', submitForm);
