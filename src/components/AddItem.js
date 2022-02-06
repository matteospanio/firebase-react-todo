import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.5px solid #0056ae",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 36,
};

export default function AddItem({
  title,
  description,
  setTitle,
  setDescription,
  submitHandler,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Fab onClick={handleOpen} sx={fabStyle} aria-label="add" color="primary">
        <AddIcon />
      </Fab>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            value={title}
            onChange={setTitle}
          />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            value={description}
            onChange={setDescription}
          />
          <Button style={{ marginTop: "0.5rem" }} onClick={handleClose}>
            Annulla
          </Button>
          <Button
            style={{ marginTop: "0.5rem" }}
            onClick={() => {
              submitHandler();
              handleClose();
            }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
