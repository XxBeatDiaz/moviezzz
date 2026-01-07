import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import LoginForm from "./LoginForm";

import { useAsyncActionWithAlert } from "../../hooks/useAsyncActionWithAlert";
import { fetchUser } from "../../redux/thunks/userThunks";

const LOGIN_DIALOG_TEXT =
  "To subscribe to this website, please enter your username and password here.";

export default function LoginDialog() {
  const runAction = useAsyncActionWithAlert();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (event) => {
    event.currentTarget.blur();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { username, password } = formJson;

    await runAction({
      action: fetchUser,
      payload: { username, password },
      successMessage: "Logged in successfully!",
      errorMessage: "Login failed!",
    });

    handleClose();
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
            {LOGIN_DIALOG_TEXT}
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
