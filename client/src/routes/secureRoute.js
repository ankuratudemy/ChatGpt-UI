import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { toRelativeUrl } from "@okta/okta-auth-js";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_INFO } from "../store/actions";

export const RequiredAuth = () => {
  const dispatch = useDispatch();
  const { oktaAuth, authState } = useOktaAuth();
  useEffect(() => {
    if (!authState) {
      dispatch({ type: SET_USER_INFO, userInfo: {} });
      return;
    }
    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    } else {
      oktaAuth.getUser().then((info) => {
        let {
          isAuthenticated,
          accessToken: { accessToken },
        } = authState || {};
        let userInfo = { ...info, isAuthenticated, accessToken };
        dispatch({ type: SET_USER_INFO, userInfo });
      });
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return <Loader />;
  }

  return <Outlet />;
};
