class Card {
  constructor(cardName, cardLink, cardSelector, openPopupFunc) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._cardSelector = cardSelector;
    this._openPopupFunc = openPopupFunc;
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
  }

  _setEventListeners() {
    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', () => this._likeCard());

    this._element
      .querySelector('.card__remove-button')
      .addEventListener('click', () => this._removeCard());
  }
}

export default Card;
