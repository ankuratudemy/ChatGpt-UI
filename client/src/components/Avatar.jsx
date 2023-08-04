import React from "react";
import Avatar from "@mui/material/Avatar";


const CustomAvatar = ({ children, bg, className }) => {
  return (
      <Avatar>{children}</Avatar>
  );
};

export default CustomAvatar;