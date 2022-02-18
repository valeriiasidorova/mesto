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
}

export default FormValidator;
