import { imgModal, captionModal, bigCardImager } from '.';
import { openEditor } from './modal';

// Темплейт карточки
const template = document.querySelector('#card-template').content;

// обработка лайков
const clickLike = (e) => {
    e.stopPropagation();

    e.target.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
function removeCard(event) {
    event.stopPropagation();

    event.target.closest('.card').remove();
}

export function makeCardNode(elem, handleRemoveCard = removeCard, handleClickLike = clickLike) {
    const card = template.querySelector('.card').cloneNode(true);
    const title = card.querySelector('.card__title');
    const img = card.querySelector('.card__image');
    const like = card.querySelector('.card__like-button');

    title.textContent = elem.name;
    img.src = elem.link;
    img.alt = elem.name;

    const deleteBtn = card.querySelector('.card__delete-button');
    deleteBtn.addEventListener('click', handleRemoveCard);
    like.addEventListener('click', handleClickLike);
    // открытие большой картинки по клику на картинку карточки
    img.addEventListener('click', (e) => {
        imgModal.attributes.src.value = e.target.src;
        imgModal.attributes.alt.value = e.target.alt;

        captionModal.textContent = e.target.alt;
        openEditor(bigCardImager);
    });

    return card;
}
