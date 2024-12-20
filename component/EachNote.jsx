import Grid from "@mui/material/Grid2";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import "../src/App";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { motion } from "framer-motion"; // Import Framer Motion

import Swal from "sweetalert2";

export default function EachNote({ elmitself, func, func2, func3 }) {
  let title = elmitself.tit;
  let disc = elmitself.descreption;
  let idid = elmitself.id;

  let handelDoneclick = () => {
    func(elmitself.id);
  };

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  let inn = {
    ti: title,
    dis: disc,
  };
  let [inpts, upinpts] = useState(inn);

  let handeldeletClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        backdrop: "swal-backdrop-blur",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Note has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        func2(elmitself.id); // Function call corrected
      }
    });
  };

  const handleClose = () => {
    setOpen2(false); // Updated to correctly close the second dialog
  };

  let handeledit = () => {
    // Call the external function passed as prop
    setOpen2(true);
  };
  let handelSub = () => {
    func3(elmitself.id, inpts);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
      animate={{ opacity: 1, x: 0 }} // End at the normal position
      exit={{ opacity: 0, x: 100 }} // Exit to the right
      transition={{ duration: 0.5 }} // Smooth animation duration
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          border: "1px solid #e0e0e0",
          backgroundColor: elmitself.isDone ? "#e8f5e9" : "#f9f9f9",
          
        }}
        className="tasks w-11/12 bg-gray-200 p-4 shadow-md rounded-lg"
        spacing={0}
      >
        <Grid
          size={7.5}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            wordWrap: "break-word",
          }}
        >
          <strong
          className="title"
            style={{
              fontSize: "1.18rem",
              color: elmitself.isDone ? "#2e7d32" : "#333",
              fontWeight: "600",
              lineHeight: "1.4",
              fontFamily: "Roboto, sans-serif",
              textDecoration: elmitself.isDone ? "line-through" : "none",
            }}
          >
            {title}
          </strong>
          <span
          className="disc"
            style={{
              fontSize: "0.9rem",
              color: elmitself.isDone ? "#6d6d6d" : "#555",
              fontWeight: "400",
              lineHeight: "1.5",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            {disc}
          </span>
        </Grid>

        <Grid
          
          xs={4} // Take up 4/12 of the grid on small screens
          sm={5} // Adjust for larger screens
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            flexDirection: "row", // Default horizontal layout
            flexWrap: "wrap", // Allow buttons to wrap on small screens
          }}
        >
          <IconButton
            color="error"
            style={{
              backgroundColor: "white",
              border: "1px red solid",
              width: "35px", // Adjust size for better responsiveness
              height: "35px",
            }}
            aria-label="delete"
            onClick={handeldeletClick}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            color="success"
            style={{
              backgroundColor: elmitself.isDone ? "#2e7d32" : "white",
              color: elmitself.isDone ? "white" : "#2e7d32",
              border: "1px solid #2e7d32",
              transition: "transform 0.2s ease, background-color 0.3s ease",
              width: "35px", // Adjust size for better responsiveness
              height: "35px",
            }}
            aria-label="done"
            onClick={handelDoneclick}
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            style={{
              backgroundColor: "#fff",
              border: "1px solid #2196f3",
              color: "#2196f3",
              padding: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              width: "35px", // Adjust size for better responsiveness
              height: "35px",
            }}
            aria-label="edit"
            onClick={handeledit}
          >
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Dialog
        open={open2}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log("Form Data:", formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <DialogContentText>Modify your note below.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            defaultValue={title}
            onChange={(e) => {
              upinpts({ ...inpts, ti: e.target.value });
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            defaultValue={disc}
            onChange={(e) => {
              upinpts({ ...inpts, dis: e.target.value });
            }}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handelSub}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}
