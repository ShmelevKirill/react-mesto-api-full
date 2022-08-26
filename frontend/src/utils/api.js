class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

    this._getJSON = function(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    };
  }
  
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(res => this._getJSON(res))
    .then(res => res.data)
  };

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._getHeaders()
    })
    .then(res => this._getJSON(res))
    .then(res => res.data)
  };
  
  setUser(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
    .then(res => this._getJSON(res))
    .then(res => res.data)
  };

  setCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: card.place,
        link: card.link,
      })
    })
    .then(res => this._getJSON(res))
    .then(res => res.data)
  };

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
    .then(res => this._getJSON(res))
  };

  setAvatar(picture) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: picture.link
      })
    })
    .then(res => this._getJSON(res))
    .then(res => res.data)
  };

  toggleLike(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._getHeaders()
      })
      .then(res => this._getJSON(res))
      .then(res => res.data)
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._getHeaders()
      })
      .then(res => this._getJSON(res))
      .then(res => res.data)
    }
  };
}

export const api = new Api({
  baseUrl: 'https://api.mestoproject.nomoredomains.sbs',
});