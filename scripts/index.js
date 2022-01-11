const popup = document.querySelector('.popup');

// элементы для работы с темплейтом
const template = document.querySelector('.template').content;
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

// элементы попапа 2 (доб. карточку)
const popupPlace = document.querySelector('.popup_type_place');
const btnAddCard = document.querySelector('.button_type_add');
const btnClosePopupPlace = popupPlace.querySelector('.popup__close-button_place');
const formPopupPlace = popupPlace.querySelector('.popup__form_place');
const inputPlaceName = popupPlace.querySelector('.popup__input_type_place-name');
const inputPlaceLink = popupPlace.querySelector('.popup__input_type_place-link');

initialCards.forEach(addCard);

function createCard(el) {
  const cardContent = template.cloneNode(true);
  const cardImage = cardContent.querySelector('.card__image');

  cardContent.querySelector('.card__title').textContent = el.name;
  cardImage.src = el.link;
  cardImage.alt = el.name;

  return cardContent;
}

function addCard(el) {
  cards.prepend(createCard(el));
}

function autofillProfileInputs() {
  inputProfileName.value = profileName.textContent;
  inputProfileBio.value = profileBio.textContent;
}

// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_is-open');
  autofillProfileInputs();
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

function submitFormProfile(e) {
  e.preventDefault();

  // рефакторинг: вынести в отдельную функцию
  // или создать отдельную ф-цию для каждой формы +
  profileName.textContent = inputProfileName.value;
  profileBio.textContent = inputProfileBio.value;
  closePopup(popup);
}

function submitFormPlace(e) {
  e.preventDefault();
  const newCard = {
      name: inputPlaceName.value,
      link: inputPlaceLink.value
  }

  addCard(newCard);
  closePopup(popupPlace);
  formPopupPlace.reset();
};

// ---------- Слушатели ----------
// попап 1
btnEditProfile.addEventListener('click', () => openPopup(popupProfile)); // открыть попап
btnClosePopupProfile.addEventListener('click', () => closePopup(popupProfile)); // закрыть попап
formPopupProfile.addEventListener('submit', submitFormProfile); // отправить форму, закрыть попап и обновить инфу в профиле

// popup.addEventListener('click', popupClickHandler); // закрыть попап по клику за его пределами

// попап 2
btnAddCard.addEventListener('click', () => openPopup(popupPlace)); // открыть попап
btnClosePopupPlace.addEventListener('click', () => closePopup(popupPlace)); // закрыть попап
formPopupPlace.addEventListener('submit', submitFormPlace); // отправить форму и закрыть попап
