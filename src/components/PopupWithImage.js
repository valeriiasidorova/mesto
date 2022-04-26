import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupImgTitle = this._popup.querySelector('.popup__img-title');
  }

  open({ name, link }) {
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupImgTitle.textContent = name;

    super.open();
  }
}

export default PopupWithImage;
