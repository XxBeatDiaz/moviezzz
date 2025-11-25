import movies from "../DB/movies.json" with { type: "json" };
import { filterItemsByChars } from "../DB/utils.js";


export function getAllMovies() {
  return movies;
}

export function getMoviesByFilters(filters) {
  const { name = '', year = '', genre = '' } = filters;
  
  const genreId = genre;
  let filteredMovies = movies;

  if (name) {
    filteredMovies = filterItemsByChars(filteredMovies, name);
  }

  if (year) {
    filteredMovies = filteredMovies.filter(movie =>
      String(movie.year) === String(year)
    );
  }

  if (genreId) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.genre_ids.includes(Number(genreId))
    );
  }
  
  return filteredMovies;
}

export function getMovieById(movieId) {
  return movies.find((m) => m.id.toString() === movieId.toString()) || null;
}

export function getMoviesByIds(moviesIds) {
  const moviesByIds = movies.filter((m) => moviesIds.includes(m.id.toString()));
  return moviesByIds;
}