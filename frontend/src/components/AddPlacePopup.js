import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../utils/useValidation";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoad,
}) {
  const {values, handleChange, errors, isValid, resetForm} = useValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
}
  React.useEffect(() => {
   resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      loadingButtonText="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoad={isLoad}
      isDisabled={!isValid}
    >
      <input
        type="text"
        name="name"
        id="title-input"
        placeholder="Название"
        className={`popup__input popup__input_place ${errors.name && "popup__input_type_error"}`}
        required
        value={values.name ?? ''}
        onChange={handleChange}
        minLength="2"
        maxLength="30"
    />
      <span className={`place-input-error ${errors.name && "popup__input-error"}`}> {errors.name ?? ''}</span>

        <input
          type="url"
          name="link"
          id="link-input"
          placeholder="Ссылка на картинку"
          className={`popup__input popup__input_url ${errors.link && "popup__input_type_error"}`}
          required
          value={values.link ?? ''}
          onChange={handleChange}
    />
        <span className={`place-input-error ${errors.link && "popup__input-error"}`}>
                {errors.link ?? ''}</span>
    </PopupWithForm>
  )
}