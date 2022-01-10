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

// элементы попапа 1 (ред. профиль)
const popupProfile = document.querySelector('.popup_type_profile');
const btnEditProfile = document.querySelector('.button_type_edit');
const btnClosePopupProfile = popupProfile.querySelector('.popup__close-button_profile');
const formPopupProfile = popupProfile.querySelector('.popup__form_profile');

const inputName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const inputBio = document.querySelector('.popup__input_type_bio');
const profileBio = document.querySelector('.profile__bio');

// элементы попапа 2 (доб. карточку)
const popupPlace = document.querySelector('.popup_type_place');
const btnAddCard = document.querySelector('.button_type_add');
const btnClosePopupPlace = popupPlace.querySelector('.popup__close-button_place');
const formPopupPlace = popupPlace.querySelector('.popup__form_place');


// задача 1: создать темплейт для карточек +
// отрефакторить под следующие задачи
const template = document.querySelector('.template').content;
const cards = document.querySelector('.cards');

initialCards.forEach((el) => {
  const cardContent = template.cloneNode(true);

  cardContent.querySelector('.card__image').src = el.link;
  cardContent.querySelector('.card__image').alt = el.name;
  cardContent.querySelector('.card__title').textContent = el.name;

  // задача 3: вынести в отдельную функцию?
  cards.append(cardContent);
});

// задача 2: привязать кнопки к попапу добавления карточки (попап 2) +
//           переписать сабмиты форм

// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_is-open');

  // рефакторинг: вынести в отдельную функцию
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
}

// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_is-open');
}

/*
function popupClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closePopup();
  }
}
*/

function submitForm(e) {
  // нужен рефакторинг
  e.preventDefault();

  // рефакторинг: вынести в отдельную функцию
  // или создать отдельную ф-цию для каждой формы
    // profileName.textContent = inputName.value;
    // profileBio.textContent = inputBio.value;
  closePopup(popup);
}


// ---------- Слушатели ----------

// открыть/закрыть попап 1
btnEditProfile.addEventListener('click', () => openPopup(popupProfile));
btnClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));

// popup.addEventListener('click', popupClickHandler);
popupForm.addEventListener('submit', submitForm); // нужен рефакторинг

// открыть/закрыть попап 2
btnAddCard.addEventListener('click', () => openPopup(popupPlace));
btnClosePopupPlace.addEventListener('click', () => closePopup(popupPlace));
