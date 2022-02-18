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
}

enableValidation(formConfig);
