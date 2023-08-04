import "./normal.css";
import "./App.css";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";

import Home from "./pages/Home";
// import Login from "./pages/Login";
// import LoginForm from "./components/login/LoginForm";
import { useNavigate, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { RequiredAuth } from "./routes/secureRoute";

import config from "./config/okta";
import JllTheme from "./components/jllTheme";
const oktaAuth = new OktaAuth(config.oidc);

function App() {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "", window.location.origin));
  };
  return (
    <div className="App">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route
            path="login/callback"
            element={<LoginCallback loadingElement={<Loader />} />}
          />
          <Route path="" element={<RequiredAuth />}>
            <Route index exact path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </Security>
    </div>
  );
}

export default App;
