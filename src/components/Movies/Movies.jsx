import "./Movies.css";
import { useState, useContext, useEffect } from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import movieApi from "../../utils/MovieApi";
import { filterMoviesByQuery, preProcessMovies } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from '../../hooks/useFormValidation';
import Preloader from "../Preloader/Preloader";
import { LOCAL_STORAGE_KEY } from "../../utils/config";

function Movies({ handleSave, savedMovies, setIsInfoTooltip, isMenuActive, onClickBurgerBtn, handleDelete, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const initialState = {
    isShortMovieOn: false,
    moviesToRender: [],
    currentQuery: "",
    status: "initial",
    movies: [],
  }
  const [state, setState] = useState(initialState);
  const formValidation = useFormValidation();

  const handleShortMovies = () => {
    const newState = { ...state, isShortMovieOn: !state.isShortMovieOn };
    setState(newState);
    saveStateToLocalStorage(newState);
  }

  const saveStateToLocalStorage = (newState) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        isShortMovieOn: newState.isShortMovieOn,
        moviesToRender: newState.moviesToRender,
        currentQuery: newState.currentQuery,
        movies: newState.movies,
      }));
  }

  const handleExistingMovieList = (query) => {
    const newMovieList =
      filterMoviesByQuery(state.movies, query, state.isShortMovieOn)
    if (newMovieList.length !== 0) {
      const newState = {
        ...state,
        status: "hasMoviesToRender",
        moviesToRender: newMovieList,
        currentQuery: query,
      }
      setState(newState);
      saveStateToLocalStorage(newState);
    } else {
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: "Ничего не найдено",
      })
      setState({
        ...state,
        status: "initial",
      })
    }

  }
  const handleNewMovieList = (movieList, query) => {
    if (movieList) {
      const newMovieList = preProcessMovies(
        filterMoviesByQuery(movieList, query, state.isShortMovieOn)
      );
      if (newMovieList.length !== 0) {
        const newState = {
          ...state,
          status: "hasMoviesToRender",
          moviesToRender: newMovieList,
          currentQuery: query,
          movies: movieList,
        }
        setState(newState);
        saveStateToLocalStorage(newState);
      } else {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: "Ничего не найдено",
        })
        setState({
          ...state,
          status: "initial",
        })
      }
    }
  }

  const downloadMovies = (query) => {
    setState({
      ...state,
      status: "preloader",
    });
    movieApi.getMovies()
      .then((movieList) => {
        handleNewMovieList(movieList, query, true);
      })
      .catch(() => {
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
        })
        setState({
          ...state,
          status: "initial",
        })
      });
  }

  const handleSearchSubmit = (query) => {
    if (state.movies.length > 0) {
      handleExistingMovieList(query);
    } else {
      downloadMovies(query);
    }

  }

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    setState({
      ...state,
      status: "preloader",
    });
    if (storedData) {
      const restoredData = JSON.parse(storedData);
      restoredData.status = "hasMoviesToRender";
      restoredData.movies = [];
      setState(restoredData);
      formValidation.values.query = restoredData.currentQuery;
    } else {
      setState({
        ...state,
        status: "initial",
      })
    }
  }, [currentUser, loggedIn]);


  return (
    <>
      <Header>
        <Navigation
          isMenuActive={isMenuActive}
          onClickBurgerBtn={onClickBurgerBtn}
          loggedIn={loggedIn}
        />
      </Header>
      <main className="movies">
        <SearchForm
          formValidation={formValidation}
          handleShortMovies={handleShortMovies}
          shortMovies={state.isShortMovieOn}
          handleSearchSubmit={handleSearchSubmit} />
        {
          state.status === "hasMoviesToRender" && <MovieCardList
            movies={state.moviesToRender}
            handleSave={handleSave}
            savedMovies={savedMovies}
            handleDelete={handleDelete} />
        }
        {
          state.status === "preloader" && <Preloader isOpen={true} />
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;
