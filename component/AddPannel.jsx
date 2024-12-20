import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { Addcon } from '../context/Addcon';

export default function AddPannel() {
    let {inp, updateinp ,handelClickSave} = useContext(Addcon)
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "400px", // Limiting max width for better alignment
                margin: "0 auto",
                padding: "1.5rem",
                backgroundColor: "#f9f9f9", // Light background color
                borderRadius: "12px", // Rounded corners for the panel
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for elevation
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
                alignItems: "center",
            }}
        >
            <TextField
                id="task-title"
                label="Task Title"
                variant="outlined"
                fullWidth
                sx={{
                    "& .MuiInputLabel-root": {
                        fontWeight: 600, // Bold label text
                    },
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px", // Rounded corners for input
                    }
                }}
                value={inp.tit}
                onChange={(e) => { updateinp({ ...inp, tit: e.target.value }) }}
            />
            <TextField
                id="task-details"
                label="Task Details"
                variant="outlined"
                fullWidth
                multiline
                rows={4} // Adjusted for multiline task details
                sx={{
                    "& .MuiInputLabel-root": {
                        fontWeight: 600, // Bold label text
                    },
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px", // Rounded corners for input
                    }
                }}
                value={inp.descreption}
                onChange={(e) => { updateinp({ ...inp, descreption: e.target.value }) }}

            />
            <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                    backgroundColor: "#2196f3", // Blue color for consistency
                    padding: "12px 24px", // Padding for better button size
                    borderRadius: "8px", // Rounded corners for button
                    textTransform: "none", // Normal case for text
                    fontWeight: 600, // Bold text in the button
                    "&:hover": {
                        backgroundColor: "#1976d2", // Darken color on hover
                    },
                }}
                onClick={() => (handelClickSave())}
            >
                Send
            </Button>
        </div>
    );
}
