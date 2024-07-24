import '../pages/index.css';
import {addСard, findMyLike, updatingLikes} from './card.js';
import {openPopup, closedPopup} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getInitialCards, getInitialMe, patchNewProfileName, patchNewProfileAvatar, postNewCard, deleteCardApi, putLike, deleteLike} from './api.js';
import {newProfileFoto, newProfileName} from './profile.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupTypeAvatar = document.querySelector('.popup_type_new-avatar');
const avatarForm = popupTypeAvatar.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input')
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editFormElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');
const profileFoto = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const newCardFormElement = popupTypeNewCard.querySelector('.popup__form')
const placeName = newCardFormElement.querySelector('.popup__input_type_card-name');
const placeUrl = newCardFormElement.querySelector('.popup__input_type_url');
const popupTypeDeleteCard = document.querySelector('.popup_type_delete-card');
const buttonDeleteYes = popupTypeDeleteCard.querySelector('.popup__button');
let myId = null;
let deleteCardId;
let deleteElement;

// @todo: "Да" подверждение удаления
buttonDeleteYes.addEventListener('click', deleteCard);

// @todo: открытие редактора профиля
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopupEdit();
});

// @todo: открытие редактора аватара профиля
profileFoto.addEventListener('click', () => {
  openPopupAvatar();
});

// @todo: открытие добавления новой карточки
document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopupAdd();
});

// @todo: Включение валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// @todo: Добаление массива карточек на страницу
Promise.all([getInitialMe(), getInitialCards()])
  .then((results) => {
      myId = results[0]._id;
      newProfileFoto(profileFoto, results[0]);
      newProfileName(profileName, profileJob, results[0]);
      results[1].forEach((card) => {
        placesList.append(addСard(card, myId, openPopupDeleteCard, putLike, deleteLike, findMyLike, updatingLikes, openPopupImage));
      })
  })
  .catch((err) => {
      console.log(err);
  }); 

// @todo: Функция открытия большого изображения
function openPopupImage(evt) {
    openPopup(popupTypeImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImageTitle.textContent = evt.target.alt;
}

// @todo: Функция открытия попапа для редактирования профиля
function openPopupEdit() {
    clearValidation(editFormElement, {
        inputSelector: '.popup__input',
        inputErrorClass: 'popup__input_type_error',
        inactiveButtonClass: 'popup__button_disabled',
        submitButtonSelector: '.popup__button'
    })
    openPopup(popupTypeEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    editFormElement.addEventListener('submit', addNewProfileName);
}

// @todo: Функция обработки данных профиля
function addNewProfileName(evt) {
  evt.preventDefault();
  const buttonSubmit = editFormElement.querySelector('.popup__button');
  renderLoaging(true, buttonSubmit);
  patchNewProfileName(nameInput.value, jobInput.value)
    .then((result) => {
      newProfileName(profileName, profileJob, result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closedPopup(popupTypeEdit);
      renderLoaging(false, buttonSubmit);
    }
    )
  editFormElement.removeEventListener('submit', addNewProfileName);
}

// @todo: Функция открытия попапа для редактирования автара
function openPopupAvatar() {
  clearValidation(avatarForm, {
      inputSelector: '.popup__input',
      inputErrorClass: 'popup__input_type_error',
      inactiveButtonClass: 'popup__button_disabled',
      submitButtonSelector: '.popup__button'
  })
  openPopup(popupTypeAvatar);
  avatarForm.addEventListener('submit', addNewAvatarFoto);
  avatarInput.value = '';
}

// @todo: Функция обработки данных аватара
function addNewAvatarFoto (evt) {
  evt.preventDefault();
  const buttonSubmit = avatarForm.querySelector('.popup__button');
  renderLoaging(true, buttonSubmit);
  patchNewProfileAvatar(avatarInput.value)
    .then((result) => {
      newProfileFoto(profileFoto, result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closedPopup(popupTypeAvatar);
      renderLoaging(false, buttonSubmit);
    })
  avatarForm.removeEventListener('submit', addNewAvatarFoto);
}

// @todo: Функция открытия попапа для добавления картоки
function openPopupAdd() {
    clearValidation(newCardFormElement, {
        inputSelector: '.popup__input',
        inputErrorClass: 'popup__input_type_error',
        inactiveButtonClass: 'popup__button_disabled',
        submitButtonSelector: '.popup__button'
    })
    openPopup(popupTypeNewCard);
    newCardFormElement.addEventListener('submit', addNewCard);
    placeName.value = '';
    placeUrl.value = '';
}

// @todo: Функция обработки данных новой карточки
function addNewCard(evt) {
    evt.preventDefault();
    const buttonSubmit = newCardFormElement.querySelector('.popup__button');
    renderLoaging(true, buttonSubmit);
    postNewCard (placeName.value, placeUrl.value)
      .then((result) => {
        placesList.prepend(addСard(result, myId, openPopupDeleteCard, putLike, deleteLike, findMyLike, updatingLikes, openPopupImage));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closedPopup(popupTypeNewCard);
        renderLoaging(false, buttonSubmit);
      })
    newCardFormElement.removeEventListener('submit', addNewCard);
}

// @todo: Функция открытия попапа для подтверждения удаления
function openPopupDeleteCard(cardId, card) {
  openPopup(popupTypeDeleteCard);
  deleteCardId = cardId;
  deleteElement = card;
}

// @todo: Функция удаления карточки
function deleteCard() {
  deleteCardApi(deleteCardId)
    .then(() => {
      deleteElement.remove();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closedPopup(popupTypeDeleteCard);
    })
}

// @todo: Функция Cохранение...
function renderLoaging(loaging, button) {
  if(loaging) {
    button.textContent = 'Сохранение...';
  } else
  button.textContent = 'Сохранить';
}

export {cardTemplate};