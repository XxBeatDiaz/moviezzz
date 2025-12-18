import { useState } from "react";
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
import { AMOUNT_MOVIES_IN_PAGE } from "../../globals";

export default function SearchControler() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lastSearch = useSelector(selectLastSearch);
  const moviesPaging = useSelector(selectMoviesPaging);

  const [page, setPage] = useState(1);

  const isMoviesPage = location.pathname === "/movies";

  const runSearch = (filters, offset = 0) => {
    dispatch(
      fetchMoviesByFilters({ ...filters, offset, limit: AMOUNT_MOVIES_IN_PAGE })
    );
    navigate(`/movies`);
  };

  const handleNextPage = () => {
    const theNextPage = page + 1;

    if (moviesPaging.hasMore) {
      runSearch(lastSearch, moviesPaging.moviesInStore);
    }
    setPage(theNextPage);
    dispatch(nextPage());
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      dispatch(prevPage());
    }
  };

  const handleAllFilters = (updatedFilters) => {
    dispatch(setLastSearch(updatedFilters));
    dispatch(resetMovies());
    setPage(1);
    runSearch(updatedFilters, 0);
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
          onClickNext={handleNextPage}
          onClickPrev={handlePrevPage}
          disabledNext={!moviesPaging.hasMore && page >= moviesPaging.totalPage}
          disabledPrev={page === 1}
        />
      )}
    </>
  );
}
