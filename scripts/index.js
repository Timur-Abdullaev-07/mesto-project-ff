// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addСard(card) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardNew.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = `Фотография ${card.name}`;
    cardNew.querySelector('.card__title').textContent = card.name;

    cardNew.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardNew));

    return cardNew;
}

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    placesList.append(addСard(element));
});