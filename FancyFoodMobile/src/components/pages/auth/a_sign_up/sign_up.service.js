import {MAIN_URL} from '../../../../../env.consts';

export const register_request = data => {
  let url = `${MAIN_URL}/register`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }).then(res => res.json());
};
