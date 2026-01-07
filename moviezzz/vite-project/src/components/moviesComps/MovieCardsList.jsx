import { useSelector } from "react-redux";

import { Grid, Typography, CircularProgress } from "@mui/material";

import MovieCard from "./MovieCard.jsx";
import { selectMoviesStatus } from "../../redux/slices/movies.js";
import { STATUS_OPTIONS } from "../../globals.js";

export default function MovieCardsList({ movies }) {
  const moviesStatus = useSelector(selectMoviesStatus);

  const isLoading = moviesStatus === STATUS_OPTIONS.LOADING;
  const isError = moviesStatus === STATUS_OPTIONS.FAILED;
  const isMovies =
    moviesStatus === STATUS_OPTIONS.SUCCEEDED &&
    movies.length > 0 &&
    movies !== null &&
    movies !== undefined;

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
      sx={{ backgroundColor: "#232324ff", py: 4, borderRadius: 4 }}
    >
      {isLoading ? (
        <CircularProgress sx={{ color: "green" }} />
      ) : isError ? (
        <Typography color="red">Failed to load movies</Typography>
      ) : isMovies ? (
        movies.map((movie) => (
          <Grid key={movie.id}>
            <MovieCard
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              year={movie.year}
            />
          </Grid>
        ))
      ) : (
        <Typography color="green">No results</Typography>
      )}
    </Grid>
  );
}
