import { title, description, nameInput, jobInput } from '.';

const popups = document.querySelectorAll('.popup');

// редакторы
export const bigCardImager = document.querySelector('.popup_type_image');
const addCardEditor = document.querySelector('.popup_type_new-card');
const editCardEditor = document.querySelector('.popup_type_edit');

let openedEditor = null;

const img = bigCardImager.querySelector('.popup__image');
const caption = bigCardImager.querySelector('.popup__caption');

// кнопки
const newCardBtn = document.querySelector('.profile__add-button');
const editProfileBtn = document.querySelector('.profile__edit-button');
const closeBtns = document.querySelectorAll('.popup__close');

export const addEscListener = (e) => {
    if (e.code === 'Escape') {
        closeEditor(openedEditor);
    }
};

// функции закрытия/открытия редакторов
export const closeEditor = () => {
    openedEditor.classList.add('popup_is-animated');
    openedEditor.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', addEscListener);

    openedEditor = null;
};

export const openEditor = (popup, e) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', addEscListener);

    if (popup === editCardEditor) {
        nameInput.value = title.textContent;
        jobInput.value = description.textContent;
    } else if (popup === bigCardImager) {
        img.attributes.src.value = e.target.src;
        img.attributes.alt.value = e.target.alt;

        caption.textContent = e.target.alt;
    }

    openedEditor = popup;
};

// Открытие редактора на создание карточки
newCardBtn.addEventListener('click', (e) => {
    openedEditor = addCardEditor;
    openEditor(addCardEditor);
});
// Открытие редактора на редактирование
editProfileBtn.addEventListener('click', (e) => {
    openedEditor = editCardEditor;
    openEditor(editCardEditor);
});

//закрытие редакторов
closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        closeEditor();
    });
});
popups.forEach((layout) => {
    layout.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup')) {
            closeEditor();
        }
    });
});
