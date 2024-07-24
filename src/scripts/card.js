import { cardTemplate } from './index.js';

// @todo: Функция создания карточки
function createCard(card, myId, deleteCard, addClickLike, addLike, removeLike, findMyLike, openPopupImage) {
    const cardNew = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardNew.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardNew.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardNew.querySelector('.card__delete-button');
    if(card.owner._id === myId){
        deleteButton.addEventListener('click', () => deleteCard(card._id, cardNew));
    } else {
        deleteButton.remove();
    }

    const numberLikesElement = cardNew.querySelector('.card__likes-number');
    numberLikesElement.textContent = card.likes.length;

    const likeButton = cardNew.querySelector('.card__like-button');
    if(findMyLike(card, myId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {addClickLike(card, myId, findMyLike, addLike, removeLike, numberLikesElement, likeButton)});

    cardImage.addEventListener('click', openPopupImage);

    return cardNew;
}

// @todo: Функция поиска своего лайка
function hasMyLike(card, myId) {
    return card.likes.some(element => element._id === myId)
}

function addClickLike(card, myId, findMyLike, addLike, removeLike, numberLikesElement, likeButton) {
    const likeMethod = findMyLike(card, myId) ? removeLike : addLike;
    likeMethod(card._id) 
        .then((result) => { 
            numberLikesElement.textContent = result.likes.length;
            likeButton.classList.toggle('card__like-button_is-active'); 
            card.likes = result.likes; 
            })
        .catch(err => console.log(err));
}

export {createCard, hasMyLike, addClickLike};