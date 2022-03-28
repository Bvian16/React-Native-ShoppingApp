import axios from 'axios';
import {ORDERS_URL} from '../../../config';
import {abc} from '../../assets/abc';
import {def} from '../../assets/def';
export const GET_ORDERS = 'GET_ORDERS';
export const ADD_ORDERS = 'ADD_ORDERS';

export const getOrders = orders => ({
  type: GET_ORDERS,
  orders: orders,
});

export const addOrders = orders => ({
  type: ADD_ORDERS,
  orders: orders,
});

export const asyncGetOrders = key => async dispatch => {
  try {
    const response = await axios.get(ORDERS_URL, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    dispatch(getOrders(response.data));
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const asyncAddOrders = (key, order) => async dispatch => {
  try {
    const response = await axios.post(ORDERS_URL, order, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    dispatch(addOrders(response.data));
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
};
