import "./Movies.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";

function Movies({handleSearchSubmit, movies, isMenuActive, onClickBurgerBtn }) {
  const [shortMovies, setShortMovies] = React.useState(false);
  function handleShortMovies() {
    setShortMovies(!shortMovies);
  }

  return (
    <>
      <Header>
        <Navigation
          isMenuActive={isMenuActive}
          onClickBurgerBtn={onClickBurgerBtn}
        />
      </Header>
      <main className="movies">
        <SearchForm
          handleShortMovies={handleShortMovies}
          shortMovies={shortMovies}
          handleSearchSubmit={handleSearchSubmit} />
        <MovieCardList movies={movies} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
