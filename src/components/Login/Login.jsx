import "./Login.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

export default function Login() {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="login">
      <form
        className="login__form"
        name="login"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="login__form_main">
          <Link to="/" className="login__link">
            <img src={logo} alt="Логотип" className="login__logo" />
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
          <div className="login__labels-container">
            <label className="login__label">
              <span className="login__label-text">E-mail</span>
              <input
                name="email"
                className={`login__input ${
                  errors.email && "login__input_error"
                }`}
                onChange={handleChange}
                value={values.email || ""}
                type="email"
                required
              />
              <span className="login__error">{errors.email || ""}</span>
            </label>
            <label className="login__label">
              <span className="login__label-text">Пароль</span>
              <input
                name="password"
                className={`login__input ${
                  errors.password && "login__input_error"
                }`}
                onChange={handleChange}
                value={values.password || ""}
                type="password"
                required
              />
              <span className="login__error">{errors.password || ""}</span>
            </label>
          </div>
        </div>

        <div className="login__form_footer">
          <button
            type="submit"
            className={`login__button ${!isValid && "login__button_disabled"}`}
            disabled={!isValid}
          >
            Войти
          </button>
          <span className="login__support">
            Ещё не зарегистрированы?&nbsp;
            <Link to="signup" className="login__regiatration-link">
              Регистрация
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
}
