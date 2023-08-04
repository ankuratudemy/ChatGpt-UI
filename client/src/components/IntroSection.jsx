import React from "react";
import { Typography } from "@mui/material";
import BotResponse from "./BotResponse";

const IntroSection = () => {
  return (
    <div id="introsection">
      <Typography variant="h4" component="h4" gutterBottom>
        Introducing Talkbot
      </Typography>
      <Typography variant="h6" component="h6" gutterBottom>
        Converts Text to SQL and return query results
      </Typography>
    </div>
  );
};

export default IntroSection;