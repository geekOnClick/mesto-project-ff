import '../pages/index.css';
import { makeCardNode } from './cards';
import { closeEditor, openEditor } from './modal';
import { enableValidation, clearValidation } from './validation';
import { addNewCard, changeUsersAvatar, editUsersInfo, getCards, getUsersInfo } from './api';

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

// параметры валидации

const editProfileParams = {
    formSelector: formElementProfile,
    inputsSelector: [profileNameInput, jobInput]
};

const newCardParams = {
    formSelector: formElementAdd,
    inputsSelector: [placeNameInput, linkInput]
};

const editAvatarParams = {
    formSelector: formAvatar,
    inputsSelector: [avatarInput]
};

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
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(() => {
            renderCardsList();
        })
        .catch((err) => console.error(err.message))
        .finally(() => {
            placeNameInput.value = '';
            linkInput.value = '';
            closeEditor();
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
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            title.textContent = data.name;
            description.textContent = data.about;
        })
        .catch((err) => console.error(err.message))
        .finally(() => {
            closeEditor();
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
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((data) => {
            editAvatar.style.backgroundImage = `url(${data.avatar})`;
        })
        .catch((err) => console.error(err.message))
        .finally(() => {
            closeEditor();
            popupBtn.textContent = 'Сохранить';
        });
}

// Построение списка карточек

function addListTemplate(cards) {
    cardsList.innerHTML = '';
    cards.forEach((el, index) => {
        const newCard = makeCardNode(el, userId);

        if (index < cardsList.children.length) {
            cardsList.insertBefore(newCard, cardsList.children[index]);
        } else {
            cardsList.appendChild(newCard);
        }
    });
}

// запрос списка карточек

export function renderCardsList() {
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

// Открытие редактора профиля по кнопке
editProfileBtn.addEventListener('click', () => {
    profileNameInput.value = title.textContent;
    jobInput.value = description.textContent;
    clearValidation(editProfileParams);
    openEditor(editCardEditor);
    enableValidation(editProfileParams);
});

// Открытие редактора на создание карточки по кнопке
newCardBtn.addEventListener('click', () => {
    placeNameInput.value = '';
    linkInput.value = '';

    clearValidation(newCardParams);
    openEditor(addCardEditor);
    enableValidation(newCardParams);
});

// открытие редактора на изменение аватара
editAvatar.addEventListener('click', () => {
    avatarInput.value = '';

    clearValidation(editAvatarParams);
    openEditor(editAvatarEditor);
    enableValidation(editAvatarParams);
});

renderCardsList();
