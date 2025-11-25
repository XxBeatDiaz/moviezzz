import { useSelector } from "react-redux";


import { selectSearchIds } from "../redux/slices/search.js";
import { moviesSelectors, selectManyByIds, selectMoviesError, selectMoviesStatus } from "../redux/slices/movies.js";

export function useSearchMovies() {
  const searchIds = useSelector(selectSearchIds);
  const allMovies = useSelector((state) => moviesSelectors.selectAll(state));
  const filteredMovies = useSelector(selectManyByIds(searchIds));

  const movies = searchIds && searchIds.length > 0 ? filteredMovies : allMovies;

  const moviesStatus = useSelector(selectMoviesStatus);
  const moviesError = useSelector(selectMoviesError);

  return { movies, moviesStatus, moviesError };
}
