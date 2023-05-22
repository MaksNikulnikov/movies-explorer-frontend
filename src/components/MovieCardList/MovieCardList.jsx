import { useLocation } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css";
import React from "react";

function MovieCardList({ movies }) {
  const location = useLocation();

  return (
    <section className="movie-card-list">
      <ul
        className={`movie-card-list__container ${
          location.pathname === "/saved-movies"
            ? "movie-card-list__container_type_saved-movies"
            : ""
        }`}
      >
        {movies.map((item) => {
          return (
            <li key={item._id}>
              <MovieCard
                title={item.title}
                duration={item.duration}
                thumbnail={item.thumbnail}
                isSaved={item.isSaved}
              />
            </li>
          );
        })}
      </ul>
      {location.pathname === "/movies" ? (
        <button className="movie-card-list__button">Ещё</button>
      ) : (
        <></>
      )}
    </section>
  );
}

export default MovieCardList;
