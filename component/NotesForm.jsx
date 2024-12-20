import { useContext, useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import EachNote from "./EachNote";
import AddPannel from "./AddPannel";
import { v4 as uuidv4 } from "uuid";
import { Addcon } from "../context/Addcon";
import WarningIcon from "@mui/icons-material/Warning";
import { motion } from "framer-motion"; // Import Framer Motion
import toast, { Toaster } from "react-hot-toast";

export default function NotesForm() {
  let storedData = JSON.parse(localStorage.getItem("fulldata")) || [];
  let [fulldata, upfulldata] = useState(storedData);
  let inputObj = {
    tit: "",
    descreption: "",
    id: uuidv4(),
    isDone: false,
  };
  let [inp, updateinp] = useState(inputObj);

  useEffect(() => {
    localStorage.setItem("fulldata", JSON.stringify(fulldata));
  }, [fulldata]);

  const handelClickSave = () => {
    if (inp.tit.trim() == "") {
      toast.error("Title can't be empty", {
        duration: 3000, // Set duration for the error message
        position: "top-center", // Set position of the toast
        // style: { background: '#f44336', color: '#fff' } // Custom styling
      });

      console.log("empty");
    } else {
      upfulldata([...fulldata, inp]);
      updateinp(inputObj);
      toast.success("Added Successfully!");
    }
  };

  const handeldon = (d) => {
    let don = fulldata.map((elm) => {
      if (elm.id == d) {
        elm.isDone = !elm.isDone;
      }
      return elm;
    });
    upfulldata(don);
  };

  const handeldel = (id) => {
    let del = fulldata.filter((elm) => elm.id != id);
    upfulldata(del);
  };

  const handeledit = (id, inpts) => {
    let edit = fulldata.map((elm) => {
      if (id === elm.id) {
        return { ...elm, tit: inpts.ti, descreption: inpts.dis };
      }
      return elm;
    });
    upfulldata(edit);
  };

  const [alignment, setAlignment] = useState("all");

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  // let filteredData = fulldata; // Start with all notes

  // if (alignment === "done") {
  //   filteredData = fulldata.filter((elm) => elm.isDone);
  // } else if (alignment === "waiting") {
  //   filteredData = fulldata.filter((elm) => !elm.isDone);
  // }
  const filteredData = useMemo(() => {
    console.log("filter")
    if (alignment === "done") {
      return fulldata.filter((elm) => elm.isDone);
    } else if (alignment === "waiting") {
      return fulldata.filter((elm) => !elm.isDone);
    }
    return fulldata; // Default to all notes
  }, [fulldata, alignment]);
  

  let printDate = useMemo(()=>{
    return(
      filteredData.map((elm, id) => {
        console.log("printing on proseccess")
        return (
          <EachNote
            key={id}
            elmitself={elm}
            func={handeldon}
            func2={handeldel}
            func3={handeledit}
          />
        );
      })
    )
  },[fulldata , alignment]);

  const noDataMessage = alignment !== "create" && filteredData.length === 0 && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "20px",
          textAlign: "center",
          color: "#888888",
          border: "1px solid #ddd",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <WarningIcon
          sx={{ fontSize: "40px", color: "#f44336", marginBottom: "8px" }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontFamily: '"Poppins", sans-serif',
            color: "#333",
          }}
        >
          No tasks available in this section.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"Roboto", sans-serif',
            color: "#555",
            marginTop: "8px",
          }}
        >
          Add a new task or change the filter to see your tasks.
        </Typography>
      </Box>
    </motion.div>
  );

  return (
    <Addcon.Provider value={{ inp, updateinp, handelClickSave }}>
      <Toaster />
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                To Do List
              </Typography>
              <Divider variant="middle" sx={{ my: 2 }} />
              <Box sx={{ textAlign: "center", mb: 2 }} className='upchoose'>
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform Selection"
                  
                >
                  <ToggleButton value="create" sx={{ px: 3 }}>
                    Create
                  </ToggleButton>
                  <ToggleButton value="all" sx={{ px: 3 }}>
                    All
                  </ToggleButton>
                  <ToggleButton value="done" sx={{ px: 3 }}>
                    Done
                  </ToggleButton>
                  <ToggleButton value="waiting" sx={{ px: 3 }}>
                    Waiting
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Typography variant="body1" align="center" color="text.secondary">
                Selected Platform: <strong>{alignment}</strong>
              </Typography>
              <div className="flex flex-col gap-5 items-center justify-center mt-5">
                {alignment === "create" ? <AddPannel /> : printDate}
                {noDataMessage}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Addcon.Provider>
  );
}
