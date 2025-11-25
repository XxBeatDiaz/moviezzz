import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import LoginForm from "./LoginForm";

import { showAlert } from "../../redux/slices/alert";
import { fetchUser } from "../../redux/thunks/userThunks";

const loginDialogText =
  "To subscribe to this website, please enter your username and password here.";

export default function LoginDialog() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    event.currentTarget.blur();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { username, password } = formJson;

    try {
      await dispatch(fetchUser({ username, password })).unwrap();
      dispatch(
        showAlert({ type: "success", message: "Logged in successfully!" })
      );
      handleClose();
    } catch (error) {
      dispatch(
        showAlert({
          type: "error",
          message: `Login failed! <${error.message}>`,
        })
      );
    }
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ marginLeft: "24px", marginTop: "16px" }}>
            {loginDialogText}
          </DialogContentText>

          <LoginForm onSubmit={handleSubmit} formId={"subscription-form"} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
