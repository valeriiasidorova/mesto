class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = Array.from(this._form
      .querySelectorAll(this._config.inputSelector));
    this._closeButton = this._form
      .parentElement
      .querySelector(this._config.closeButtonSelector);
    this._submitButton = this._form
      .querySelector(this._config.submitButtonSelector);
  }

  _showInputError(input) {
    this._errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    this._errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._config.inputErrorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity() {
    this._inputs.forEach((input) => {
      if (!input.validity.valid) {
        this._showInputError(input);
      } else {
        this._hideInputError(input);
      }
    });
  }

  _preventDefaultSubmit(evt) {
    evt.preventDefault();
  }

  _setSubmitButtonState() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(this._config.submitButtonErrorClass, !this._form.checkValidity());
  }

  _setFormListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () =>
        this._checkInputValidity());
      });

    this._form.addEventListener('submit', this._preventDefaultSubmit);
    this._form.addEventListener('input', () => this._setSubmitButtonState());
    this._closeButton.addEventListener('click', () => {
      this._inputs.forEach((input) => this._hideInputError(input));
    });
  }

  resetValidation() {
    this._setSubmitButtonState();
    this._inputs.forEach((input) => this._hideInputError(input));
  }

  enableValidation() {
    this._setFormListeners();
  }
}

export default FormValidator;
