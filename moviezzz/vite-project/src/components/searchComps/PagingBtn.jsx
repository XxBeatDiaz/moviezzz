import { Box, Typography, Button } from "@mui/material";

export default function PagingBtn({
  page,
  onClickNext,
  onClickPrev,
  disabledNext,
  disabledPrev,
}) {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        onClick={onClickPrev}
        disabled={disabledPrev}
        sx={{
          bgcolor: "#8f3838b4",
          height: "40px",
          width: "18px",
          fontSize: "10px",
        }}
      >
        Previous ←
      </Button>

      <Typography sx={{ color: "#deccccbd" }} variant="body1">
        {page}
      </Typography>

      <Button
        variant="contained"
        onClick={onClickNext}
        disabled={disabledNext}
        sx={{
          bgcolor: "#8f3838b4",
          height: "40px",
          width: "18px",
          fontSize: "10px",
        }}
      >
        Next →
      </Button>
    </Box>
  );
}
