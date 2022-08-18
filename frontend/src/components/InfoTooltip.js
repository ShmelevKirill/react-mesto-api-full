import React from "react";

function InfoTooltip({ isOpen, onClose, image, title }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
    document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClose = (e) => {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
  };

  return (
    <div className={`popup popup__authorization ${isOpen && "popup_opened"}`}
      onClick={handleOverlayClose}
    >
    <div className="popup__authorization-container popup__container">
    <img 
      className="popup__authorization-image" 
      src={image} 
      alt="Успешно либо нет" 
    />
    <h2 className="popup__authorization-text">
      {title}
    </h2>
    <button
      type="button"
      aria-label="Закрыть"
      className="popup__close"
      onClick={onClose}
    ></button>
  </div>
</div>
  )
}

export default InfoTooltip;


