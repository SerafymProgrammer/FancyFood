import {IS_SIGN_IN} from './auth.types';

const initialState = {
  is_sig_in: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_SIGN_IN: {
      return {
        ...state,
        is_sig_in: action.is_sig_in,
      };
    }
    default:
      return state;
  }
};
