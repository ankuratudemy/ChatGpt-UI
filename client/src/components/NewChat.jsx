import React from "react";

const NewChat = ({ setChatLog, setShowMenu }) => {
  console.log(setChatLog, setShowMenu)
  return (
    <div
      className="sideMenuButton"
      onClick={() => {
        setChatLog([])
        setShowMenu(true);
      }}
    >
      <span>+</span>
      New chat
    </div>
  );
};

export default NewChat;
