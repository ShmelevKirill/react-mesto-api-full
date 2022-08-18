import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__container-like ${isLiked ? "element__container-like_active" : ""}`;

  return (
    <li className="element">
      <button className="element__trash button"  hidden={!isOwn} onClick={handleDeleteClick}></button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__container-title">{card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__container_like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;