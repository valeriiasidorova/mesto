import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFormFunc }) {
    super(popupSelector);

    this._submitFormFunc = submitFormFunc;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      this._submitFormFunc(evt, this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForm;
