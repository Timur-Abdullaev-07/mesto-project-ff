import {placesList, popupImage, popupTypeImage, popupTypeEdit, editFormElement, nameInput, jobInput, name, job, popupTypeNewCard, placeName, placeUrl, newCardFormElement} from './index.js';
import {addСard, deleteCard, likeCard} from './card.js';

// @todo: Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('click', clickClosedPopup);
    document.addEventListener('keydown', escapeClosedPopup);
}

// @todo: Функция закртытия попапа с помощью клика
function clickClosedPopup(evt) {
    if(evt.target.classList.contains('popup_is-opened') ||
    evt.target.classList.contains('popup__close')) {
        closedPopup();
    }
}

// @todo: Функция закрытие попапа с помощью Escape
function escapeClosedPopup(evt) {
    if (evt.key === 'Escape') {
        closedPopup();
    }
}

// @todo: Функция закрытия попапа
function closedPopup() {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    document.removeEventListener('click', clickClosedPopup);
    document.removeEventListener('keydown', escapeClosedPopup);
}

// @todo: Функция открытия большого изображения
function openPopupImage(evt) {
    openPopup(popupTypeImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    document.querySelector('.popup__caption').textContent = evt.target.alt;
}

// @todo: Функция открытия попапа для редактирования профиля
function openPopupEdit() {
    openPopup(popupTypeEdit);
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    editFormElement.addEventListener('submit', handleFormSubmit);
}

// @todo: Функция обработки данных профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closedPopup();
    editFormElement.removeEventListener('submit', handleFormSubmit);
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
    placesList.prepend(addСard({name: placeName.value, link: placeUrl.value}, deleteCard, likeCard));
    closedPopup();
    newCardFormElement.removeEventListener('submit', addNewCard);
}

export {openPopupImage, openPopupEdit, openPopupAdd};