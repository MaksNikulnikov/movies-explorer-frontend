import "./AboutProject.css";
import React from "react";

function AboutProject() {
  const textItems = [
    {
      title: "Дипломный проект включал 5 этапов",
      text: "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.",
    },
    {
      title: "На выполнение диплома ушло 5 недель",
      text: "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.",
    },
  ];
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <ul className="about-project__text-container">
          {textItems.map((item, i) => {
            return (
              <li className="about-project__text-item" key={i}>
                <h3 className="about-project__text-item_title">{item.title}</h3>
                <p className="about-project__text-item_text">{item.text}</p>
              </li>
            );
          })}
        </ul>
        <div className="about-project__table">
          <span className="about-project__table_data">1 неделя</span>
          <span className="about-project__table_data">4 недели</span>
          <span className="about-project__table_data">Back-end</span>
          <span className="about-project__table_data">Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
