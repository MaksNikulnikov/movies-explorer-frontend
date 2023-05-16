import "./Footer.css";
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__copyright" lang="en">{`© ${
          new Date().getFullYear() === 2023
            ? 2023
            : `2023 - ${new Date().getFullYear()}`
        }`}</p>
        <div className="footer__link-container">
          <a
            rel="stylesheet"
            href="https://practicum.yandex.ru/"
            className="footer__link"
          >
            Яндекс.Практикум
          </a>
          <a
            rel="stylesheet"
            href="https://github.com/MaksNikulnikov/movies-explorer-frontend"
            className="footer__link"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
