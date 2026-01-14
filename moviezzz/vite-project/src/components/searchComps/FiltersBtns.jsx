import { Box, Button } from "@mui/material";

export default function FiltersBtns({ applyMark, onApply, onReset }) {
  return (
    <Box>
      <Button variant="text" color="success" onClick={onApply}>
        Apply
      </Button>

      {applyMark && (
        <Button variant="text" color="error" onClick={onReset}>
          Reset
        </Button>
      )}
    </Box>
  );
}
