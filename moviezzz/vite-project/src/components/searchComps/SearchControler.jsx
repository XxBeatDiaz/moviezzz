import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "./SearchBar";
import FiltersDrawer from "./FiltersDrawer";

import { selectLastSearch, setLastSearch } from "../../redux/slices/search";
import { fetchMoviesByFilters } from "../../redux/thunks/moviesThunks";

export default function SearchControler() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lastSearch = useSelector(selectLastSearch);

  function handleAllFilters(updatedFilters) {
    dispatch(setLastSearch(updatedFilters));
    dispatch(fetchMoviesByFilters(updatedFilters));
    navigate(`/movies`);
  }

  function handleSearchBar(query) {
    if (query.trim() === "") return;
    handleAllFilters({ ...lastSearch, name: query });
  }

  function handleFiltersDrawer(year, genre) {
    if (!year && !genre) return;
    handleAllFilters({ ...lastSearch, name: '', year: year, genre: genre });
  }

  function handleResetFilters() {
    const reset = { name: "", year: "", genre: "" };
    handleAllFilters(reset);
    return reset;
  }

  return (
    <>
      <FiltersDrawer
        onClickApply={handleFiltersDrawer}
        onClickReset={handleResetFilters}
        currentYear={2025}
      />
      <SearchBar
        id={"searchFetch"}
        placeholder={"Search any movies..."}
        onChange={handleSearchBar}
      />
    </>
  );
}
