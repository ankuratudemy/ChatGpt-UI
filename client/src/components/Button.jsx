import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ text, handleClick }) => {
  return (
    <MuiButton
      variant="contained"
      onClick={handleClick}
      id="loginButton"
    >
      {text}
    </MuiButton>
  );
};

export default Button;