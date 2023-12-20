import '../pages/index.css';

import { initialCards, makeCardNode, handleClickLike, removeCard } from './cards';
import { closeEditor } from './modal';

// инфо
export const title = document.querySelector('.profile__title');
export const description = document.querySelector('.profile__description');

// Редактирование информации
const formElementProfile = document.querySelector('[name="edit-profile"]');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');

// DOM узлы
const cardsList = document.querySelector('.places__list');

export function addListTemplate() {
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

function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    title.textContent = nameInput.value;
    description.textContent = jobInput.value;

    closeEditor();
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

addListTemplate(initialCards);
