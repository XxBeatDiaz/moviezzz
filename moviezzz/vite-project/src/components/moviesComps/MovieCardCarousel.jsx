import { Link } from "react-router";
import { useSelector } from "react-redux";

import { Box, CircularProgress, Typography } from "@mui/material";

import MovieCard from "./MovieCard";
import { selectMoviesStatus } from "../../redux/slices/movies";
import { STATUS_OPTIONS } from "../../globals";

export default function MovieCardCarousel({ title, movies, link }) {
  const moviesStatus = useSelector(selectMoviesStatus);

  const isLoading = moviesStatus === STATUS_OPTIONS.LOADING;
  const isError = moviesStatus === STATUS_OPTIONS.FAILED;
  const isMovies =
    moviesStatus === STATUS_OPTIONS.SUCCEEDED &&
    movies !== null &&
    movies !== undefined &&
    movies.length > 0;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
          {title}
        </Typography>
        <Link
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            color: "#58a958ff",
          }}
          to={link.url}
        >
          {link.text}
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          p: 2,
          bgcolor: "#232324",
          borderRadius: 1,
          "&::-webkit-scrollbar": {
            height: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#56453cdb",
            borderRadius: "10px",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ color: "green" }} />
        ) : isError ? (
          <Typography color="red">Failed to load movies</Typography>
        ) : isMovies ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              year={movie.year}
            />
          ))
        ) : (
          <Typography color="green">No results</Typography>
        )}
      </Box>
    </>
  );
}
