import '../pages/index.css';

import { makeCardNode } from './cards';
import { closeEditor, openEditor } from './modal';
import { initialCards } from '../mock/data';

// инфо профиля
const title = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');

// Редактирование информации
const formElementProfile = document.querySelector('[name="edit-profile"]');
const profileNameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// DOM узлы
const cardsList = document.querySelector('.places__list');

// Данные формы новой карточки

const formElementAdd = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

// кнопки
const newCardBtn = document.querySelector('.profile__add-button');
const editProfileBtn = document.querySelector('.profile__edit-button');

// редакторы
export const bigCardImager = document.querySelector('.popup_type_image');
const addCardEditor = document.querySelector('.popup_type_new-card');
const editCardEditor = document.querySelector('.popup_type_edit');

// большая картинка и описание в редакторе
export const imgModal = bigCardImager.querySelector('.popup__image');
export const captionModal = bigCardImager.querySelector('.popup__caption');

// Функция создания карточки

function addCard(evt) {
    evt.preventDefault();

    const newCard = {
        name: placeNameInput.value,
        link: linkInput.value
    };

    initialCards.unshift(newCard);

    addListTemplate(initialCards);

    placeNameInput.value = '';
    linkInput.value = '';

    closeEditor();
}

function addListTemplate() {
    cardsList.innerHTML = '';
    initialCards.forEach((el, index) => {
        const newCard = makeCardNode(el);

        if (index < cardsList.children.length) {
            cardsList.insertBefore(newCard, cardsList.children[index]);
        } else {
            cardsList.appendChild(newCard);
        }
    });
}

function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    title.textContent = profileNameInput.value;
    description.textContent = jobInput.value;

    closeEditor();
}
formElementAdd.addEventListener('submit', addCard);

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

// Открытие редактора профиля по кнопке
editProfileBtn.addEventListener('click', () => {
    profileNameInput.value = title.textContent;
    jobInput.value = description.textContent;

    openEditor(editCardEditor);
});

// Открытие редактора на создание карточки по кнопке
newCardBtn.addEventListener('click', () => {
    openEditor(addCardEditor);
});

addListTemplate(initialCards);
