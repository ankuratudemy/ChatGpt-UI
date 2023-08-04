import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, SvgIcon, Typography, Drawer } from "@mui/material";
import Avatar from "../components/Avatar";
import BotResponse from "../components/BotResponse";
import ChatPrompt from "../components/ChatPrompt";
import Error from "../components/Error";
import IntroSection from "../components/IntroSection";
import Loading from "../components/Loading";
import NavContent from "../components/NavContent";
import SvgComponent from "../components/SvgComponent";
import { useSelector, useDispatch } from "react-redux";
import { padding } from "@mui/system";
const MenuIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M21 18H3M21 12H3M21 6H3" />
  </SvgIcon>
);

const CloseIcon = (props) => (
  <SvgIcon {...props}>
    <path d="m53.691 50.609 13.467-13.467a2 2 0 1 0-2.828-2.828L50.863 47.781 37.398 34.314a2 2 0 1 0-2.828 2.828l13.465 13.467-14.293 14.293a2 2 0 1 0 2.828 2.828l14.293-14.293L65.156 67.73c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L53.691 50.609z" />
  </SvgIcon>
);

const Home = () => {
  const { samaccountname } = useSelector((state) => state.auth.userInfo);
  console.log(samaccountname);
  const [showMenu, setShowMenu] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [err, setErr] = useState(false);
  const [responseFromAPI, setReponseFromAPI] = useState(false);

  const chatLogRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!responseFromAPI) {
      if (inputPrompt.trim() !== "") {
        // Set responseFromAPI to true before making the fetch request
        setReponseFromAPI(true);
        setChatLog([...chatLog, { chatPrompt: inputPrompt }]);
        callAPI();

        // hide the keyboard in mobile devices
        e.target.querySelector("input").blur();
      }

      async function callAPI() {
        try {
          const response = await fetch("http://localhost:4000/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: inputPrompt,
              userid: samaccountname,
            }),
          });
          const data = await response.json();
          setChatLog([
            ...chatLog,
            {
              chatPrompt: inputPrompt,
              botMessage: data.botResponse,
            },
          ]);
          setErr(false);
        } catch (err) {
          setErr(err);
          console.log(err);
        }
        //  Set responseFromAPI back to false after the fetch request is complete
        setReponseFromAPI(false);
      }
    }

    setInputPrompt("");
  };

  useEffect(() => {
    const getHistory = async () => {
      const response = await fetch("http://localhost:4000/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid: samaccountname }),
      });
      const data = await response.json();
      setChatLog(data.history);
    };
    if (samaccountname) getHistory();
    return () => {};
  }, [samaccountname]);

  return (
    <>
      <header>
        <Box className="menu">
          <IconButton onClick={() => setShowMenu(true)} color="inherit">
            <MenuIcon
              style={{
                fill: "none",
                stroke: "#d9d9e3",
                strokeLinecap: "round",
              }}
            />
          </IconButton>
        </Box>
        <Typography variant="h1">AI Bot</Typography>
      </header>

      {showMenu && (
        <Drawer
          anchor="right"
          open={showMenu}
          onClose={() => setShowMenu(false)}
        >
          <Box className="navItems">
            <NavContent
              chatLog={chatLog}
              setChatLog={setChatLog}
              setShowMenu={setShowMenu}
            />
          </Box>
          <Box className="navCloseIcon">
            <IconButton onClick={() => setShowMenu(false)} color="inherit">
              <CloseIcon fill="#fff" stroke="#fff" width={42} height={42} />
            </IconButton>
          </Box>
        </Drawer>
      )}

      <aside className="sideMenu">
        <NavContent
          chatLog={chatLog}
          setChatLog={setChatLog}
          setShowMenu={setShowMenu}
        />
      </aside>

      {samaccountname && (
        <section className="chatBox">
          {chatLog.length > 0 ? (
            <div id="chatLogWrapper" className="chatLogWrapper">
              {chatLog.length > 0 &&
                chatLog.map((chat, idx) => (
                  <div
                    className="chatLog"
                    key={idx}
                    ref={chatLogRef}
                    id={`navPrompt-${chat.chatPrompt.replace(
                      /[^a-zA-Z0-9]/g,
                      "-"
                    )}`}
                  >
                    <div className="chatPromptMainContainer">
                      <div className="chatPromptWrapper">
                        <Avatar bg="#5437DB" className="userSVG">
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={1.9}
                            viewBox="0 0 24 24"
                            // strokeLinecap="round"
                            // strokeLinejoin="round"
                            className="h-6 w-6"
                            height={40}
                            width={40}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx={12} cy={7} r={4} />
                          </svg>
                        </Avatar>
                        <ChatPrompt
                          response={chat.chatPrompt}
                          chatLogRef={chatLogRef}
                          oldMessage={
                            responseFromAPI
                              ? idx <= chatLog.length - 1
                                ? true
                                : false
                              : idx <= chatLog.length - 1
                          }
                        />
                        {/* <div id="chatPrompt">{chat.chatPrompt}</div> */}
                      </div>
                    </div>

                    <div className="botMessageMainContainer">
                      <div className="botMessageWrapper">
                        <Avatar bg="#11a27f" className="openaiSVG">
                          <SvgComponent w={41} h={41} />
                        </Avatar>
                        {chat.botMessage ? (
                          <div id="botMessage">
                            <BotResponse
                              response={chat.botMessage}
                              chatLogRef={chatLogRef}
                              oldMessage={
                                responseFromAPI
                                  ? idx <= chatLog.length - 1
                                    ? true
                                    : false
                                  : idx <= chatLog.length - 1
                              }
                            />
                          </div>
                        ) : err ? (
                          <Error err={err} />
                        ) : (
                          <Loading />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <IntroSection />
          )}

          <form  onSubmit={handleSubmit}>
            <div className="inputPromptWrapper">
              <input
                name="inputPrompt"
                id=""
                className="inputPrompttTextarea"
                type="text"
                rows="1"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                autoFocus
              ></input>
              <button aria-label="form submit" type="submit">
                <svg
                  fill="#ADACBF"
                  width={15}
                  height={20}
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#212023"
                  strokeWidth={0}
                >
                  <title>{"submit form"}</title>
                  <path
                    d="m30.669 1.665-.014-.019a.73.73 0 0 0-.16-.21h-.001c-.013-.011-.032-.005-.046-.015-.02-.016-.028-.041-.05-.055a.713.713 0 0 0-.374-.106l-.05.002h.002a.628.628 0 0 0-.095.024l.005-.001a.76.76 0 0 0-.264.067l.005-.002-27.999 16a.753.753 0 0 0 .053 1.331l.005.002 9.564 4.414v6.904a.75.75 0 0 0 1.164.625l-.003.002 6.259-4.106 9.015 4.161c.092.043.2.068.314.068H28a.75.75 0 0 0 .747-.695v-.002l2-27.999c.001-.014-.008-.025-.008-.039l.001-.032a.739.739 0 0 0-.073-.322l.002.004zm-4.174 3.202-14.716 16.82-8.143-3.758zM12.75 28.611v-4.823l4.315 1.992zm14.58.254-8.32-3.841c-.024-.015-.038-.042-.064-.054l-5.722-2.656 15.87-18.139z"
                    stroke="none"
                  />
                </svg>
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Home;
