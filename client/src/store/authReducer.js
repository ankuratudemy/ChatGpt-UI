import * as actionTypes from "./actions";

export const initialState = {
  sample: 1,
  userInfo: {},
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAMPLE:
      return {
        ...state,
        sample: action.sample,
      };
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export default authReducer;
