import {IS_SIGN_IN} from './auth.types';

export const authActions = {
  isSignIn: status => {
    return {
      type: IS_SIGN_IN,
      is_sig_in: status,
    };
  },
};
