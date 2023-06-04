import React from "react";
import "./App.css";
import Main from "./Main/Main";
import { Route, Routes, useNavigate } from "react-router-dom";
import Movies from "./Movies/Movies";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Preloader from "./Preloader/Preloader";
import SavedMovies from "./SavedMovies/SavedMovies";
import Login from "./Login/Login";
import Register from "./Register/Register";
import NotFound from "./NotFound/NotFound";
import Profile from "./Profile/Profile";
import mainApi from "../utils/MainApi";


function App() {
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const handleBurgerBtnClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const goBack = () => {
    navigate(-1);
  };

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then(newMovie => setSavedMovies([...savedMovies, newMovie]))
      .catch(err => {
        console.error(err);
      });
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.id);
    mainApi
      .deleteMovie(savedMovie.id)
      .then(() => {
        const newMovies = savedMovies.filter(m => movie.id !== m.movieId);
        setSavedMovies(newMovies);
      })
      .catch(err => { console.error(err); }
      );
  }


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
                  handleSaveMovie={handleSaveMovie}
                  savedMovies={savedMovies}
                  isMenuActive={isMenuActive}
                  onClickBurgerBtn={handleBurgerBtnClick}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  handleDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                  isMenuActive={isMenuActive}
                  onClickBurgerBtn={handleBurgerBtnClick}
                />
              }
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route
              path="/profile"
              element={
                <Profile
                  isMenuActive={isMenuActive}
                  onClickBurgerBtn={handleBurgerBtnClick}
                />
              }
            />
            <Route path="*" element={<NotFound goBack={goBack} />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
      <Preloader isOpen={isLoading} />
    </>
  );
}

export default App;
