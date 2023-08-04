import { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import {styled} from "@mui/material/styles";

const BotResponse = ({ response, oldMessage = true }) => {
  const [botResponse, setBotResponse] = useState("");
  const [isPrinting, setIsPrinting] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const chatLogRef = useRef();

  useEffect(() => {
    let index = 1;
    if (oldMessage) {
      setBotResponse(response);
      setIsButtonVisible(false);
      if (chatLogRef.current) {
        chatLogRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    } else {
      let msg = setInterval(() => {
        if (response !== " - The Ultimate AI Assistant") {
          setIsButtonVisible(true);
        }
        if (!isPrinting) {
          clearInterval(msg);
          return;
        }
        setBotResponse(response.slice(0, index));
        if (index >= response.length) {
          clearInterval(msg);
          setIsButtonVisible(false);
        }
        index++;

        if (chatLogRef.current) {
          chatLogRef.current.scrollIntoView({
            behavior: "instant",
            block: "end",
          });
        }
      }, 0);
      return () => clearInterval(msg);
    }
  }, [chatLogRef, response, isPrinting, oldMessage]);

  const stopPrinting = () => setIsPrinting(!isPrinting);

  return (
    <StyledBotResponseContainer>
      <pre>{botResponse}{botResponse === response ? "" : "|"}</pre>
      {isButtonVisible && (
        <Button
          variant="contained"
          onClick={stopPrinting}
          className="stop-message"
        >
          {isPrinting ? "Stop Message" : "Regenerate Message"}
        </Button>
      )}
      <div ref={chatLogRef}></div>
    </StyledBotResponseContainer>
  );
};

const StyledBotResponseContainer = styled(Box)`
  .stop-message {
    position: absolute;
    bottom: 10px;
    right: 100px;
    border-radius: 10%;
    padding: 10px 15px;
    background-color: rgb(52, 53, 65);
    color: rgb(217, 217, 217);
    cursor: pointer;
    border: 1px solid rgb(86, 88, 105);
    &:hover {
      background-color: rgb(64, 65, 79);
    }
  }
`;

export default BotResponse;