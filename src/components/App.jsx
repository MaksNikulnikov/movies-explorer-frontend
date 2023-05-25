import React from "react";
import "./App.css";
import Main from "./Main/Main";
import { Route, Routes, useNavigate } from "react-router-dom";
import Movies from "./Movies/Movies";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Preloader from "./Preloader/Preloader";
import movieApi from "../utils/MovieApi";
import SavedMovies from "./SavedMovies/SavedMovies";
import Login from "./Login/Login";
import Register from "./Register/Register";
import NotFound from "./NotFound/NotFound";

function App() {
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const handleBurgerBtnClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const goBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    setMovies(movieApi.getMovies());
  }, [movies]);

  React.useEffect(() => {
    setSavedMovies(movieApi.getSavedMovies());
  }, [savedMovies]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isMenuActive={isMenuActive}
                  onClickBurgerBtn={handleBurgerBtnClick}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <Movies
                  movies={movies}
                  isMenuActive={isMenuActive}
                  onClickBurgerBtn={handleBurgerBtnClick}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  movies={savedMovies}
                  isMenuActive={isMenuActive}
                  onClickBurgerBtn={handleBurgerBtnClick}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  movies={savedMovies}
                  isMenuActive={isMenuActive}
                  onClickBurgerBtn={handleBurgerBtnClick}
                />
              }
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<NotFound goBack={goBack} />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
      <Preloader isOpen={isLoading} />
    </>
  );
}

export default App;
