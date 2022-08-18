import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useValidation } from "../utils/useValidation";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoad,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setIsValid, resetForm} = useValidation();

  function handleSubmit(e) {
    e.preventDefault();
      onUpdateUser({
        name: values.name,
        about: values.about,
      });
  }

  React.useEffect(() => {
    if(currentUser) {
      resetForm ({
        name: currentUser.name,
        about: currentUser.about
      })
    }
  }, [currentUser, isOpen, resetForm, setIsValid]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
      isDisabled={!isValid}
    >
      <input
        type="text"
        value={values.name ?? ""}
        onChange={handleChange}
        name="name"
        id="name-input"
        placeholder="Ваше имя"
        className={`popup__input popup__input_name ${errors.name && "popup__input_type_error"}`}
        required
        minLength="2"
        maxLength="40"
    />
      <span className={`name-input-error ${errors.name && "popup__input-error"}`}>{errors.name ?? ''}</span>
      <input
        type="text"
        value={values.about ?? ""}
        onChange={handleChange}
        name="about"
        id="profession-input"
        placeholder="Вид деятельности"
        className={`popup__input popup__input_info ${errors.about && "popup__input_type_error"}`}
        required
        minLength="2"
        maxLength="200"
    />
      <span className={`info-input-error ${errors.about && "popup__input-error"}`}>{errors.about ?? ''}</span>
        </PopupWithForm>
  )
}