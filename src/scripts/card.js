import { cardTemplate } from './index.js';

// @todo: Функция создания карточки
function addСard(card, myId, deleteCard, addLike, removeLike, findMyLike, updatingLikes, openPopupImage) {
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

    likeButton.addEventListener('click', () => {
        if(!findMyLike(card, myId)){
            addLike(card._id)
                .then((result) => {
                    updatingLikes(numberLikesElement, result.likes.length, likeButton);
                    card.likes = result.likes;
                })
        } else {
            removeLike(card._id)
                .then((result) => {
                    updatingLikes(numberLikesElement, result.likes.length, likeButton);
                    card.likes = result.likes;
                })
        }
    });

    cardImage.addEventListener('click', openPopupImage);

    return cardNew;
}

// @todo: Функция поиска своего лайка
function findMyLike (card, myId) {
    return card.likes.find(element => element._id === myId)
}

// @todo: Функция обновления количества лайков
function updatingLikes (numberLikesElement, newNumderLikes, likeIcon) {
    numberLikesElement.textContent = newNumderLikes;
    likeIcon.classList.toggle('card__like-button_is-active');
}


export {addСard, findMyLike, updatingLikes};