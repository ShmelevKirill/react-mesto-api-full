import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__button button" to="/sign-up">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="sign-up"
          element={
            <Link className="header__button button" to="/sign-in">
              Войти
            </Link>
          }
      ></Route>
      <Route
        path="/"
        element={
          <div className="header__wrapper">
            <p className="header__login">{email}</p>
              <button 
                className="header__exit button"
                onClick={onSignOut}
                type="button"
              >
                Выйти
              </button>
          </div>
        }
      ></Route>
    </Routes>
      

    </header>
  );
}

export default Header;