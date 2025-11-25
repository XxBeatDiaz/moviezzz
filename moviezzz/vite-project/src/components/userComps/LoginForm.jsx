import { TextField } from "@mui/material";

export default function LoginForm({ onSubmit, formId }) {
  return (
    <>
      <form onSubmit={onSubmit} id={formId}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="username"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
        />
      </form>
    </>
  );
}
