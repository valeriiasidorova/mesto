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
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity() {
    this._inputs.forEach((input) => {
      if (!input.validity.valid) {
        this._showInputError(input);
      } else {
        this.hideInputError(input);
      }
    });
  }

  _preventDefaultSubmit(evt) {
    evt.preventDefault();
  }

  setSubmitButtonState() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(this._config.submitButtonErrorClass, !this._form.checkValidity());
  }

  _setFormListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () =>
        this._checkInputValidity());
      });

    this._form.addEventListener('submit', this._preventDefaultSubmit);
    this._form.addEventListener('input', () => this.setSubmitButtonState());
    this._closeButton.addEventListener('click', () => {
      this._inputs.forEach((input) => this.hideInputError(input));
    });
  }

  enableValidation() {
    this._setFormListeners();
  }
}

export default FormValidator;
