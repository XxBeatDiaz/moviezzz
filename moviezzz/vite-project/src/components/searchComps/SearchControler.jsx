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

  const handleAllFilters = (updatedFilters) => {
    dispatch(setLastSearch(updatedFilters));
    dispatch(fetchMoviesByFilters(updatedFilters));
    navigate(`/movies`);
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
    </>
  );
}
