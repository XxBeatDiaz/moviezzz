import { Badge } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CircleIcon from "@mui/icons-material/Circle";

export default function FiltersTrigger({ applyMark, onOpen = () => {} }) {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      badgeContent={
        applyMark && <CircleIcon sx={{ fontSize: 7, color: "#773535f0" }} />
      }
    >
      <FilterListIcon
        onClick={onOpen}
        sx={{
          cursor: "pointer",
          color: "#797575ff",
          transition: "color 0.17s",
          "&:hover": { color: "#e03838cc" },
        }}
      />
    </Badge>
  );
}
