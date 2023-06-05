import { SHORTMOVIES_DURATION } from "./constants";

function formatDate(minutes) {
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    const hh = hours.toString();
    const mm = minutes.toString().padStart(2, '0');
    return `${hh} час ${mm} мин`;
}

function preProcessMovies(movies) {
    movies.forEach(movie => {
        if (!movie.image) {
            movie.image = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
            movie.thumbnail = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80';
        } else {
            movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
            movie.image = `https://api.nomoreparties.co${movie.image.url}`
        }
        if (!movie.country) {
            movie.country = 'Russia';
        }
        if (!movie.nameEN) {
            movie.nameEN = movie.nameRU;
        }
    });

    return movies
}

function filterMoviesByDuration(movies) {
    return movies.filter(movie => movie.duration < SHORTMOVIES_DURATION);
  }
  
 
function filterMoviesByQuery(movies, userQuery, shortMoviesCheckbox) {

    const moviesByUserQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userMovie = userQuery.toLowerCase().trim();
      return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    });
  
    if (shortMoviesCheckbox) {
      return filterMoviesByDuration(moviesByUserQuery);
    } else {
      return moviesByUserQuery;
    }
  }

export {
    formatDate,
    preProcessMovies,
    filterMoviesByQuery,
    filterMoviesByDuration,
}