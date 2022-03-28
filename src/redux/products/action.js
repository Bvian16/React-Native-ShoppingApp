import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const asyncfetchcart = () => async dispatch => {
  try {
    const cart = await AsyncStorage.getItem('cart');
    const products = cart ? JSON.parse(cart) : [];
    console.log('asyc fetch cart', products);
    dispatch(addToCart(products));
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = (product, cart) => async dispatch => {
  try {
    const newCart = cart.filter(item => item.id !== product.id);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    dispatch(addToCart(newCart));
  } catch (error) {
    console.log(error);
  }
};

export const addItemsToCart = (product, cart) => async dispatch => {
  try {
    cart.map(item => {
      if (item.id === product.id) {
        product.Quantity = item.Quantity + product.Quantity;
      }
    });
    const newCart = cart.filter(item => item.id !== product.id);
    newCart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
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
