import { cardTemplate } from './index.js';
import { openPopupImage } from './modal.js';

// @todo: Функция создания карточки
function addСard(card, deleteCard, likeCard) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardNew.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardNew.querySelector('.card__title').textContent = card.name;

    cardNew.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardNew));
    cardNew.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardImage.addEventListener('click', openPopupImage);
    return cardNew;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Функция лайка
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export { addСard, deleteCard, likeCard};