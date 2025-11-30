import { Box } from "@mui/material";

import { useSearchMovies } from "../hooks/useMovie.js";
import MovieCardsList from "../components/moviesComps/MovieCardsList.jsx";

export default function AllMoviesPage() {
  const {
    movies: moviesByIds,
    status: moviesStatus,
    error: moviesError,
  } = useSearchMovies();

  if (moviesStatus === "failed") {
    return <div>Error: {moviesError}</div>;
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
      <MovieCardsList movies={moviesByIds} />
    </Box>
  );
}
