import { useDispatch } from "react-redux";

import { removeAll } from "../../redux/slices/search.js";
import { Button } from "@mui/material";

export default function ResetFiltersBtn({ onClick }) {
  const dispatch = useDispatch();

  function handleResetFilter() {
    dispatch(removeAll());
    onClick();
  }

  return (
    <Button
      variant="text"
      color="error"
      onClick={handleResetFilter}
    >
      Reset
    </Button>
  );
}
