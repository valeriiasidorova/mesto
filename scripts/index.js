const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const editButton = document.querySelector('.button_type_edit');
const popupForm = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const inputBio = document.querySelector('.popup__input_type_bio');
const profileBio = document.querySelector('.profile__bio');

// задача 1: создать темплейт для карточек
const template = document.querySelector('.template').content;
const cards = document.querySelector('.cards');

initialCards.forEach((el) => {
  const cardContent = template.cloneNode(true);

  cardContent.querySelector('.card__image').src = el.link;
  cardContent.querySelector('.card__image').alt = el.name;
  cardContent.querySelector('.card__title').textContent = el.name;

  cards.append(cardContent); //задача 3: вынести в отдельную функцию?
});

function openPopup() {
  popup.classList.add('popup_is-open');

  // вынести в отдельную функцию
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
