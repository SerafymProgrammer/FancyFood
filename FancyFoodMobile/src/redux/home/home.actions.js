import {SET_MENU} from './home.types';

export const homeActions = {
  set_menu: menu => {
    return {
      type: SET_MENU,
      menu,
    };
  },
};
