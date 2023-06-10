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
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import { LOCAL_STORAGE_KEY_APP } from "../utils/config";


function App() {
  const navigate = useNavigate();
  const [isMenuActive, setIsMenuActive] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = React.useState({
    isOpen: false,
    successful: true,
    text: '',
  });
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  const handleBurgerBtnClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  const goBack = () => {
    navigate(-1);
  };

    function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
  }

  const saveSavedMoviesToLocalStorage = (newSavedMovies) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_APP,
      JSON.stringify({
        savedMovies: newSavedMovies,
      }));
  }

  function handleSaveMovie(movie) {
    if (!savedMovies.find(savedMovie => savedMovie.movieId === movie.id)) {
      setIsLoading(true);
      mainApi
        .saveMovie(movie)
        .then(newMovie => {
          if (!savedMovies.find(item => {
            return item.movieId === newMovie.movieId
          })) {
            const newSavedMovies = [...savedMovies, newMovie];
            setSavedMovies(newSavedMovies);
            saveSavedMoviesToLocalStorage(newSavedMovies);
          }
        })
        .catch(err => {
          setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err.message,
        })
        })
        .finally(() => setIsLoading(false));
    }
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
        saveSavedMoviesToLocalStorage(newSavedMovies);
      })
      .catch(err => setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err.message,
        })
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
      .catch(err => setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err.message,
        }))
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
          setIsInfoTooltip({
            isOpen: true,
            successful: true,
            text: 'Добро пожаловать!',
          });
        }
      })
      .catch(err => setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err.message,
        }))
      .finally(() => setIsLoading(false));
  }

  function handleLogOut() {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }

  function handleProfile({ name, email }) {
    setIsLoading(true);
    mainApi
      .updateUser(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
        setIsInfoTooltip({
          isOpen: true,
          successful: true,
          text: 'Ваши данные обновлены!',
        });
      })
      .catch(err => setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err.message,
        }))
      .finally(() => setIsLoading(false));
  }

  React.useEffect(() => {
    if (isLoggedIn && currentUser) {
      setIsLoading(true);
      mainApi
        .getSavedMovies()
        .then(data => {
          const restoredSavedMovies = data.filter(m => m.owner === currentUser._id);
          setSavedMovies(restoredSavedMovies);
          saveSavedMoviesToLocalStorage(restoredSavedMovies);
        })
        .catch(err => setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err.message,
        }))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser, isLoggedIn]);

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
        .catch(err => {
          setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: err.message,
        })
        })
        .finally(() => {
          setIsLoading(false);
          setIsReady(true);
        });
    } else {
      setIsReady(true);
    }

  }, [isLoggedIn]);

  return (
    <>
      {isReady ? (<CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  loggedIn={isLoggedIn}
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
                handleSave={handleSaveMovie}
                handleDelete={handleDeleteMovie}
                setIsInfoTooltip={setIsInfoTooltip}
                savedMovies={savedMovies}
                isMenuActive={isMenuActive}
                onClickBurgerBtn={handleBurgerBtnClick}
              />} />
            <Route
              path='/saved-movies'
              element={<ProtectedRoute
                component={SavedMovies}
                loggedIn={isLoggedIn}
                handleDelete={handleDeleteMovie}
                setIsInfoTooltip={setIsInfoTooltip}
                savedMovies={savedMovies}
                isMenuActive={isMenuActive}
                onClickBurgerBtn={handleBurgerBtnClick}
              />} />
            <Route
              path="/signin"
              element={<ProtectedRoute
                component={Login}
                loggedIn={!isLoggedIn}
                handleLogin={handleLogin}
              />} />
            <Route
              path="/signup"
              element={<ProtectedRoute
                component={Register}
                loggedIn={!isLoggedIn}
                handleRegister={handleRegister}
              />} />
            <Route
              path='/profile'
              element={<ProtectedRoute
                component={Profile}
                loggedIn={isLoggedIn}
                handleProfile={handleProfile}
                isMenuActive={isMenuActive}
                onClickBurgerBtn={handleBurgerBtnClick}
                handleLogout={handleLogOut}
              />} />
            <Route path="*" element={<NotFound goBack={goBack} />} />
          </Routes>
          <InfoTooltip
            status={isInfoTooltip}
            onClose={closeInfoTooltip}
          />
        </div>
      </CurrentUserContext.Provider>) : (<Preloader isOpen={true} />)}
    </>
  );
}

export default App;
