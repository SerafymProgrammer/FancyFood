import {MAIN_URL} from '../../../../../env.consts';

export const get_free_tables = datetime => {
  let url = `${MAIN_URL}/free_tables?${datetime.getTime()}`;
  return fetch(url).then(res => res.json());
};

export const create_order = data => {
  let url = `${MAIN_URL}/create_order`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }).then(res => res.json());
};
