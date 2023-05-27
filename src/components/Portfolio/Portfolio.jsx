import "./Portfolio.css";
import React from "react";

function Portfolio() {
  const projects = [
    {
      title: "Статичный сайт",
      link: "https://maksnikulnikov.github.io/how-to-learn/",
    },
    {
      title: "Адаптивный сайт",
      link: "https://maksnikulnikov.github.io/russian-travel/",
    },
    {
      title: "Одностраничное приложение",
      link: "https://vmesto.nomoredomains.monster/",
    },
  ];
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        {projects.map((item, i) => {
          return (
            <li className="portfolio__list-item" key={i}>
              <div className="portfolio__list-item_container">
                <span className="portfolio__list-item_title">{item.title}</span>
                <a href={item.link} 
                target="_blank" 
                className="portfolio__list-item_link"
                rel="noreferrer">
                  ↗
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Portfolio;
