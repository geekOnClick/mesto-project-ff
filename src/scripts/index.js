import '../pages/index.css';
import { makeCardNode } from './card';
import { closeEditor, openEditor, closePopupByAction } from './modal';
import { enableValidation, clearValidation } from './validation';
import {
    addNewCard,
    changeUsersAvatar,
    deleteCard,
    editUsersInfo,
    getCards,
    getUsersInfo,
    handleResponse,
    makeLike,
    removeLike
} from './api';

let userId = null;

// DOM узлы
const cardsList = document.querySelector('.places__list');

// инфо профиля
const title = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');

// Данные формы редактирования информации
export const formElementProfile = document.querySelector('[name="edit-profile"]');
export const profileNameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');

// Данные формы аватара
const formAvatar = document.querySelector('[name="avatar"]');
const avatarInput = document.querySelector('.popup__input_type_avatar');

// Данные формы новой карточки

const formElementAdd = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_link');

// Данные формы подтверждения
export const formDeleteAccept = document.querySelector('[name="delete-card"]');

// редакторы
export const bigCardImager = document.querySelector('.popup_type_image');
const addCardEditor = document.querySelector('.popup_type_new-card');
const editCardEditor = document.querySelector('.popup_type_edit');
const editAvatarEditor = document.querySelector('.popup_type_avatar');
export const deleteAcceptEditor = document.querySelector('.popup_type_delete-card');

// большая картинка и описание в редакторе
export const imgModal = bigCardImager.querySelector('.popup__image');
export const captionModal = bigCardImager.querySelector('.popup__caption');

// кнопки
const newCardBtn = document.querySelector('.profile__add-button');
const editProfileBtn = document.querySelector('.profile__edit-button');
const editAvatar = document.querySelector('.profile__image');

// попапы
const popups = document.querySelectorAll('.popup');

// параметры валидации
const validationParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Id карточки для удаления
let deletedCardId = null;

// создание карточки

function addCard(evt) {
    evt.preventDefault();

    const popupBtn = formElementAdd.querySelector('.popup__button');
    popupBtn.textContent = 'Сохранение...';

    const newCard = {
        name: placeNameInput.value,
        link: linkInput.value
    };

    addNewCard(newCard)
        .then((res) => handleResponse(res))
        .then((elem) => {
            const newCard = makeCardNode(elem, userId, clickLike, removeCard, openImgCard);
            cardsList.prepend(newCard);
        })
        .catch((err) => console.error(err.message))
        .finally(() => {
            formElementAdd.reset();
            closeEditor(addCardEditor);
            popupBtn.textContent = 'Сохранить';
        });
}
// Редактирование профиля

function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    const popupBtn = formElementProfile.querySelector('.popup__button');
    popupBtn.textContent = 'Сохранение...';

    const data = {
        name: profileNameInput.value,
        about: jobInput.value
    };
    editUsersInfo(data)
        .then((res) => handleResponse(res))
        .then((data) => {
            title.textContent = data.name;
            description.textContent = data.about;
        })
        .catch((err) => console.error(err.message))
        .finally(() => {
            closeEditor(editCardEditor);
            popupBtn.textContent = 'Сохранить';
        });
}

// Изменение аватарки

function handleFormSubmitAvatar(evt) {
    evt.preventDefault();

    const popupBtn = formAvatar.querySelector('.popup__button');

    popupBtn.textContent = 'Сохранение...';

    const data = {
        avatar: avatarInput.value
    };
    changeUsersAvatar(data)
        .then((res) => handleResponse(res))
        .then((data) => {
            editAvatar.style.backgroundImage = `url(${data.avatar})`;
        })
        .catch((err) => console.error(err.message))
        .finally(() => {
            closeEditor(editAvatarEditor);
            popupBtn.textContent = 'Сохранить';
        });
}

// удаление карточки

function handleDeleteCard(e) {
    e.preventDefault();

    deleteCard(deletedCardId)
        .then(() => {
            const deletedCard = Array.from(document.querySelectorAll('.card')).find((el) => {
                return el.dataset.id === deletedCardId;
            });
            deletedCard.remove();
        })
        .catch((err) => console.error(err.message))
        .finally(() => closeEditor(deleteAcceptEditor));
}

// обработка лайков
const clickLike = (e, likeCounter, id) => {
    e.stopPropagation();
    const likeMethod = e.target.classList.contains('card__like-button_is-active')
        ? removeLike
        : makeLike;
    likeMethod(id)
        .then((res) => handleResponse(res))
        .then((elem) => {
            e.target.classList.toggle('card__like-button_is-active');
            likeCounter.textContent = elem.likes.length;
        })
        .catch((err) => console.error(err.message));
};

// Функция удаления карточки
function removeCard(event, id) {
    event.stopPropagation();

    deletedCardId = id;

    openEditor(deleteAcceptEditor);
}

// Открытие картинки карточки
function openImgCard(e) {
    imgModal.attributes.src.value = e.target.src;
    imgModal.attributes.alt.value = e.target.alt;

    captionModal.textContent = e.target.alt;
    openEditor(bigCardImager);
}

// Построение списка карточек

function addListTemplate(cards) {
    cardsList.innerHTML = '';
    cards.forEach((el, index) => {
        const newCard = makeCardNode(el, userId, clickLike, removeCard, openImgCard);
        cardsList.appendChild(newCard);
    });
}

// запрос списка карточек

export function renderInitialPageState() {
    Promise.all([getCards(), getUsersInfo()])
        .then(([responseCards, responseInfo]) => {
            return Promise.all([responseCards.json(), responseInfo.json()]);
        })
        .then(([cardsData, infoData]) => {
            userId = infoData._id;
            title.textContent = infoData.name;
            description.textContent = infoData.about;
            avatar.style.backgroundImage = `url(${infoData.avatar})`;

            addListTemplate(cardsData);
        })
        .catch((error) => {
            console.error('Ошибка при выполнении запросов:', error);
        });
}

//submits
formElementAdd.addEventListener('submit', addCard);

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

formAvatar.addEventListener('submit', handleFormSubmitAvatar);

formDeleteAccept.addEventListener('submit', handleDeleteCard);

// Открытие редактора профиля по кнопке
editProfileBtn.addEventListener('click', () => {
    profileNameInput.value = title.textContent;
    jobInput.value = description.textContent;
    clearValidation(formElementProfile, validationParams);
    openEditor(editCardEditor);
});

// Открытие редактора на создание карточки по кнопке
newCardBtn.addEventListener('click', () => {
    placeNameInput.value = '';
    linkInput.value = '';

    clearValidation(formElementAdd, validationParams);
    openEditor(addCardEditor);
    // enableValidation(validationParams);
});

// открытие редактора на изменение аватара
editAvatar.addEventListener('click', () => {
    avatarInput.value = '';

    clearValidation(formAvatar, validationParams);
    openEditor(editAvatarEditor);
    // enableValidation(validationParams);
});

// closeBtns.forEach((btn) => {
//     btn.addEventListener('click', closeEditor);
// });

popups.forEach((popup) => {
    popup.addEventListener('click', closePopupByAction);
});

enableValidation(validationParams);
renderInitialPageState();
