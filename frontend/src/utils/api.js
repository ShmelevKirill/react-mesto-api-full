class Api {
  constructor({
    url,
    headers
  }) {
    this._url = url;
    this._headers = headers;
    }
    _handleResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
          headers: this._headers,
      }).then(this._handleResponse);
    }
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
          headers: this._headers,
      }).then(this._handleResponse);
    }
    getAllData() {
      return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
    addCard({
      name,
      link
    }) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name,
            link
          })
        }).then(this._handleResponse);
    }
    setUserInfo({
      name,
      about
    }) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name,
              about
          })
        }).then(this._handleResponse);
    }
    setUserAvatar({
      avatar
    }) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar
          })
        }).then(this._handleResponse);
    }
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      }).then(this._handleResponse);
    }
    setLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      }).then(this._handleResponse);
    }
    deleteLike(cardId) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      }).then(this._handleResponse);
    }
}

export const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "10672816-06e3-49fd-b34a-62a0815f6866",
    "Content-Type": "application/json",
  },
});