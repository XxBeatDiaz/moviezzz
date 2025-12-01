import { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";

import { VideoPlayer } from "./VideoPlayer";

export default function MovieScreenBlock({ movieId, moviePath, posterPath }) {
  const [showCircular, setShowCircular] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCircular(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [movieId]);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1200px",
          mt: 3,
          backgroundColor: "#29272799",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 0 20px #2e1d1d99",
          marginBottom: "20px",
        }}
      >
        <br />
        {showCircular ? (
          <CircularProgress sx={{ color: "green", mb: 2 }} />
        ) : (
          <VideoPlayer src={moviePath} isPlaying={true} thumb={posterPath} />
        )}
      </Box>
    </Box>
  );
}
