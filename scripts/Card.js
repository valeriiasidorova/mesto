class Card {
  constructor(cardName, cardLink, cardSelector, openPopupFunc) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._cardSelector = cardSelector;
    this._openPopupFunc = openPopupFunc;
  }
}

export default Card;
