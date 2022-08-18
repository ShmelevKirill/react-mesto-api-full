import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useValidation } from "../utils/useValidation"

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoad,
}) {
  const {values, handleChange, errors, isValid, resetForm} = useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar,
    });
  }
    React.useEffect(() => {
      resetForm();
    }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      loadingButtonText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
      isDisabled={!isValid}
    >
      <input
        type="url"
        name="avatar"
        value={values.avatar ?? ''}
        id="link-input-avatar"
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        className={`popup__input popup__container-avatar && "popup__input_type_error"}`}
        required
    />
      <span className={`url-avatar-error ${errors.avatar && "popup__input-error"}`}>
                {errors.avatar ?? ''}</span>
        </PopupWithForm>
  );
}