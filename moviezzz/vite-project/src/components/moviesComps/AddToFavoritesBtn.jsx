import { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";

export default function AddToFavoritesBtn({
  onAddClick,
  onRemoveClick,
  initialFilled,
}) {
  const [filled, setFilled] = useState(initialFilled);

  const handleAdd = (event) => {
    setFilled(true);
    onAddClick(event);
  };

  const handleRemove = (event) => {
    setFilled(false);
    onRemoveClick(event);
  };

  return (
    <>
      {filled ? (
        <IconButton
          onClick={handleRemove}
          sx={{
            color: filled ? "#f1e9e9ff" : "#c1b9b9f0",
            transform: filled ? "scale(1.01)" : "scale(1)",
            transition: "transform 1.4s ease, color 0.8s ease",
          }}
        >
          <FavoriteIcon
            sx={{
              fontSize: 20,
              fill: "currentColor",
            }}
          />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleAdd}
          sx={{
            color: filled ? "#f1e9e9ff" : "#c1b9b9f0",
            transform: filled ? "scale(1.01)" : "scale(1)",
            transition: "transform 1.4s ease, color 0.8s ease",
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 20 }} />
        </IconButton>
      )}
    </>
  );
}
