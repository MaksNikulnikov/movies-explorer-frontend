import "./SearchForm.css";
import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ shortMovies, handleShortMovies }) {
  const [query, setQuery] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery("");
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <section className="search-form">
      <form name="movies" onSubmit={handleSubmit} className="search-form__form">
        <input
          type="text"
          className="search-form__input"
          value={query}
          onChange={handleChange}
          placeholder="Фильм"
        />
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
