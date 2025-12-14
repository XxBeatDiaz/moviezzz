import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import FiltersDrawer from "./FiltersDrawer";
import PagingBtn from "./PagingBtn";

import { selectLastSearch, setLastSearch } from "../../redux/slices/search";
import { fetchMoviesByFilters } from "../../redux/thunks/moviesThunks";
import { selectLenOfNextPage } from "../../redux/slices/movies";

export default function SearchControler() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const lenOfNextPage = useSelector(selectLenOfNextPage);
  const lastSearch = useSelector(selectLastSearch);

  const isMoviesPage = location.pathname === "/movies";

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (lenOfNextPage > 0) {
      setPage(nextPage);
      runSearch(lastSearch, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      runSearch(lastSearch, prevPage);
    }
  };

  const runSearch = (filters, pageNum = 1) => {
    dispatch(fetchMoviesByFilters({ ...filters, pageNum }));
    navigate(`/movies`);
  };

  const handleAllFilters = (updatedFilters) => {
    dispatch(setLastSearch(updatedFilters));
    setPage(1);
    runSearch(updatedFilters, 1);
  };

  const handleSearchBar = (query) => {
    query.trim() !== "" && handleAllFilters({ ...lastSearch, name: query });
  };

  const handleFiltersDrawer = (year, genre) => {
    if (year || genre) {
      handleAllFilters({
        ...lastSearch,
        name: "",
        year: year,
        genre: genre,
      });
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
          lenOfNextPage={lenOfNextPage}
          onClickNext={handleNextPage}
          onClickPrev={handlePrevPage}
        />
      )}
    </>
  );
}
