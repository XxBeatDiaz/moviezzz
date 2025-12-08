import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { Box, Divider } from "@mui/material";

import { selectMovieById } from "../redux/slices/movies";
import MovieInfoCard from "../components/moviesComps/MovieInfoCard";
import MovieScreenBox from "../components/moviesComps/MovieScreenBox";
import { MOVIE_TRAILER } from "../globals";

export default function MoviePage() {
  const { id } = useParams();

  const movie = useSelector(selectMovieById(id));

  return (
    <Box
      sx={{
        bgcolor: "#131212ff",
        color: "#b1aeaeff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MovieScreenBox
        movieId={movie?.id}
        moviePath={MOVIE_TRAILER}
        posterPath={movie?.poster_path}
      />

      <Divider
        sx={{ my: 4, width: "80%", bgcolor: "rgba(129, 128, 128, 0.36)" }}
      />

      <MovieInfoCard
        posterPath={movie?.poster_path}
        title={movie?.title}
        synopsis={movie?.synopsis}
        year={movie?.year}
        director={movie?.director}
      />
    </Box>
  );
}
