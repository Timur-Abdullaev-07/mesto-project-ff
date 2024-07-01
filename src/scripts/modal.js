// @todo: Функция закртытия попапа с помощью клика
function clickClosedPopup(evt) {
    if(evt.target.classList.contains('popup_is-opened')) {
        closedPopup(evt.target);
    } else if (evt.target.classList.contains('popup__close')){
        closedPopup(evt.target.parentElement.parentElement);
    }
}

// @todo: Функция закрытие попапа с помощью Escape
function escapeClosedPopup(evt) {
    if (evt.key === 'Escape') {
        console.log(evt);
        closedPopup(document.querySelector('.popup_is-opened'));
    }
}

// @todo: Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('click', clickClosedPopup);
    document.addEventListener('keydown', escapeClosedPopup);
}



// @todo: Функция закрытия попапа
function closedPopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('click', clickClosedPopup);
    document.removeEventListener('keydown', escapeClosedPopup);
}



export {openPopup, closedPopup};