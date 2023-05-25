import "./Profile.css";
import { useEffect } from "react";
import useFormValidation from "../../hooks/useFormValidation";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

export default function Profile({ isMenuActive, onClickBurgerBtn }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormValidation();
  function handleSubmit(e) {
    e.preventDefault();
    // handleProfile(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <>
      <Header>
        <Navigation
          isMenuActive={isMenuActive}
          onClickBurgerBtn={onClickBurgerBtn}
        />
      </Header>
      <main className="profile">
        <form
          className="profile__form"
          name="profile"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="profile__form_main">
            <h1 className="profile__title">{`Привет, ${values.name}!`}</h1>
            <div className="profile__labels-container">
              <label className="profile__label">
                <span className="profile__label-text">Имя</span>
                <input
                  name="name"
                  className={`profile__input ${
                    errors.name && "profile__input_error"
                  }`}
                  onChange={handleChange}
                  value={values.name || "Максим"}
                  type="text"
                  required
                  minLength="2"
                  maxLength="30"
                />
                <span className="profile__error-name">{errors.name || ""}</span>
              </label>
              <label className="profile__label">
                <span className="profile__label-text">E-mail</span>
                <input
                  name="email"
                  className={`profile__input ${
                    errors.email && "profile__input_error"
                  }`}
                  onChange={handleChange}
                  value={values.email || "maxximn@yandex.ru"}
                  type="email"
                  required
                />
                <span className="profile__error">{errors.email || ""}</span>
              </label>
            </div>
          </div>
          <div className="profile__button-container">
            <button
              type="submit"
              className={`profile__button-edit ${
                !isValid && "profile__button-edit_disabled"
              }`}
              disabled={!isValid}
            >
              Редактировать
            </button>
            <button type="button" className="profile__button-exit">
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
