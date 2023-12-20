import '../pages/index.css';

import { initialCards } from './cards';

// инфо
const title = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');

// редакторы
const addCardEditor = document.querySelector('.popup_type_new-card');
const editCardEditor = document.querySelector('.popup_type_edit');
const bigCardImager = document.querySelector('.popup_type_image');

// кнопки
const newCardBtn = document.querySelector('.profile__add-button');
const editBtn = document.querySelector('.profile__edit-button');

// функции закрытия/открытия редактора, обработчиков
const closeEditor = () => {
    document.querySelector('.popup_is-opened').classList.add('popup_is-animated');
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    document.removeEventListener('keydown', addEscListener);
};
const addEscListener = (e) => {
    if (e.code === 'Escape') {
        closeEditor(addCardEditor);
    }
    document.removeEventListener('keydown', addEscListener);
};

// События открытия/закрытия больших картинок

const openBigImg = (e) => {
    bigCardImager.classList.add('popup_is-opened');

    const img = bigCardImager.querySelector('.popup__image');
    img.attributes.src.value = e.target.src;
    img.attributes.alt.value = e.target.alt;

    const caption = bigCardImager.querySelector('.popup__caption');
    caption.textContent = e.target.alt;

    document.addEventListener('keydown', addEscListener);
};

// Открытие редактора на создание карточки
newCardBtn.addEventListener('click', () => {
    addCardEditor.classList.add('popup_is-opened');

    document.addEventListener('keydown', addEscListener);
});
// Открытие редактора на редактирование
editBtn.addEventListener('click', () => {
    editCardEditor.classList.add('popup_is-opened');

    document.querySelector('.popup__input_type_name').value = title.textContent;
    document.querySelector('.popup__input_type_description').value = description.textContent;

    document.addEventListener('keydown', addEscListener);
});

//закрытие редакторов
const closeBtns = document.querySelectorAll('.popup__close');
closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        closeEditor();
    });
});

const layouts = document.querySelectorAll('.popup');
layouts.forEach((layout) => {
    layout.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup')) {
            closeEditor();
        }
    });
});

// обработка лайков
const handleClickLike = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('card__like-button_is-active')) {
        e.target.classList.remove('card__like-button_is-active');
    } else {
        e.target.classList.add('card__like-button_is-active');
    }
};

// Темплейт карточки
const template = document.querySelector('#card-template').content;

// DOM узлы
const cardsList = document.querySelector('.places__list');

function makeCardNode(elem, removeCard, handleClickLike) {
    const card = template.querySelector('.card').cloneNode(true);
    const title = card.querySelector('.card__title');
    const img = card.querySelector('.card__image');
    const like = card.querySelector('.card__like-button');

    title.textContent = elem.name;
    img.src = elem.link;
    img.alt = elem.name;

    const deleteBtn = card.querySelector('.card__delete-button');
    deleteBtn.addEventListener('click', removeCard);
    like.addEventListener('click', handleClickLike);
    img.addEventListener('click', openBigImg);

    return card;
}

addListTemplate(initialCards);

// Функция удаления карточки
function removeCard(event) {
    event.stopPropagation();
    const cardTitle = event.target.previousElementSibling.alt;
    initialCards.forEach((el) => {
        if (el.name === cardTitle) {
            const index = initialCards.indexOf(el);
            initialCards.splice(index, 1);
        }
    });
    event.target.closest('.card').remove();
}

function addListTemplate() {
    cardsList.innerHTML = '';
    initialCards.forEach((el, index) => {
        const newCard = makeCardNode(el, removeCard, handleClickLike);

        if (index < cardsList.children.length) {
            cardsList.insertBefore(newCard, cardsList.children[index]);
        } else {
            cardsList.appendChild(newCard);
        }
    });
}

// Набор созданных карточек
const cards = cardsList.querySelectorAll('.card');

// Редактирование информации
const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
    evt.preventDefault();

    title.textContent = nameInput.value;
    description.textContent = jobInput.value;

    closeEditor();
}

formElement.addEventListener('submit', handleFormSubmit);

// Функция создания карточки

const formElementAdd = document.querySelector('[name="new-place"]');

function addCard(evt) {
    evt.preventDefault();

    const nameInput = document.querySelector('.popup__input_type_card-name');
    const linkInput = document.querySelector('.popup__input_type_url');

    const newCard = {
        name: nameInput.value,
        link: linkInput.value
    };

    initialCards.unshift(newCard);

    addListTemplate(initialCards);

    nameInput.value = '';
    linkInput.value = '';

    closeEditor();
}
formElementAdd.addEventListener('submit', addCard);
