import React from "react";
import { Link } from "react-router-dom";
import { useValidation } from "../utils/useValidation";

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = values;
    onRegister(email, password);
  }
  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="authorization">
      <div className="authorization__container">
        <h2 className="authorization__title">Регистрация</h2>
          <form className="authorization__form"  onSubmit={handleSubmit}>
            <input
              className={`authorization__input ${errors.email && "popup__input_type_error"}`}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={values.email ?? ""}
              onChange={handleChange}
              required
            ></input>
            <span
              className={`place-input-error ${errors.email && "popup__input-error"}`}>
                {errors.email ?? ""}
            </span>
            <input
              className={`authorization__input ${
                errors.password && "popup__input_type_error"
              }`}
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              value={values.password ?? ""}
              onChange={handleChange}
              required
            ></input>
            <span
              className={`place-input-error ${errors.email && "popup__input-error"}`}>
                {errors.password ?? ""}
            </span>
            <button className="authorization__button button" type="submit" disabled={!isValid}>
              Зарегистрироваться
            </button>
          </form>
          <div className="authorization__registration">
          <p className="authorization__text">
              Уже зарегистрированы?{" "}
          </p>
          <Link to="/sign-in" className="authorization__link button">
            Войти
          </Link>
          </div>
      </div>
    </section>
  )
}

export default Register;