class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    }
    this_handleResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _headers() {
      const jwt = localStorage.getItem('jwt');
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      };
    }

    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers()
      }).then(res => this._handleResponse(res))
        .then(res => res.data)
    };
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers()
      }).then(res => this._handleResponse(res))
        .then(res => res.data)
    };
    getAllData() {
      return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
    addCard({
      name,
      link
    }) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers(),
          body: JSON.stringify({
            name,
            link
          })
        }).then(res => this._handleResponse(res))
          .then(res => res.data)
    };
    setUserInfo({
      name,
      about
    }) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers(),
          body: JSON.stringify({
              name,
              about
          })
        }).then(res => this._handleResponse(res))
          .then(res => res.data)
    };
    setUserAvatar({
      avatar
    }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers(),
          body: JSON.stringify({
            avatar
          })
        }).then(res => this._handleResponse(res))
          .then(res => res.data)
    };
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers()
      }).then(res => this._handleResponse(res))
        .then(res => res.data)
    };
    setLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers()
      }).then(res => this._handleResponse(res))
        .then(res => res.data)
    };
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers()
      }).then(res => this._handleResponse(res))
        .then(res => res.data)
    };
}

export const api = new Api ({
  baseUrl: "https://api.mestoproject.nomoredomains.sbs",
});