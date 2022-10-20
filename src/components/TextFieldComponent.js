import React from "react";
import TextField from "@mui/material/TextField";

const TextFieldComponent = (props) => {
  return (
    <TextField
      id="outlined-basic"
      error={props.state.length === 0 ? false : true}
      helperText={props.error}
      label={props.heading}
      defaultValue={props.state}
      variant="outlined"
      onChange={(e) => {
        props.setState(e.target.value);
      }}
    />
  );
};

export default TextFieldComponent;
