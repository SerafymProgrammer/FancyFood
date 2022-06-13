import {IS_SIGN_IN, SET_MENU} from './home.types';

const initialState = {
  menu: [],
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU: {
      return {
        ...state,
        menu: action.menu,
      };
    }
    default:
      return state;
  }
};
