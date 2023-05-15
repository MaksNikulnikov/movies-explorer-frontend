import "./Main.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

function Main({ isAuthorized, isMenuActive, onClickBurgerBtn }) {
  return (
    <main className="main">
      <Header>
        <Navigation
          isAuthorized={isAuthorized}
          isMenuActive={isMenuActive}
          onClickBurgerBtn={onClickBurgerBtn}
        />
      </Header>
    </main>
  );
}

export default Main;
