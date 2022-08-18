import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__photo">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
            <button
              onClick={onEditAvatar}
              className="profile__avatar-cover"
              type="button"
              aria-label="Обновить аватар"
            ></button>
        </div>

        <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit button"
                type="button"
                aria-label="Редактировать профиль"
              ></button>
            <h2 className="profile__status">{currentUser.about}</h2>
        </div>
        
        <button
          onClick={onAddPlace}
          className="profile__button button"
          type="button"
          aria-label="Добавить фото"
        ></button>
      </section>
      
      <section className="elements" aria-label="Карточки">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;