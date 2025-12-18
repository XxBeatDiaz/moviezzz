import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { selectMoviesForCurrentPage } from "../redux/slices/movies.js";
import { useSearchMovies } from "../hooks/useMovie.js";
import MovieCardsList from "../components/moviesComps/MovieCardsList.jsx";

export default function AllMoviesPage() {
  const { movies: moviesByIds } = useSearchMovies();

  const pageOfMovies = useSelector(selectMoviesForCurrentPage);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: "50px",
        backgroundColor: "#313b3fff",
      }}
    >
      <MovieCardsList
        movies={pageOfMovies.length === 0 ? pageOfMovies : moviesByIds}
      />
    </Box>
  );
}
