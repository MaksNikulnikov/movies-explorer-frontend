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
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";


function App() {
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleBurgerBtnClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const goBack = () => {
    navigate(-1);
  };

  function handleSaveMovie(movie) {
    setIsLoading(true);
    mainApi
      .saveMovie(movie)
      .then(newMovie => {
        if (!savedMovies.find(item => {
          return item.movieId === newMovie.movieId
        })) {
          const newSavedMovies = [...savedMovies, newMovie];
          setSavedMovies(newSavedMovies);
          localStorage.setItem(
            `${currentUser.email}-savedMovies`,
            JSON.stringify(newSavedMovies));
        }
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));;
  }

  function handleDeleteMovie(deletedSavedMovie) {
    setIsLoading(true);
    const savedMovie = savedMovies.find(
      (savedMovie) => savedMovie.movieId === deletedSavedMovie.movieId);
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(savedMovie => deletedSavedMovie.movieId !== savedMovie.movieId);
        setSavedMovies(newSavedMovies);
        localStorage.setItem(
          `${currentUser.email}-savedMovies`,
          JSON.stringify(newSavedMovies));
      })
      .catch(err => { console.error(err); }
      )
      .finally(() => setIsLoading(false));;
  }

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    mainApi
      .createUser(name, email, password)
      .then(data => {
        if (data._id) {
          handleLogin({ email, password });
        }
      })
      .catch(err => { console.error(err); })
      .finally(() => setIsLoading(false));
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then(jwt => {
        if (jwt.token) {
          localStorage.setItem('jwt', jwt.token);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch(err => { console.error(err); })
      .finally(() => setIsLoading(false));
  }

  function handleLogOut() {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate('/');
  }

  function handleProfile({ name, email }) {
    setIsLoading(true);
    mainApi
      .updateUser(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
      })
      .catch(err => { console.error(err); })
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then(res => {
          setCurrentUser(res);
          const storedSavedMovies = localStorage.getItem(`${currentUser.email}-savedMovies`);
          if (storedSavedMovies) {
            setSavedMovies(JSON.parse(storedSavedMovies));
          }

        })
        .catch(err => { console.error(err); })
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const path = window.location.pathname;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then(data => {
          if (data) {
            setIsLoggedIn(true);
            setCurrentUser(data);
            navigate(path);
          }
        })
        .catch(err => { console.error(err); })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);


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
              element={<ProtectedRoute
                component={Movies}
                loggedIn={isLoggedIn}
                handleSaveMovie={handleSaveMovie}
                savedMovies={savedMovies}
                isMenuActive={isMenuActive}
                onClickBurgerBtn={handleBurgerBtnClick}
              />}/>
            <Route
              path='/saved-movies'
              element={<ProtectedRoute
                component={SavedMovies}
                loggedIn={isLoggedIn}
                handleDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                isMenuActive={isMenuActive}
                onClickBurgerBtn={handleBurgerBtnClick}
              />}/>
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />} />
            <Route 
            path='/profile'
            element={<ProtectedRoute
              component={Profile}
              loggedIn={isLoggedIn}
              handleProfile={handleProfile}
              isMenuActive={isMenuActive}
              onClickBurgerBtn={handleBurgerBtnClick}
              handleLogout={handleLogOut}
            />}/>
            <Route path="*" element={<NotFound goBack={goBack} />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>
      <Preloader isOpen={isLoading} />
    </>
  );
}

export default App;
