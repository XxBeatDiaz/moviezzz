import { Box, Typography } from "@mui/material";

export default function MovieInfoCard({posterPath, title, synopsis, year, director}) {
  return (
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
            src={posterPath}
            alt={title}
            style={{
              borderRadius: "20px",
              maxHeight: "350px",
              maxWidth: "300px",
            }}
          />

          <Box>
            <h1
              style={{
                margin: "20px 0",
                paddingBottom: "20px",
                borderBottom: "1px solid gray",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {title}
            </h1>
            <Typography>{synopsis}</Typography>
            <br />
            {year}
            <br />
            <br />
            {director}
          </Box>
        </Box>
  )
}
