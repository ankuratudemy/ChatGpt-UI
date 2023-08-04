import { createBrowserHistory, History } from "history";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./authReducer";

const history = createBrowserHistory();
// ==============================|| REDUX - MAIN STORE ||============================== //

// combineReducers will be handled internally by configureStore
const rootReducer = (history) => ({
  auth: authReducer
});

const initialState = {};

const store = configureStore({
  reducer: rootReducer(history),
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export { store, history };
