import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

export default function SearchBtn({ isActive, onClick = () => {} }) {
  return (
    <IconButton
      disabled={!isActive}
      onClick={onClick}
      sx={{ cursor: isActive ? "pointer" : "default", alignSelf: "center" }}
    >
      <SearchIcon
        sx={{
          alignSelf: "center",
          cursor: isActive ? "pointer" : "default",
          color: isActive ? "#e32828a9" : "#504d4de4",
        }}
      />
    </IconButton>
  );
}
