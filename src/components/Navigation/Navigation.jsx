import "./Navigation.css";
import React from "react";
import { Link } from "react-router-dom";

function Navigation({ isAuthorized, isMenuActive, onClickBurgerBtn }) {
  const handleOnClickBurger = () => {
    onClickBurgerBtn(isMenuActive);
  };

  return (
    <>
      {!isAuthorized ? (
        <nav>
          <ul className="navigation__list">
            <li>
              <Link to="signup" className="navigation__link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="signin"
                className="navigation__link navigation__link_type_signin"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <button
            className={`navigation__burger-btn ${
              isMenuActive ? "" : "navigation__burger-btn_state_disabled"
            }`}
            type="button"
            onClick={handleOnClickBurger}
          >
            <span className="navigation__burger-btn_icon"></span>
          </button>

          <nav
            className={`navigation ${
              isMenuActive ? "navigation_state_disabled" : ""
            }`}
          >
            <button
              className="navigation__close-btn"
              type="button"
              onClick={handleOnClickBurger}
            >
              <span className="navigation__close-btn_icon"></span>
            </button>
            <ul className={"navigation__list navigation__list_main-menu"}>
              <li className="navigation__list-item">
                <Link
                  to="/"
                  className="link navigation__link navigation__link_type_menu navigation__link_type_home"
                  tabIndex={`${isMenuActive ? "" : "-1"}`}
                >
                  Главная
                </Link>
              </li>
              <li className="navigation__list-item">
                <Link
                  to="movies"
                  className="link navigation__link navigation__link_type_menu navigation__link_type_movies navigation__link_state_active"
                  tabIndex={`${isMenuActive ? "" : "-1"}`}
                >
                  Фильмы
                </Link>
              </li>
              <li className="navigation__list-item">
                <Link
                  to="saved-movies"
                  className="link navigation__link navigation__link_type_menu navigation__link_type_saved-movies"
                  tabIndex={`${isMenuActive ? "" : "-1"}`}
                >
                  Сохранённые фильмы
                </Link>
              </li>
              <li className="navigation__list-item">
                <Link
                  to="profile"
                  className="link navigation__link navigation__link_type_account"
                  tabIndex={`${isMenuActive ? "" : "-1"}`}
                >
                  Аккаунт<div className="navigation__acount-icon"></div>
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}{" "}
    </>
  );
}

export default Navigation;
