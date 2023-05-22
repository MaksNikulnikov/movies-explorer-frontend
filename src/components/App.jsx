import React from "react";
import "./App.css";
import Main from "./Main/Main";
import { Route, Routes } from "react-router-dom";
import Movies from "./Movies/Movies";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Preloader from "./Preloader/Preloader";
import movieApi from "../utils/MovieApi";

function App() {
  const [isMenuActive, setIsMenuActive] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);

  const handleBurgerBtnClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  React.useEffect(() => {
    console.log('useEffect',movieApi.getMovies())
    setMovies(movieApi.getMovies());
    
  }, [movies]);

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
            ></Route>
            <Route
              path="/movies"
              element={
                <Movies
                  movies={movies}
                  isMenuActive={isMenuActive}
                  onClickBurgerBtn={handleBurgerBtnClick}
                />
              }
            ></Route>
          </Routes>
        </div>
      </CurrentUserContext.Provider>
      <Preloader isOpen={isLoading} />
    </>
  );
}

export default App;
