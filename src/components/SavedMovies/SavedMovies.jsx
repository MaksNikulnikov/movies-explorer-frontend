import "./SavedMovies.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import useFormValidation from "../../hooks/useFormValidation";

function SavedMovies({ savedMovies, handleDeleteMovie, isMenuActive, onClickBurgerBtn }) {
  const [shortMovies, setShortMovies] = React.useState(false);

  const formValidation = useFormValidation();

  const handleShortMovies = () => {
    setShortMovies(!shortMovies);
  }

  const handleSearchSubmit = (querry) => {

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
        <SearchForm
          formValidation={formValidation}
          handleShortMovies={handleShortMovies}
          shortMovies={shortMovies}
          handleSearchSubmit={handleSearchSubmit}
        />
        <MovieCardList
          movies={savedMovies}
          handleButton={handleDeleteMovie} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;