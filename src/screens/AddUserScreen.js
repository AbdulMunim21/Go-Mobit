import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import TextFieldComponent from "../components/TextFieldComponent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddUserScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cell, setCell] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState();
  const [open, setOpen] = useState(false);
  const [ageHelperText, setAgeHelperText] = useState("Field Cannot be Empty");
  const [nameHelperText, setNameHelperText] = useState("Field Cannot be Empty");
  const [cellHelperText, setCellHelperText] = useState("Field Cannot be Empty");
  const [emailHelperText, setEmailHelperText] = useState(
    "Field Cannot be Empty"
  );
  const [ageError, setAgeError] = useState(age.length === 0 ? true : false);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const onSubmit = async () => {
    const response = await axios.post(
      "http://localhost:3030/addUser",
      {
        email: email,
        name: name,
        age: age,
        cell: cell,
      },
      { withCredentials: true }
    );

    if (response.data.result === "User already exists") {
      setMessage(response.data.result);
      setColor("error");
      handleClick();
      return;
    }
    if (response.data.result === "Successful") {
      setMessage(response.data.result);
      setColor("success");
      handleClick();
      setTimeout(() => {
        navigate("/");
      }, 1500);

      return;
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      >
        <Alert onClose={handleClose} severity={color} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          style={{
            margin: "20px",
            flexDirection: "column",
            display: "flex",
            width: "100%",
            height: "90%",
            padding: "50px",
          }}
        >
          {/* <Box
            component="form"
            style={{
              margin: "20px",
              flexDirection: "column",
              display: "flex",
              width: "100%",
              height: "80%",
              padding: "50px",
            }}
            autoComplete="on"
          > */}
          <TextField
            id="outlined-basic"
            error={name.length === 0 ? true : false}
            helperText={nameHelperText}
            label={"Name"}
            defaultValue={name}
            variant="outlined"
            style={{
              display: "flex",
              marginTop: "20px",
              width: "100%",
            }}
            required
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.length > 0) {
                setNameHelperText("");
              }
            }}
          />
          <TextField
            id="outlined-basic"
            error={
              email.length === 0 ? true : email.includes("@") ? false : true
            }
            helperText={emailHelperText}
            label={"Email"}
            defaultValue={email}
            variant="outlined"
            required
            style={{
              display: "flex",
              marginTop: "20px",
              width: "100%",
            }}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!e.target.value.includes("@")) {
                setEmailHelperText("Email format not correct");
              } else {
                setEmailHelperText("");
              }
            }}
          />
          <TextField
            id="outlined-basic"
            error={cell.length === 0 ? true : cell.length === 11 ? false : true}
            helperText={cellHelperText}
            label={"Cell"}
            defaultValue={cell}
            variant="outlined"
            required
            style={{
              display: "flex",
              marginTop: "20px",
              width: "100%",
            }}
            onChange={(e) => {
              setCell(e.target.value);
              if (e.target.value.length === 11) {
                setCellHelperText("");
              } else {
                setCellHelperText("Range Should be 11");
              }
            }}
          />
          <TextField
            id="outlined-basic"
            error={ageError}
            helperText={ageHelperText}
            label={"Age"}
            defaultValue={age}
            variant="outlined"
            required
            style={{
              display: "flex",
              width: "100%",
              marginTop: "20px",
            }}
            onChange={(e) => {
              console.log(e.target.value);
              setAge(e.target.value);
              if (
                parseInt(e.target.value) >= 18 &&
                parseInt(e.target.value) <= 60
              ) {
                setAgeHelperText();
                setAgeError(false);
              } else {
                setAgeHelperText("Age Should be Between 18 and 60");
                setAgeError(true);
              }
            }}
          />
          {/* </Box> */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "10%",
              marginTop: "50px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={onSubmit}
              variant="contained"
              type="submit"
              style={{
                display: "flex",
                width: "20%",
                padding: "20px",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUserScreen;
