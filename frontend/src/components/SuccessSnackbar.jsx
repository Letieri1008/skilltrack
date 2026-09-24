import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { successSnackbarAnimation } from "../animation/pageAnimations";

export default function SuccessSnackbar({ open, message, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1800}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={successSnackbarAnimation}
    >
      <Alert onClose={onClose} severity="success" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
