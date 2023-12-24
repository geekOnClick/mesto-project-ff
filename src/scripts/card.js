// Темплейт карточки
const template = document.querySelector('#card-template').content;

export function makeCardNode(
    elem,
    userId,
    handleClickLike,
    handleRemoveCard = removeCard,
    handleOpenImg
) {
    const card = template.querySelector('.card').cloneNode(true);
    card.dataset.id = elem._id;
    const title = card.querySelector('.card__title');
    const img = card.querySelector('.card__image');
    const like = card.querySelector('.card__like-button');
    const likeCounter = card.querySelector('.card__like-counter');
    const deleteBtn = card.querySelector('.card__delete-button');

    if (elem.owner._id !== userId) {
        deleteBtn.remove();
    } else {
        deleteBtn.addEventListener('click', (e) => handleRemoveCard(e, elem._id));
    }

    title.textContent = elem.name;
    img.src = elem.link;
    img.alt = elem.name;
    likeCounter.textContent = elem.likes.length;

    const alreadyLiked = elem.likes.find((like) => like._id === userId);
    if (alreadyLiked) {
        like.classList.add('card__like-button_is-active');
    }

    like.addEventListener('click', (e) => handleClickLike(e, likeCounter, elem._id));
    img.addEventListener('click', handleOpenImg);

    return card;
}
