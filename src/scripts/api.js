const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-magistr-2',
    headers: {
        authorization: '9846ed0c-c4e1-4ea6-908a-b2ce6da86d40',
        'Content-Type': 'application/json'
    }
};

export const getUsersInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'GET'
    });
};

export const editUsersInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify(data)
    });
};

export const changeUsersAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify(data)
    });
};

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'GET'
    });
};

export const addNewCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify(data)
    });
};

export const deleteCard = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        headers: config.headers,
        method: 'DELETE'
    });
};

export const makeLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        headers: config.headers,
        method: 'PUT'
    });
};
export const removeLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        headers: config.headers,
        method: 'DELETE'
    });
};
