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
  // const handleSearchSubmit = (query) => {
  //   setState({
  //     ...state,
  //     status: "preloader",
  //   });
  //   movieApi.getMovies()
  //     .then((movieList) => {
  //       if (movieList) {
  //         const newMovieList = preProcessMovies(
  //           filterMoviesByQuery(movieList, query, state.isShortMovieOn)
  //         );
  //         if (newMovieList.length !== 0) {
  //           const newState = {
  //             ...state,
  //             status: "hasMoviesToRender",
  //             moviesToRender: newMovieList,
  //             currentQuery: query,
  //           }
  //           setState(newState);
  //           localStorage.setItem(
  //             currentUser.email,
  //             JSON.stringify({
  //               isShortMovieOn: newState.isShortMovieOn,
  //               moviesToRender: newState.moviesToRender,
  //               currentQuery: newState.currentQuery,
  //             })
  //           );
  //         } else {
  //           setState({
  //             ...state,
  //             status: "searchResultEmpty",
  //           })
  //         }
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //       setState({
  //         ...state,
  //         status: "downloadError",
  //       })
  //     });
  // }

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
          savedMovies={savedMovies}
          handleButton={handleDeleteMovie} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;