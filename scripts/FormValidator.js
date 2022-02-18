class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = Array.from(this._form
      .querySelectorAll(this._config.inputSelector));
    this._closeButton = this._form
      .parentElement
      .querySelector(this._config.closeButtonSelector);
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
  }
}

export default FormValidator;
