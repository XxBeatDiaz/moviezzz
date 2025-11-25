import { useParams } from "react-router";
import {  useSelector } from "react-redux";

import { Box, Typography, Divider } from "@mui/material";

import { moviesSelectors } from "../redux/slices/movies";
import { VideoPlayer } from "../components/moviesComps/VideoPlayer";


export default function MoviePage() {
  const { id } = useParams();

  const movie = useSelector((state) => moviesSelectors.selectById(state, id));

  if (!movie) {
    return (
      <Typography sx={{ color: "white", textAlign: "center", mt: 5 }}>
        Loading...
      </Typography>
    );
  }

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
        <VideoPlayer
          src="/matrixTrailer.mp4"
          isPlaying={true}
          thumb={movie?.poster_path}
        />

        <Divider
          sx={{ my: 4, width: "80%", bgcolor: "rgba(129, 128, 128, 0.36)" }}
        />

        <Box
          sx={{
            display: "flex",
            bgcolor: "#313131ff",
            borderRadius: 3,
            p: 2,
            gap: 4,
            marginBottom: "20px",
            width: "90%",
            maxWidth: "1100px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src={movie.poster_path}
            alt="/matrix"
            style={{
              borderRadius: "20px",
              maxHeight: "350px",
              maxWidth: "300px",
            }}
          />
          <Box>
            <h1 style={{ margin: "20px 0", paddingBottom: "20px", borderBottom: "1px solid gray" }}>
              {movie.title}
            </h1>
            <Typography sx={{}}>{movie.synopsis}</Typography>
          </Box>
            
        </Box>
      </Box>
    </Box>
  );
}
