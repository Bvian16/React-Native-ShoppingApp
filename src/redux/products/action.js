import axios from 'axios';
import {PRODUCT_URL} from '../../../config';

export const PRODUCTS = 'PRODUCTS';
export const ADDTOCART = 'ADDTOCART';

export const addToCart = products => ({
  type: ADDTOCART,
  products: products,
});

export const getproducts = products => ({
  type: PRODUCTS,
  products: products,
});

export const removeFromCart = (product, cart) => dispatch => {
  try {
    const newCart = cart.filter(item => item.id !== product.id);
    dispatch(addToCart(newCart));
  } catch (error) {
    console.log(error);
  }
};

export const addItemsToCart = (product, cart) => dispatch => {
  try {
    cart.map(item => {
      if (item.id === product.id) {
        product.Quantity = item.Quantity + product.Quantity;
      }
    });
    const newCart = cart.filter(item => item.id !== product.id);
    newCart.push(product);
    // console.log(product.quantity);
    dispatch(addToCart(newCart));
  } catch (error) {
    console.log(error);
  }
};

export const asyncgetProducts = () => async dispatch => {
  try {
    const response = await axios.get(PRODUCT_URL);
    // console.log(response.data);
    dispatch(getproducts(response.data));
  } catch (error) {
    console.error(error);
  }
};
