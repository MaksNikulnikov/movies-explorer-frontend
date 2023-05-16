import "./Techs.css";
import React from "react";

function Techs() {
  const signs = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "MongoDB"];
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__content-title">7 технологий</h3>
        <p className="techs__content-subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__sign-container">
          {signs.map((sign, i) => {
            return (
              <li className="techs__sign" key={i}>
                {sign}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Techs;
