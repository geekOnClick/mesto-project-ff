import { addListTemplate } from '.';
import { closeEditor, openEditor, bigCardImager } from './modal';

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Темплейт карточки
const template = document.querySelector('#card-template').content;

const formElementAdd = document.querySelector('[name="new-place"]');

const nameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

export function makeCardNode(elem, removeCard, handleClickLike) {
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
    img.addEventListener('click', (e) => openEditor(bigCardImager, e));

    return card;
}

// Функция создания карточки

function addCard(evt) {
    evt.preventDefault();

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

// обработка лайков
export const handleClickLike = (e) => {
    e.stopPropagation();

    e.target.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
export function removeCard(event) {
    event.stopPropagation();

    event.target.closest('.card').remove();
}

formElementAdd.addEventListener('submit', addCard);
