import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CustomSnackbar({ type = "success", message, onClose }) {
  return (
    <Snackbar open={!!message} autoHideDuration={4000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
