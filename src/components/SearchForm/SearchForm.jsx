import "./SearchForm.css";
import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";


function SearchForm({ shortMovies, handleShortMovies, handleSearchSubmit, formValidation }) {
  const { values, handleChange, isValid } = formValidation;
  const [errorQuery, setErrorQuery] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      setErrorQuery('Нужно ввести ключевое слово.');
    } else {
      handleSearchSubmit(values.query);
    }
  };

  React.useEffect(() => {
    setErrorQuery('');
  }, [isValid]);

  return (
    <section className="search-form">
      <form name="movies" onSubmit={handleSubmit} noValidate className="search-form__form">
        <label>
          <input
            type="text"
            name="query"
            className="search-form__input"
            value={values.query || ""}
            onChange={handleChange}
            placeholder="Фильм"
            autoComplete="off"
            required
          />
          <span className="search-form__error">{errorQuery}</span>
        </label>
        <button type="submit" className="search-form__submit-btn">
          Найти
        </button>
        <FilterCheckbox
          shortMovies={shortMovies}
          handleShortMovies={handleShortMovies}
        />
      </form>
    </section>
  );
}

export default SearchForm;
