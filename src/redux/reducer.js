import {LOGIN, LOGOUT, REGISTER} from './users/action';
import {initialState} from './initialState';
import {ADDTOCART, PRODUCTS} from './products/action';

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
    default:
      return state;
  }
};

export default rootReducer;
