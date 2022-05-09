import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFormFunc }) {
    super(popupSelector);

    this._submitFormFunc = submitFormFunc;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormFunc(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
