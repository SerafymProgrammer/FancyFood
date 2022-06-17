import {IS_SIGN_IN, SET_AUTH_DATA} from './auth.types';

export const authActions = {
  isSignIn: status => {
    return {
      type: IS_SIGN_IN,
      is_sig_in: status,
    };
  },
  setAuthData: auth_data => {
    return {
      type: SET_AUTH_DATA,
      auth_data,
    };
  },
};
