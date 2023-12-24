const addEscListener = (e) => {
    if (e.code === 'Escape') {
        closeEditor(document.querySelector('.popup_is-opened'));
    }
};

// функции закрытия/открытия редакторов
export const closeEditor = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', addEscListener);
};

export const openEditor = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', addEscListener);
};

//закрытие редакторов по клику на оверлей и кнопку закрытия

export const closePopupByAction = (e) => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
        closeEditor(e.currentTarget);
    }
};
