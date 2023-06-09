import "./SavedMovies.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import useFormValidation from "../../hooks/useFormValidation";
import { filterMoviesByQuery } from "../../utils/utils";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_SAVE } from "../../utils/config";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies({ savedMovies, handleDelete, isMenuActive, onClickBurgerBtn, loggedIn }) {
  const currentUser = React.useContext(CurrentUserContext);

  const initialState = {
    isShortMovieOn: false,
    moviesToRender: [],
    currentQuery: "",
  }
  const [state, setState] = React.useState(initialState);
  const formValidation = useFormValidation();

  const handleShortMovies = () => {
    const newState = { ...state, isShortMovieOn: !state.isShortMovieOn };
    setState(newState);
    saveStateToLocalStorage(newState);
  }

  const saveStateToLocalStorage = (newState) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_SAVE,
      JSON.stringify({
        isShortMovieOn: newState.isShortMovieOn,
        moviesToRender: newState.moviesToRender,
        currentQuery: newState.currentQuery,
      }));
  }

  const saveSavedMoviesToLocalStorage = (newSavedMovies) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        ...state,
        savedMovies: newSavedMovies,
      }));
  }

  const handleDeleteMovie = (movie) => {
    handleDelete(movie, saveSavedMoviesToLocalStorage);
  }

  const handleSearchSubmit = (query) => {
    const newState = {
      ...state,
      moviesToRender: filterMoviesByQuery(
        savedMovies,
        query,
        state.isShortMovieOn),
    }
    setState(newState);
    saveStateToLocalStorage(newState);
  }


  React.useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY_SAVE);
    if (storedData) {
      const restoredData = JSON.parse(storedData);
      restoredData.moviesToRender = filterMoviesByQuery(
        savedMovies,
        restoredData.currentQuery,
        restoredData.isShortMovieOn)
      setState(restoredData);
      formValidation.values.query = restoredData.currentQuery;
    } else {
      const newState = {
        ...state,
        moviesToRender: filterMoviesByQuery(
          savedMovies,
          "",
          state.isShortMovieOn),
      }
      setState(newState);
      saveStateToLocalStorage(newState);
    }
  }, [currentUser, savedMovies]);


  return (
    <>
      <Header>
        <Navigation
          loggedIn={loggedIn}
          isMenuActive={isMenuActive}
          onClickBurgerBtn={onClickBurgerBtn}
        />
      </Header>
      <main className="saved-movies">
        <SearchForm
          formValidation={formValidation}
          handleShortMovies={handleShortMovies}
          shortMovies={state.isShortMovieOn}
          handleSearchSubmit={handleSearchSubmit}
        />
        <MovieCardList
          movies={state.moviesToRender}
          savedMovies={savedMovies}
          handleDelete={handleDeleteMovie} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;