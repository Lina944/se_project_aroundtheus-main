class FormValidator {
  constructor(settings, formEl) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
  }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _showInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }

    this._hideInputError(inputEl);
  }

  _hideInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputEls) {
    if (this._hasInvalidInput(inputEls)) {
      this._enableButton(this._inactiveButtonClass);
      return;
    }
    this._disableButton(this._inactiveButtonClass);
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _enableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _disableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
  resetValidation() {
    this._toggleButtonState();

    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }
}

export default FormValidator;
