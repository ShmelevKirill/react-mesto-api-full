import React from "react";

function ImagePopup({ card, onClose }) {
  React.useEffect(() => {
    if (!card) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [card, onClose]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && card) {
      onClose();
    }
  };

  return (
    <div className={`popup popup_photo popup_image ${card && "popup_opened"}`} onClick={handleOverlayClose}>
      <div className="popup__container-img">
      <button
          onClick={onClose}
          type="button"
          className="popup__close"
          aria-label="Закрыть"
        ></button>
          <img
            src={card?.link}
            alt={card?.name}
            className="popup__img"
          />
          <h3 className="popup__title">
            {card?.name}
          </h3>
      </div>
    </div>
  );
}

export default ImagePopup;