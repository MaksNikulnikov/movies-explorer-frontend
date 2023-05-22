import "./MovieCard.css";
import React from "react";

function MovieCard({ title, duration, thumbnail, isSaved }) {
  return (
    <article className="movie-card">
      <h2 className="movie-card__title">{title}</h2>
      <span className="movie-card__duration">{duration}</span>
      <img className="movie-card__thumbnail" src={thumbnail} alt="thumbnail" />
      <button
        className={`movie-card__button ${
          isSaved ? "movie-card__button_saved" : ""
        }`}
      >Сохранить</button>
    </article>
  );
}

export default MovieCard;
