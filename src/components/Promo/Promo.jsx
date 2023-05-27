import "./Promo.css";
import React from "react";
import { HashLink } from 'react-router-hash-link';

function Promo() {
  const links = [{
    title: "О проекте",
    link: "/#about-project"
  }, {
    title: "Технологии",
    link: "/#techs"
  }, {
    title: "Студент",
    link: "/#about-me"
  }];

  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <nav className="promo__link-container">
        <ul className="promo__list">
          {links.map((item, i) => {
            return (
              <li key={i}>
                <HashLink to={item.link} smooth className="promo__link">
                  {item.title}
                </HashLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}

export default Promo;
