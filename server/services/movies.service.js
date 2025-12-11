import movies from "../DB/movies.json" with { type: "json" };
import { filterItemsByChars } from "../DB/utils.js";


export function getAllMovies() {
  return movies;
}

export function getLenOfMovies() {
  return movies.length;
}

export function getMoviesSlice(page = 1, moviesPage) {
  const PAGE_LIMIT = 10;

  const start = (page - 1) * PAGE_LIMIT;
  const end = start + PAGE_LIMIT;

  const lenOfNextPage = moviesPage.length > end ? moviesPage.length - end : 0;

  return { movies: moviesPage.slice(start, end), lenOfNextPage: lenOfNextPage };
}

export function getMoviesPage(page) {
  const PAGE_LIMIT = 10;

  const start = (page - 1) * PAGE_LIMIT;
  const end = start + PAGE_LIMIT;


  const lenOfNextPage = movies.length > end ? movies.length - end : 0;

  return { movies: movies.slice(start, end), lenOfNextPage: lenOfNextPage };
}

export function getMoviesByFilters(filters, page) {
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

  const pageMovies = getMoviesSlice(page, filteredMovies);

  return pageMovies;
}

export function getMovieById(movieId) {
  return movies.find((m) => m.id.toString() === movieId.toString()) || null;
}

export function getMoviesByIds(moviesIds) {
  const moviesByIds = movies.filter((m) => moviesIds.includes(m.id.toString()));
  return moviesByIds;
}