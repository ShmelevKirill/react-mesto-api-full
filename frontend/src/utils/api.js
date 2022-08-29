class Api {
  constructor({
    baseUrl,
  }) {
    this._baseUrl = baseUrl;
  }


  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
      })
      .then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    },
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
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
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
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
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
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          avatar
        })
      })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._handleResponse);
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
      },
      })
      .then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: "https://api.mestoproject.nomoredomains.sbs",
});