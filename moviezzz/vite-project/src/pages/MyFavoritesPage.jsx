import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Typography, Divider } from "@mui/material";

import { selectUserStatus } from "../redux/slices/user.js";
import { selectFavoritesMovies } from "../redux/slices/movies.js";

import MovieCardsList from "../components/moviesComps/MovieCardsList.jsx";
import LoginDialog from "../components/userComps/LoginDialog.jsx";
import SearchBar from "../components/searchComps/SearchBar.jsx";

import { filterItemsByStartsWith } from "../utils/searchUtils.js";
import { STATUS_OPTIONS } from "../globals.js";

export default function MyFavorites() {
  const userStatus = useSelector(selectUserStatus);
  const favoritesMovies = useSelector(selectFavoritesMovies);

  const [filteredMovies, setFilteredMovies] = useState(favoritesMovies);

  useEffect(() => {
    setFilteredMovies(favoritesMovies);
  }, [favoritesMovies]);

  const handleSearch = (query) => {
    const filteredMovies = filterItemsByStartsWith(favoritesMovies, query);

    setFilteredMovies(filteredMovies);
  };

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

      <MovieCardsList movies={filteredMovies} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        {userStatus === STATUS_OPTIONS.SUCCEEDED || (
          <>
            <Typography sx={{ color: "white", mr: 2 }}>
              To see your favorites, please login:{" "}
            </Typography>

            <LoginDialog />
          </>
        )}
      </Box>
    </Box>
  );
}
