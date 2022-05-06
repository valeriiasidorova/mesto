class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._element
      .querySelector('.card__like-button')
      .classList
      .toggle('card__like-button_active');
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector('.card__image');

    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', () => this._likeCard());

    this._element
      .querySelector('.card__remove-button')
      .addEventListener('click', () => this._removeCard());

    this._cardImage.addEventListener('click', () =>
      this._handleCardClick(this._cardImage.alt, this._cardImage.src)
    );
  }

  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector('.card__image');

    this._setEventListeners();

    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._element
      .querySelector('.card__title')
      .textContent = this._name;

    return this._element;
  }
}

export default Card;
