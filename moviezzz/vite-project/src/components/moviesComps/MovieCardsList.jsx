import { useSelector } from "react-redux";

import { Grid, Typography, CircularProgress } from "@mui/material";

import MovieCard from "./MovieCard.jsx";
import { selectMoviesStatus } from "../../redux/slices/movies.js";
import { STATUS_OPTIONS } from "../../globals.js";

export default function MovieCardsList({ movies }) {
  const moviesStatus = useSelector(selectMoviesStatus);

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
      sx={{ backgroundColor: "#232324ff", py: 4, borderRadius: 4 }}
    >
      {moviesStatus === STATUS_OPTIONS.LOADING ? (
        <CircularProgress sx={{ color: "green" }} />
      ) : moviesStatus === STATUS_OPTIONS.FAILED || movies.length === 0 ? (
        <Typography color="green">No results</Typography>
      ) : (
        moviesStatus === STATUS_OPTIONS.SUCCEEDED &&
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
      )}
    </Grid>
  );
}
