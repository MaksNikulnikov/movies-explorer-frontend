import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";

function App() {
  const [isMenuActive, setIsMenuActive] = React.useState(false);
  const [isAuthorized, setIsAuthorized] = React.useState(true);

  const handleBurgerBtnClick = (isMenuActive) => {
    setIsMenuActive(!isMenuActive);
  };
  return (
    <div className="App">
      <Header>
        <Navigation
          isAuthorized={isAuthorized}
          isMenuActive={isMenuActive}
          onClickBurgerBtn={handleBurgerBtnClick}
        />
      </Header>
    </div>
  );
}

export default App;
