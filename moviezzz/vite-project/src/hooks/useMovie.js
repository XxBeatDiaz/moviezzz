import { useSelector } from "react-redux";

import { selectMoviesError, selectMoviesStatus, selectPage } from "../redux/slices/movies.js";

export function useSearchMovies() {
  const selectedPage = useSelector(selectPage);
  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);
  
  const movies =  selectedPage;

  return { movies, moviesStatus, moviesError };
}
