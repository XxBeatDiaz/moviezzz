import { useEffect, useState } from "react";

import { Grid, Typography, CircularProgress } from "@mui/material";

import MovieCard from "./MovieCard.jsx";

export default function MovieCardsList({ movies }) {
  const [showCircular, setShowCircular] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => setShowCircular(false), 2000);
      return () => clearTimeout(timer);
  }, [movies]);

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
              posterPath={movie.poster_path}
              year={movie.year}
            />
          </Grid>
        ))
      ) : showCircular ? (
        <CircularProgress sx={{ color: "green" }} />
      ) : (
        <Typography color="green">No results</Typography>
      )}
    </Grid>
  );
}
