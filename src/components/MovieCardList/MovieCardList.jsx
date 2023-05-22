import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css";
import React from "react";

function MovieCardList({ movies }) {
  return (
    <section className="movie-card-list">
      <ul className="movie-card-list__container">
        {movies.map((item, i) => {
          return (
            <li>
              <MovieCard
                key={i}
                title={item.title}
                duration={item.duration}
                thumbnail={item.thumbnail}
                isSaved={item.isSaved}
              />
            </li>
          );
        })}
      </ul>
      <button className="movie-card-list__button">Ещё</button>
    </section>
  );
}

export default MovieCardList;
