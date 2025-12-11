import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography } from "@mui/material";

import SearchBar from "./SearchBar";
import FiltersDrawer from "./FiltersDrawer";

import { selectLastSearch, setLastSearch } from "../../redux/slices/search";
import { fetchMoviesByFilters } from "../../redux/thunks/moviesThunks";
import { selectLenOfNextPage } from "../../redux/slices/movies";

export default function SearchControler() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const lenOfNextPage = useSelector(selectLenOfNextPage);
  const lastSearch = useSelector(selectLastSearch);

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
      <Box display="flex" alignItems="center" gap={2} >
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={page === 1}
          sx={{
            bgcolor: "#8f3838b4",
            height: "40px",
            width: "18px",
            fontSize: "10px",
          }}
        >
          Previous ←
        </Button>

        <Typography sx={{ color: "#deccccbd" }} variant="body1">
          {page}
        </Typography>

        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={lenOfNextPage <= 0}
          sx={{
            bgcolor: "#8f3838b4",
            height: "40px",
            width: "18px",
            fontSize: "10px",
          }}
        >
          Next →
        </Button>
      </Box>
    </>
  );
}
