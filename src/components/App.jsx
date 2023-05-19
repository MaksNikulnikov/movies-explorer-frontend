import React from "react";
import "./App.css";
import Main from "./Main/Main";
import { Route, Routes } from "react-router-dom";
import Movies from "./Movies/Movies";

function App() {
  const [isMenuActive, setIsMenuActive] = React.useState(false);
  const [isAuthorized, setIsAuthorized] = React.useState(true);

  const handleBurgerBtnClick = () => {
    setIsMenuActive(!isMenuActive);
  };
  return (
    <div className="root">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isAuthorized={isAuthorized}
              isMenuActive={isMenuActive}
              onClickBurgerBtn={handleBurgerBtnClick}
            />
          }
        ></Route>
        <Route
          path="/movies"
          element={
            <Movies
              isAuthorized={isAuthorized}
              isMenuActive={isMenuActive}
              onClickBurgerBtn={handleBurgerBtnClick}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
