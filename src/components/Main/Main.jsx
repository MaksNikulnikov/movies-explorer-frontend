import "./Main.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

function Main({ isAuthorized, isMenuActive, onClickBurgerBtn }) {
  return (
    <>
      <Header>
        <Navigation
          isAuthorized={isAuthorized}
          isMenuActive={isMenuActive}
          onClickBurgerBtn={onClickBurgerBtn}
        />
      </Header>
      <main className="main"></main>
      <Footer />
    </>
  );
}

export default Main;
