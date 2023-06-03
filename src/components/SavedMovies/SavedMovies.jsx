import "./SavedMovies.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";

function SavedMovies({movies, isMenuActive, onClickBurgerBtn}) {
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
      <main className="saved-movies">
        <SearchForm handleShortMovies={handleShortMovies} shortMovies={shortMovies}/>
        <MovieCardList movies={movies}/>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;