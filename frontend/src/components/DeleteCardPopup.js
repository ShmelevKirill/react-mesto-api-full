import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function DeleteCardPopup({
  card,
  isOpen,
  onClose,
  onDeleteCard,
  isLoad,
}) {
    function handleSubmit(evt) {
      evt.preventDefault();

      onDeleteCard(card);
    }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText="Да"
      loadingButtonText="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onDeleteCard={onDeleteCard}
      isLoad={isLoad}
    />
  );
}