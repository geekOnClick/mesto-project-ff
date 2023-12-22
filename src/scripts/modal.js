const popups = document.querySelectorAll('.popup');
const closeBtns = document.querySelectorAll('.popup__close');

const addEscListener = (e) => {
    if (e.code === 'Escape') {
        closeEditor();
    }
};

// функции закрытия/открытия редакторов
export const closeEditor = () => {
    popups.forEach((popup) => {
        if (popup.classList.contains('popup_is-opened')) {
            popup.classList.add('popup_is-animated');
            popup.classList.remove('popup_is-opened');
        }
    });

    document.removeEventListener('keydown', addEscListener);
};

export const openEditor = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', addEscListener);
};

//закрытие редакторов
closeBtns.forEach((btn) => {
    btn.addEventListener('click', closeEditor);
});
popups.forEach((popup) => {
    popup.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup')) {
            closeEditor();
        }
    });
});
