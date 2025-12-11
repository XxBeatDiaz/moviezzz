import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { selectMoviesStatus, selectTheNewestMovies } from "../redux/slices/movies";
import MovieCardCarousel from "../components/moviesComps/MovieCardCarousel.jsx";
import { HOME_PAGE_MOVIES_AMOUNT } from "../globals";

export default function HomePage() {
  const moviesStatus = useSelector(selectMoviesStatus);
  const movies = useSelector(selectTheNewestMovies(HOME_PAGE_MOVIES_AMOUNT));


  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: "50px",
        backgroundColor: "#313b3fff",
      }}
    >
      <MovieCardCarousel
        title={"The newest movies"}
        movies={moviesStatus && movies}
        link={{ url: "/movies", text: "See more" }}
      />
    </Box>
  );
}
