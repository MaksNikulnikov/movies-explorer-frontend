import React from "react";
import "./App.css";
import Main from "./Main/Main";
import { Route, Routes } from "react-router-dom";
import Movies from "./Movies/Movies";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isMenuActive, setIsMenuActive] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const handleBurgerBtnClick = () => {
    setIsMenuActive(!isMenuActive);
  };
  return (
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
                isMenuActive={isMenuActive}
                onClickBurgerBtn={handleBurgerBtnClick}
              />
            }
          ></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
