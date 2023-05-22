import { falseMovies } from "./constants";

class MovieApi {
  getMovies = () => {
    return falseMovies; 
  };
}

const movieApi = new MovieApi();

export default movieApi;
