import movies from "../DB/movies.json" with { type: "json" };
import { filterItemsByChars } from "../DB/utils.js";
import { getMoviesSlice } from "./utils.js";


export function getAllMovies() {
  return movies;
}

export function getTheNewestMovies(amount) {
  return [...movies]
    .sort((a, b) => b.year - a.year)
    .slice(0, amount);
}

export function getMoviesPage(offset, limit) {
  return getMoviesSlice(offset, limit, movies);
}

export function getMoviesByFilters(offset, limit, filters) {
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

  return getMoviesSlice(offset, limit, filteredMovies);
}

export function getMovieById(movieId) {
  return movies.find((m) => m.id.toString() === movieId.toString()) || null;
}

export function getMoviesByIds(moviesIds) {
  const moviesByIds = movies.filter((m) => moviesIds.includes(m.id.toString()));
  return moviesByIds;
}