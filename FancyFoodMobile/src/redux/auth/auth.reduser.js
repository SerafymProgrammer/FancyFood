import {IS_SIGN_IN, SET_AUTH_DATA} from './auth.types';

const initialState = {
  is_sig_in: false,
  auth_data: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_SIGN_IN: {
      return {
        ...state,
        is_sig_in: action.is_sig_in,
      };
    }
    case SET_AUTH_DATA: {
      return {
        ...state,
        auth_data: action.auth_data,
      };
    }
    default:
      return state;
  }
};
