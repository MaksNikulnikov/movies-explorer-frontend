import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css";
import React from "react";
import { LAPTOP_WIDTH, TABLET_WIDTH } from "../../utils/constants";
import { LAPTOP_AMOUNT_OF_VIDEOS, PHONE_AMOUNT_OF_VIDEOS, TABLET_AMOUNT_OF_VIDEOS } from "../../utils/config";
import { formatDate } from "../../utils/utils";

function MovieCardList({ movies }) {
  const location = useLocation();

  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth
  );

  const handleResizeWidth = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, [setScreenWidth]);

  const getAmountOfMovies = () => {
    if (screenWidth <= TABLET_WIDTH) {
      return PHONE_AMOUNT_OF_VIDEOS
    } else if (screenWidth < LAPTOP_WIDTH) {
      return TABLET_AMOUNT_OF_VIDEOS
    } else {
      return LAPTOP_AMOUNT_OF_VIDEOS
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResizeWidth);
  }, [handleResizeWidth]);

  return (
    <section className="movie-card-list">
      <ul
        className={`movie-card-list__container ${location.pathname === "/saved-movies"
          ? "movie-card-list__container_type_saved-movies"
          : ""
          }`}
      >
        {movies
          .slice(0, getAmountOfMovies())
          .map((item) => {
            return (
              <li key={item.id}>
                <MovieCard
                  title={item.nameEN}
                  duration={`Длительность: ${formatDate(item.duration)}`}
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
