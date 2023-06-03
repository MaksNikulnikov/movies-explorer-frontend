import { MOVIES_API_URL, falseMovies } from "./constants";

class MovieApi {
  constructor({apiURL}){
    this._apiURL = apiURL;
  }

  async _requestResult(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(res);
  }

  getMovies = () => {
    return fetch(`${this._apiURL}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => this._requestResult(res));
  };

  getSavedMovies = () => {
    return falseMovies;
  };
}

const movieApi = new MovieApi({apiURL:MOVIES_API_URL});

export default movieApi;
