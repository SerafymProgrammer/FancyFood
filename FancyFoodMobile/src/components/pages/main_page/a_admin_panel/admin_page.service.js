import {MAIN_URL} from '../../../../../env.consts';

export const get_orders = () => {
  let url = `${MAIN_URL}/orders_all`;
  return fetch(url).then(res => res.json());
};

export const del_order = order_id => {
  let url = `${MAIN_URL}/del_order?o_id=${order_id}`;
  return fetch(url).then(res => res.json());
};
