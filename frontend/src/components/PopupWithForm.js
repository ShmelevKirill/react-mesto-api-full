import React from "react";

function PopupWithForm({ title, name, buttonText, loadingButtonText, 
  isLoad, isOpen, onClose, onSubmit, children, isDisabled = false, }) {
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
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}
      onClick={handleOverlayClose}
      >
        <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close"
          aria-label="Закрыть"
        ></button>
        <h3 className="popup__heading">{title}</h3>
        <form className="popup__container-form"
          name={name}
          onSubmit={onSubmit}
          noValidate
      >
          {children}
          <button
            type="submit"
            disabled={isDisabled}
            className={`popup__submit ${isDisabled && "popup__submit_disabled"}`}>
            {!isLoad ? buttonText : loadingButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;