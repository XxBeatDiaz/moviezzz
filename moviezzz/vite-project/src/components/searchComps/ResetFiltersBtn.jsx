import { useDispatch } from "react-redux";

import { Button } from "@mui/material";

import { removeAll } from "../../redux/slices/search.js";

export default function ResetFiltersBtn({ onClick }) {
  const dispatch = useDispatch();

  const handleResetFilter = () => {
    dispatch(removeAll());
    onClick();
  };

  return (
    <Button variant="text" color="error" onClick={handleResetFilter}>
      Reset
    </Button>
  );
}
