import "./Movies.css";
import { useState, useContext, useEffect } from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
import movieApi from "../../utils/MovieApi";
import { preProcessMovies } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from '../../hooks/useFormValidation';
import Preloader from "../Preloader/Preloader";

function Movies({ handleSaveMovie, savedMovies, isMenuActive, onClickBurgerBtn }) {
  const currentUser = useContext(CurrentUserContext);

  const initialState = {
    isShortMovieOn: false,
    moviesToRender: {},
    currentQuery: "",
    status: "initial",
  }
  const [state, setState] = useState(initialState);
  const formValidation = useFormValidation();

  function handleShortMovies() {
    setState({ ...state, isShortMovieOn: !state.isShortMovieOn });
  }

  const handleSearchSubmit = (query) => {
    setState({
      ...state,
      status: "preloader",
    });
    movieApi.getMovies()
      .then((movieList) => {
        if (movieList) {
          const newState = {
            ...state,
            status: "hasMoviesToRender",
            moviesToRender: preProcessMovies(movieList),
            currentQuery: query,
          }
          setState(newState);
          localStorage.setItem(
            currentUser.email,
            JSON.stringify({
              isShortMovieOn: newState.isShortMovieOn,
              moviesToRender: newState.moviesToRender,
              currentQuery: newState.currentQuery,
            })
          );
        } else {
          setState({
            ...state,
            status: "searchResultEmpty",
          })
        }
      })
      .catch(() => {
        setState({
          ...state,
          status: "downloadError",
        })
      });
  }

  useEffect(() => {
    const storedData = localStorage.getItem(currentUser.email);
    setState({
      ...state,
      status: "preloader",
    });
    if (storedData) {
      const restoredData = JSON.parse(storedData);
      restoredData.status = "hasMoviesToRender";
      setState(restoredData);
      formValidation.values.query = restoredData.currentQuery;
    } else {
      setState({
        ...state,
        status: "initial",
      })
    }
  }, [currentUser]);


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
          formValidation={formValidation}
          handleShortMovies={handleShortMovies}
          shortMovies={state.isShortMovieOn}
          handleSearchSubmit={handleSearchSubmit} />
        {
          state.status === "hasMoviesToRender" && <MovieCardList
            movies={state.moviesToRender}
            handleButton={handleSaveMovie} 
            savedMovies={savedMovies}/>
        }
        {
          state.status === "preloader" && <Preloader isOpen={true} />
        }
        {
          state.status === "downloadError" && <span className="movies__error-message">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
        }
        {
          state.status === "searchResultEmpty" && <span className="movies__error-message">Ничего не найдено</span>
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;
