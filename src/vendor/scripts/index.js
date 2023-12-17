// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function makeCardNode(elem, removeCard) {
    const card = template.querySelector('.card').cloneNode(true);
    const title = card.querySelector('.card__title');
    const img = card.querySelector('.card__image');
    
    title.textContent = elem.name;
    img.src = elem.link;
    img.alt = elem.name;
    
    const deleteBtn = card.querySelector('.card__delete-button');
    deleteBtn.addEventListener('click', removeCard);
    return card;
};

// @todo: Функция удаления карточки
function removeCard(event) {
    event.target.closest('.card').remove();
  };

// @todo: Вывести карточки на страницу
function addListTemplate(cards) {
    initialCards.forEach((el) => {
        cardsList.appendChild(makeCardNode(el, removeCard));
    });
}

addListTemplate(initialCards);

