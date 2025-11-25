import { Grid, Typography } from "@mui/material";

import MovieCard from "./MovieCard.jsx";

export default function ListMovieCards({ movies }) {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="stretch"
      sx={{ backgroundColor: "#232324ff", py: 4, borderRadius: 4 }}
    >
      {movies.length !== 0 ? (
        movies.map((movie) => (
          <Grid key={movie.id}>
            <MovieCard
              movieId={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
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
