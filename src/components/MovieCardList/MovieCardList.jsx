import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import MovieCard from "../MovieCard/MovieCard";
import "./MovieCardList.css";
import React from "react";
import { LAPTOP_AMOUNT_OF_VIDEOS, PHONE_AMOUNT_OF_VIDEOS, TABLET_AMOUNT_OF_VIDEOS, LAPTOP_WIDTH, TABLET_WIDTH } from "../../utils/config";

function MovieCardList({ handleSave, movies, savedMovies, handleDelete }) {
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

  const checkIfSaved = (movie) => {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResizeWidth);
  }, [handleResizeWidth]);

  useEffect(() => {
    checkIsAllMoviesDisplayed();
  }, [isAllMoviesDisplayed]);

  return (
    <section className="movie-card-list">
      <ul
        className={`movie-card-list__container ${location.pathname === "/saved-movies"
          ? "movie-card-list__container_type_saved-movies"
          : ""
          }`}
      >
        {location.pathname === "/movies" && movies
          .slice(0, getAmountOfMovies())
          .map((item, i) => {
            const savedMovie = checkIfSaved(item);
            return savedMovie ? (
              <li key={i}>
                <MovieCard
                  isSaved={true}
                  handleButton={handleDelete}
                  data={savedMovie}
                />
              </li>
            ) : (
              <li key={i}>
                <MovieCard
                  isSaved={false}
                  handleButton={handleSave}
                  data={item}
                />
              </li>
            );
          })}
        {location.pathname === "/saved-movies" && movies
          .map((item, i) => {
            return (
              <li key={i}>
                <MovieCard
                  isSaved={checkIfSaved(item)}
                  handleButton={handleDelete}
                  data={item}
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
