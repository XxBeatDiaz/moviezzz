export function VideoPlayer({ src, isPlaying, thumb }) {
  return isPlaying ? (
    <video src={src} poster={thumb} playsInline autoPlay muted controls 
    style={{
        width: "97%",        
        height: "97%",      
        borderRadius: "12px", 
        objectFit: "cover",  
      }}/>
  ) : (
    <div>Loading video...</div>
  );
}
