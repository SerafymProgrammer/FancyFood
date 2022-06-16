import {MAIN_URL} from '../../../../../env.consts';

export const get_orders = user_id => {
  let url = `${MAIN_URL}/orders_by_user?user_id=${user_id}`;
  return fetch(url).then(res => res.json());
};

export const del_order = order_id => {
  let url = `${MAIN_URL}/del_order?o_id=${order_id}`;
  return fetch(url).then(res => res.json());
};
