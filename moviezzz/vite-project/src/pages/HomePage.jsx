import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { selectTheNewestMovies } from "../redux/slices/movies";
import MovieCardCarousel from "../components/moviesComps/MovieCardCarousel.jsx";

export default function HomePage() {
  const newestMovies = useSelector(selectTheNewestMovies);

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
        movies={newestMovies}
        link={{ url: "/movies", text: "See more" }}
      />
    </Box>
  );
}
