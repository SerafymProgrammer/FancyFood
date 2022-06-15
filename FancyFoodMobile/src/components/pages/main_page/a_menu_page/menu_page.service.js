import {MAIN_URL} from '../../../../../env.consts';

export const get_dishes_request = () => {
  let url = `${MAIN_URL}/dishes`;
  return fetch(url).then(res => res.json());
};
