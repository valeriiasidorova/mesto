const popup = document.querySelector('.popup');

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
//           переписать сабмиты форм +

// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_is-open');

  // рефакторинг: вынести в отдельную функцию
  inputProfileName.value = profileName.textContent;
  inputProfileBio.value = profileBio.textContent;
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
  // добавить сюда создание карточки?
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
