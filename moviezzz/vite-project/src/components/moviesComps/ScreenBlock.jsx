import { VideoPlayer } from "./VideoPlayer";

export default function ScreenBlock({ movie }) {
  return (
    <Box>
      <VideoPlayer
        src={"/matrixTrailer.mp4"}
        isPlaying={!!movie?.title}
        thumb={movie.poster_path}
      />
    </Box>
  );
}
