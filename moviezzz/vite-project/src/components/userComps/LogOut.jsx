import { useDispatch } from "react-redux";

import { Button } from "@mui/material";

import { showAlert } from "../../redux/slices/alert";
import { logOut } from "../../redux/slices/user";
import { removeFavoritesMovies } from "../../redux/slices/movies";

export default function LogOut() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(removeFavoritesMovies());
    dispatch(
      showAlert({ type: "success", message: "Logged out successfully!" })
    );
  };

  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
}
