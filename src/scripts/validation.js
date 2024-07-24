// @todo: Функция реагирования на ошибку в валидации
const showInputError = (formElement, inputErrorClass, errorClass, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// @todo: Функция удаления ошибки валидации
const hideInputError = (formElement, inputErrorClass, errorClass, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// @todo: Функция проверки валидации
const checkInputValidity = (validationObj, formElement, inputElement) => {
  if (inputElement.validity.patternMismatch){
    showInputError(formElement, validationObj.inputErrorClass, validationObj.errorClass, inputElement, inputElement.dataset.errorMessage);
  } else if (!inputElement.validity.valid) {
    showInputError(formElement, validationObj.inputErrorClass, validationObj.errorClass, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, validationObj.inputErrorClass, validationObj.errorClass, inputElement);
  }
};

// @todo: Функция установки проверки на валидацию
const setEventListeners = (formElement, validationObj) => {
  const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
  const buttonElement = formElement.querySelector(validationObj.submitButtonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(validationObj,formElement, inputElement);
      toggleButtonState(validationObj, inputList, buttonElement);
    });
  });
};

// @todo: Функция прохода по всем формам
function enableValidation(validationObj) {
  const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationObj);
  })
}

// @todo: Функция проверки массива инпутов на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// @todo: Функция включения кнопки
const enableButton = (inactiveButtonClass, buttonElement) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(inactiveButtonClass);
};

// @todo: Функция выключения кнопки
const disableButton = (inactiveButtonClass, buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
};

// @todo: Функция переключение работы кнопки
const toggleButtonState = (validationObj, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(validationObj.inactiveButtonClass, buttonElement);
  } else {
    enableButton(validationObj.inactiveButtonClass, buttonElement)
  }
}

// @todo: Функция очистки валидации
const clearValidation = (form, validationObj) => {
  const inputList = form.querySelectorAll(validationObj.inputSelector)
  const buttonElement = form.querySelector(validationObj.submitButtonSelector)
  inputList.forEach((inputElement) => {
    hideInputError(form, validationObj.inputErrorClass, validationObj.errorClass, inputElement)
  })
  disableButton(validationObj.inactiveButtonClass, buttonElement);
}

export {enableValidation, clearValidation};