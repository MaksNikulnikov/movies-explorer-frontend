import "./AboutMe.css";
import React from "react";
import photo from "../../images/photo.jpg"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h3 className="about-me__name">Максим</h3>
          <p className="about-me__subtitle">Фронтэнд-разработчик. 39 лет</p>
          <p className="about-me__text">
            Изучаю программирование около 10 лет. Я начал с изучения языка С.
            Затем я прошел обучение по Java и созданию приложения для Android.
            Потом я увлекся Unity3D и графическими редакторами GIMP и Moho
            Studio Pro 11. В 2022 году я начал изучать веб-разработку на 10
            ежемесячных курсах Яндекс Практикума. Это направление меня очень
            увлекает. Сейчас пишу дипломный проект и ищу возможность
            развиваться в этом направлении.
          </p>
          <a
            href="https://github.com/MaksNikulnikov"
            className="about-me__link"
            target="_blank" 
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={photo} alt="Owner" className="about-me__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
