class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getAuthHeader() {
    const jwt = localStorage.getItem('jwt');
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }else {

    return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
        headers: { ...this._headers, ...this._getAuthHeader() },
      })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: { ...this._headers, ...this._getAuthHeader() },
      })
      .then(this._handleResponse);
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  addCard({
    name,
    link
  }) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: { ...this._headers, ...this._getAuthHeader() },
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(this._handleResponse);
  }

  setUserInfo({
    name,
    about
  }) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: { ...this._headers, ...this._getAuthHeader() },
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(this._handleResponse);
  }

  setUserAvatar({
    avatar
  }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: { ...this._headers, ...this._getAuthHeader() },
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: { ...this._headers, ...this._getAuthHeader() },
      })
      .then(this._handleResponse);
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: { ...this._headers, ...this._getAuthHeader() },
      })
      .then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: { ...this._headers, ...this._getAuthHeader() },
      })
      .then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: "https://api.mestoproject.nomoredomains.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});