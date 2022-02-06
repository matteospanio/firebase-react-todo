import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackMessage({ show, handler, message, style }) {
  const setter = () => {
    handler(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={show}
      onClose={setter}
      message={message}
      autoHideDuration={2500}
    >
      <Alert onClose={setter} severity={style} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
