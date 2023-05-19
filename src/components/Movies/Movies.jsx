import "./Movies.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

function Movies({isAuthorized, isMenuActive, onClickBurgerBtn}) {
  const [shortMovies, setShortMovies] = React.useState(false);

  function handleShortMovies() {
    setShortMovies(!shortMovies);
}

  return (
    <>
      <Header>
        <Navigation
          isAuthorized={isAuthorized}
          isMenuActive={isMenuActive}
          onClickBurgerBtn={onClickBurgerBtn}
        />
      </Header>
      <main className="movies">
        <SearchForm handleShortMovies={handleShortMovies} shortMovies={shortMovies}/>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
