import '../pages/index.css';
import {createCard, hasMyLike, addClickLike} from './card.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getInitialCards, getInitialMe, patchNewProfileName, patchNewProfileAvatar, postNewCard, deleteCardApi, putLike, deleteLike} from './api.js';
import {setNewProfilePhoto, setNewProfileName} from './profile.js';

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
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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
enableValidation(configValidation);

// @todo: Добаление массива карточек на страницу
Promise.all([getInitialMe(), getInitialCards()])
  .then(([profileData, cardsData]) => {
      myId = profileData._id;
      setNewProfilePhoto(profileFoto, profileData);
      setNewProfileName(profileName, profileJob, profileData);
      cardsData.forEach((card) => {
        placesList.append(createCard(card, myId, openPopupDeleteCard, addClickLike, putLike, deleteLike, hasMyLike, openPopupImage));
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
    clearValidation(editFormElement, configValidation)
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
      setNewProfileName(profileName, profileJob, result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupTypeEdit);
      renderLoaging(false, buttonSubmit);
    }
    )
  editFormElement.removeEventListener('submit', addNewProfileName);
}

// @todo: Функция открытия попапа для редактирования автара
function openPopupAvatar() {
  clearValidation(avatarForm, configValidation);
  openPopup(popupTypeAvatar);
  avatarForm.addEventListener('submit', addNewAvatarFoto);
  avatarForm.reset();
}

// @todo: Функция обработки данных аватара
function addNewAvatarFoto (evt) {
  evt.preventDefault();
  const buttonSubmit = avatarForm.querySelector('.popup__button');
  renderLoaging(true, buttonSubmit);
  patchNewProfileAvatar(avatarInput.value)
    .then((result) => {
      setNewProfilePhoto(profileFoto, result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupTypeAvatar);
      renderLoaging(false, buttonSubmit);
    })
  avatarForm.removeEventListener('submit', addNewAvatarFoto);
}

// @todo: Функция открытия попапа для добавления картоки
function openPopupAdd() {
    clearValidation(newCardFormElement, configValidation);
    openPopup(popupTypeNewCard);
    newCardFormElement.addEventListener('submit', addNewCard);
    newCardFormElement.reset();
}

// @todo: Функция обработки данных новой карточки
function addNewCard(evt) {
    evt.preventDefault();
    const buttonSubmit = newCardFormElement.querySelector('.popup__button');
    renderLoaging(true, buttonSubmit);
    postNewCard (placeName.value, placeUrl.value)
      .then((result) => {
        placesList.prepend(createCard(result, myId, openPopupDeleteCard, addClickLike, putLike, deleteLike, hasMyLike, openPopupImage));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closePopup(popupTypeNewCard);
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
      closePopup(popupTypeDeleteCard);
    })
}

// @todo: Функция Cохранение...
function renderLoaging(isLoaging, button) {
  button.textContent = isLoaging ? 'Сохранение...' : 'Сохранить';
}

export {cardTemplate};