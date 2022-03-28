import {LOGIN, LOGOUT, REGISTER} from './users/action';
import {initialState} from './initialState';
import {ADDTOCART, PRODUCTS} from './products/action';
import {ADD_ORDERS, GET_ORDERS} from './orders/action';

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        user: action.data,
      };
    case LOGIN:
      return {
        ...state,
        user: action.data,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        products: [],
        cart: [],
        orders: [],
      };
    case PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case ADDTOCART:
      return {
        ...state,
        cart: action.products,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case ADD_ORDERS:
      return {
        ...state,
        orders: [...state.orders, action.orders],
      };
    default:
      return state;
  }
};

export default rootReducer;
