import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Typography, Divider } from "@mui/material";

import {
  selectMoviesIdsFromUser,
  selectUserStatus,
} from "../redux/slices/user.js";
import { selectManyByIds } from "../redux/slices/movies";

import ListMovieCards from "../components/moviesComps/ListMovieCards.jsx";
import LoginDialog from "../components/userComps/LoginDialog.jsx";
import SearchBar from "../components/searchComps/SearchBar.jsx";

import { filterItems } from "../api/utils.js";

export default function MyFavorites() {
  const userStatus = useSelector(selectUserStatus);
  const moviesIds = useSelector(selectMoviesIdsFromUser);

  const selectMoviesByIds = useMemo(
    () => selectManyByIds(moviesIds),
    [moviesIds]
  );
  const moviesByIds = useSelector(selectMoviesByIds);

  const [filteredMovies, setFilteredMovies] = useState(moviesByIds);

  useEffect(() => {
    setFilteredMovies(moviesByIds);
  }, [moviesByIds]);

  function handleSearch(query) {
    const newFilteredMovies = filterItems(moviesByIds, query);
    setFilteredMovies(newFilteredMovies);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: "50px",
        backgroundColor: "#313b3fff",
      }}
    >
      <Divider
        textAlign="middle"
        sx={{
          margin: "20px 0",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          color: "#5ad6208e",
          letterSpacing: "2px",
        }}
      >
        Your - movies
      </Divider>

      <Box mb={3} justifyItems={"center"}>
        <SearchBar
          id={"search-init"}
          placeholder={"Search any favorite movie..."}
          onChange={handleSearch}
          liveSearch={true}
        />
      </Box>

      <ListMovieCards movies={filteredMovies} />

      <Box>
        {userStatus === "succeeded" || (
          <>
            <Typography>To see your favorites, please login : </Typography>
            <LoginDialog />
          </>
        )}
      </Box>
    </Box>
  );
}
