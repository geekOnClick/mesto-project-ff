import {
    imgModal,
    captionModal,
    bigCardImager,
    renderCardsList,
    deleteAcceptEditor,
    formDeleteAccept
} from '.';
import { deleteCard, makeLike, removeLike } from './api';
import { openEditor, closeEditor } from './modal';

// Темплейт карточки
const template = document.querySelector('#card-template').content;

// обработка лайков
const clickLike = (e, likeCounter, id) => {
    e.stopPropagation();
    if (e.target.classList.contains('card__like-button_is-active')) {
        e.target.classList.remove('card__like-button_is-active');
        removeLike(id)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((elem) => {
                likeCounter.textContent = elem.likes.length;
            })
            .catch((err) => console.error(err.message));
    } else {
        e.target.classList.add('card__like-button_is-active');
        makeLike(id)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((elem) => {
                console.log(elem);
                likeCounter.textContent = elem.likes.length;
            })
            .catch((err) => console.error(err.message));
    }
};

// Функция удаления карточки
function removeCard(event, id) {
    event.stopPropagation();

    openEditor(deleteAcceptEditor);
    formDeleteAccept.addEventListener('submit', (e) => {
        e.preventDefault();

        deleteCard(id)
            .then(() => {
                renderCardsList();
            })
            .catch((err) => console.error(err.message))
            .finally(() => closeEditor());
    });
}

export function makeCardNode(
    elem,
    userId,
    handleRemoveCard = removeCard,
    handleClickLike = clickLike
) {
    const card = template.querySelector('.card').cloneNode(true);
    const title = card.querySelector('.card__title');
    const img = card.querySelector('.card__image');
    const like = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-counter');
    const deleteBtn = card.querySelector('.card__delete-button');

    if (elem.owner._id !== userId) {
        deleteBtn.remove();
    }

    title.textContent = elem.name;
    img.src = elem.link;
    img.alt = elem.name;
    likeCounter.textContent = elem.likes.length;

    deleteBtn.addEventListener('click', (e) => handleRemoveCard(e, elem._id));
    like.addEventListener('click', (e) => handleClickLike(e, likeCounter, elem._id));
    // открытие большой картинки по клику на картинку карточки
    img.addEventListener('click', (e) => {
        imgModal.attributes.src.value = e.target.src;
        imgModal.attributes.alt.value = e.target.alt;

        captionModal.textContent = e.target.alt;
        openEditor(bigCardImager);
    });

    return card;
}
