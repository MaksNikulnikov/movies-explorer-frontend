import { useLocation } from "react-router-dom";
import "./MovieCard.css";
import React from "react";
import { formatDate } from "../../utils/utils";

function MovieCard({ handleButton, data, isSaved }) {
  const location = useLocation();

  const handleOnClick = ()=>{
    handleButton(data);
  }

  return (
    <article className="movie-card">
      <h2 className="movie-card__title">{data.nameEN}</h2>
      <span className="movie-card__duration">{`Длительность: ${formatDate(data.duration)}`}</span>
      <img className="movie-card__thumbnail" src={data.thumbnail} alt="thumbnail" />
      <button
        onClick={handleOnClick}
        className={`movie-card__button ${isSaved && location.pathname === "/movies"
          ? "movie-card__button_saved"
          : ""
          } ${location.pathname === "/saved-movies"
            ? "movie-card__button_unsave"
            : ""
          }`}
      >
        Сохранить
      </button>
    </article>
  );
}

export default MovieCard;
