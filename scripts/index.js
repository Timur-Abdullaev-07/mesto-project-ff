// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addСard(card) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

    cardNew.querySelector('.card__image').src = card.link;
    cardNew.querySelector('.card__image').alt = `Фотография ${card.name}`;
    cardNew.querySelector('.card__title').textContent = card.name;

    cardNew.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    placesList.append(cardNew);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    addСard(element);
});