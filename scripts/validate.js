const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: '.popup__input_state_invalid',
  submitButtonSelector: '.popup__submit-button',
  submitButtonErrorClass: 'popup__submit-button_disabled'
}

function enableValidation(сonfig) {
  const forms = Array.from(document.querySelectorAll(сonfig.formSelector));

  forms.forEach((form) => setFormListeners(form, сonfig));
}

function setFormListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () =>
      checkInputValidity(inputElement, form, config));
    });

  form.addEventListener('submit', preventDefaultSubmit);
  form.addEventListener('input', () => setSubmitButtonState(form, config));

  setSubmitButtonState(form, config); // так лучше не делать. а как?
}

function setSubmitButtonState(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);

  submitButton.disabled = !form.checkValidity();
  submitButton.classList.toggle(config.submitButtonErrorClass, !form.checkValidity());
}

function preventDefaultSubmit(evt) {
  evt.preventDefault();
}

function checkInputValidity(input, form, config) {
  if (!input.validity.valid) {
    showInputError(input, form, config);
  } else {
    hideInputError(input, form, config);
  }
}

function showInputError(input, form, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

function hideInputError(input, form, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

enableValidation(formConfig);
