import React from "react";
import "./App.css";
import Main from "./Main/Main";

function App() {
  const [isMenuActive, setIsMenuActive] = React.useState(false);
  const [isAuthorized, setIsAuthorized] = React.useState(true);

  const handleBurgerBtnClick = () => {
    setIsMenuActive(!isMenuActive);
  };
  return (
    <div className="App">
      <Main
        isAuthorized={isAuthorized}
        isMenuActive={isMenuActive}
        onClickBurgerBtn={handleBurgerBtnClick}
      ></Main>
    </div>
  );
}

export default App;
