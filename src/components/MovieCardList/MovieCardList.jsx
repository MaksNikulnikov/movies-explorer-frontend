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
  const [counterMore, setCounterMore] = useState(0);
  const [isAllMoviesDisplayed, setIsAllMoviesDisplayed] = useState(true);

  const handleMore = () => {
    const newCounter = counterMore + 1;
    setCounterMore(newCounter);
    checkIsAllMoviesDisplayed(newCounter);
  }

  const checkIsAllMoviesDisplayed = (newCounter) => {
    const amountOfMovies = getAmountOfMovies(newCounter);
    if (amountOfMovies === movies.length) {
      setIsAllMoviesDisplayed(true);
    } else {
      setIsAllMoviesDisplayed(false);
    }
  }

  const handleResizeWidth = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
    checkIsAllMoviesDisplayed();
  }, [setScreenWidth, checkIsAllMoviesDisplayed]);

  const getAmountOfMovies = (count = counterMore) => {
    let result = 0;
    if (screenWidth <= TABLET_WIDTH) {
      result = PHONE_AMOUNT_OF_VIDEOS + 1 * count;
    } else if (screenWidth < LAPTOP_WIDTH) {
      result = TABLET_AMOUNT_OF_VIDEOS + 2 * count;
    } else {
      result = LAPTOP_AMOUNT_OF_VIDEOS + 3 * count;
    }
    return result >= movies.length ? movies.length : result;
  }

  useEffect(() => {
    window.addEventListener('resize', handleResizeWidth);
  }, [handleResizeWidth]);

  useEffect(() => {
    checkIsAllMoviesDisplayed();
  }, [isAllMoviesDisplayed])

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
      {location.pathname === "/movies" &&
        !isAllMoviesDisplayed &&
        <button
          className="movie-card-list__button"
          onClick={handleMore}
        >Ещё</button>
      }
    </section>
  );
}

export default MovieCardList;
