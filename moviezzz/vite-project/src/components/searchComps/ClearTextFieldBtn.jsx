import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function ClearTextFieldBtn({ isActive, onClick = () => {} }) {
  return (
    <IconButton
      onClick={isActive ? onClick : undefined}
      sx={{ cursor: isActive ? "pointer" : "default", alignSelf: "center" }}
    >
      <CloseIcon
        sx={{
          cursor: isActive ? "pointer" : "default",
          color: isActive ? "#842e2ecb" : "#504d4de4",
        }}
      />
    </IconButton>
  );
}
