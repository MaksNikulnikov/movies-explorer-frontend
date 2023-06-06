import "./SavedMovies.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import useFormValidation from "../../hooks/useFormValidation";
import { filterMoviesByQuery } from "../../utils/utils";

function SavedMovies({ savedMovies, handleDeleteMovie, isMenuActive, onClickBurgerBtn }) {
  const [isShortMoviesOn, setIsShortMoviesOn] = React.useState(false);
  const [renderedMovies, setRenderedMovies] = React.useState([]);

  const formValidation = useFormValidation();

  const handleShortMovies = () => {
    setIsShortMoviesOn(!isShortMoviesOn);
  }

  const handleSearchSubmit = (query) => {
    setRenderedMovies(filterMoviesByQuery(savedMovies, query, isShortMoviesOn));
  }

  React.useEffect(()=>{
    setRenderedMovies(savedMovies);
  },[savedMovies])

  return (
    <>
      <Header>
        <Navigation
          isMenuActive={isMenuActive}
          onClickBurgerBtn={onClickBurgerBtn}
        />
      </Header>
      <main className="saved-movies">
        <SearchForm
          formValidation={formValidation}
          handleShortMovies={handleShortMovies}
          shortMovies={isShortMoviesOn}
          handleSearchSubmit={handleSearchSubmit}
        />
        <MovieCardList
          movies={renderedMovies}
          savedMovies={renderedMovies}
          handleDelete={handleDeleteMovie} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;