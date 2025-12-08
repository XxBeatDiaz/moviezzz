import { useState, useEffect } from "react";
import { Link } from "react-router";

import { Box, CircularProgress, Typography } from "@mui/material";

import MovieCard from "./MovieCard";

export default function MovieCardCarousel({ title, movies, link }) {
  const [showCircular, setShowCircular] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowCircular(false), 2000);
    
    return () => clearTimeout(timer);
  }, [movies.length]);

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
        {movies.length !== 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              year={movie.year}
            />
          ))
        ) : showCircular ? (
          <CircularProgress sx={{ color: "green" }} />
        ) : (
          <Typography color="green">No results</Typography>
        )}
      </Box>
    </>
  );
}
