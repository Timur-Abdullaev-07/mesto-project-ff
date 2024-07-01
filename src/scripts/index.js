import '../pages/index.css';
import {initialCards} from './cards.js';
import {addСard, deleteCard, likeCard} from './card.js';
import { openPopupEdit, openPopupAdd} from './modal.js';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
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
    placesList.append(addСard(element, deleteCard, likeCard));
});

// @todo: открытие редактора профиля
document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopupEdit();
});

// @todo: открытие добавления новой карточки
document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopupAdd();
});

export {cardTemplate, placesList, popupImage, popupTypeImage, popupTypeEdit, editFormElement, nameInput, jobInput, name, job, popupTypeNewCard, newCardFormElement, placeName, placeUrl};