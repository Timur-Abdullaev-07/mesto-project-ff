// @todo: Функция закртытия попапа с помощью клика
function clickClosedPopup(evt) {
    if(evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
    } else if (evt.target.classList.contains('popup__close')){
        closePopup(evt.target.parentElement.parentElement);
    }
}

// @todo: Функция закрытие попапа с помощью Escape
function escapeClosedPopup(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
}

// @todo: Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('click', clickClosedPopup);
    document.addEventListener('keydown', escapeClosedPopup);
}



// @todo: Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('click', clickClosedPopup);
    document.removeEventListener('keydown', escapeClosedPopup);
}



export {openPopup, closePopup};