import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import FiltersDrawer from "./FiltersDrawer";
import PagingBtn from "./PagingBtn";

import { selectLastSearch, setLastSearch } from "../../redux/slices/search";
import {
  selectMoviesPaging,
  resetMovies,
  nextPage,
  prevPage,
} from "../../redux/slices/movies";
import { fetchMoviesByFilters } from "../../redux/thunks/moviesThunks";

export default function SearchController() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lastSearch = useSelector(selectLastSearch);
  const { page, totalPage, hasMore } = useSelector(selectMoviesPaging);

  const isMoviesPage = location.pathname === "/movies";

  const runSearch = (filters) => {
    dispatch(fetchMoviesByFilters({ ...filters }));
    navigate(`/movies`);
  };

  const handleNextPage = () => {
    dispatch(nextPage());
    if (hasMore) {
      runSearch(lastSearch);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(prevPage());
    }
  };

  const handleAllFilters = (updatedFilters) => {
    dispatch(setLastSearch(updatedFilters));
    dispatch(resetMovies());
    runSearch(updatedFilters);
  };

  const handleSearchBar = (query) => {
    if (query.trim() !== "") handleAllFilters({ ...lastSearch, name: query });
  };

  const handleFiltersDrawer = (year, genre) => {
    if (year || genre) {
      handleAllFilters({ ...lastSearch, name: "", year, genre });
    }
  };

  const handleResetFilters = () => {
    const initialFilters = { name: "", year: "", genre: "" };

    handleAllFilters(initialFilters);

    return initialFilters;
  };

  return (
    <>
      <FiltersDrawer
        onClickApply={handleFiltersDrawer}
        onClickReset={handleResetFilters}
      />

      <SearchBar
        id={"searchFetch"}
        placeholder={"Search any movies..."}
        onChange={handleSearchBar}
      />

      {isMoviesPage && (
        <PagingBtn
          page={page}
          totalPage={totalPage}
          onClickNext={handleNextPage}
          onClickPrev={handlePrevPage}
          disabledNext={!hasMore && page >= totalPage}
          disabledPrev={page === 1}
        />
      )}
    </>
  );
}
