import "./Promo.css";
import React from "react";
import { Link } from "react-router-dom";

function Promo() {
  const links = ["О проекте", "Технологии", "Студент"];
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
                <Link to="signup" className="promo__link">
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}

export default Promo;
