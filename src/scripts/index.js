import '../pages/index.css';
import {initialCards} from './cards.js';
import {addСard, deleteCard, likeCard} from './card.js';
import {openPopup, closedPopup} from './modal.js';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__caption');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editFormElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const newCardFormElement = popupTypeNewCard.querySelector('.popup__form')
const placeName = newCardFormElement.querySelector('.popup__input_type_card-name');
const placeUrl = newCardFormElement.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    placesList.append(addСard(element, deleteCard, likeCard, openPopupImage));
});

// @todo: открытие редактора профиля
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopupEdit();
});

// @todo: открытие добавления новой карточки
document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopupAdd();
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
    openPopup(popupTypeEdit);
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    editFormElement.addEventListener('submit', addNewProfileName);
}

// @todo: Функция обработки данных профиля
function addNewProfileName(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closedPopup(popupTypeEdit);
    editFormElement.removeEventListener('submit', addNewProfileName);
}

// @todo: Функция открытия попапа для добавления картоки
function openPopupAdd() {
    openPopup(popupTypeNewCard);
    newCardFormElement.addEventListener('submit', addNewCard);
    placeName.value = '';
    placeUrl.value = '';
}

// @todo: Функция обработки данных новой карточки
function addNewCard(evt) {
    evt.preventDefault();
    console.log(placeName.value, placeUrl.value);
    placesList.prepend(addСard({name: placeName.value, link: placeUrl.value}, deleteCard, likeCard, openPopupImage));
    closedPopup(popupTypeNewCard);
    newCardFormElement.removeEventListener('submit', addNewCard);
}

export {cardTemplate};