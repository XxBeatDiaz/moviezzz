import { useSelector } from "react-redux";

import { selectMoviesError, selectMoviesStatus, selectMoviesForCurrentPage } from "../redux/slices/movies.js";

export function useSearchMovies() {
  const movies = useSelector(selectMoviesForCurrentPage);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);

  return { movies, moviesStatus, moviesError };
}
