import "./Main.css";
import React from "react";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";

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
      <main className="main">
        <Promo />
        <AboutProject />
      </main>
      <Footer />
    </>
  );
}

export default Main;
