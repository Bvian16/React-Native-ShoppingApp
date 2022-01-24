import axios from 'axios';
import {LOGIN_URL, REGISTER_URL} from '../../../config';

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const register = data => ({
  type: REGISTER,
  data: data,
});

export const login = data => ({
  type: LOGIN,
  data: data,
});

export const asynclogin = (email, password) => async dispatch => {
  console.log('asynclogin');
  try {
    const response = await axios.post(LOGIN_URL, {
      identifier: email,
      password,
    });
    console.log(response.data);
    dispatch(login(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncRegister = (username, email, password) => async dispatch => {
  console.log('asyncRegister');
  try {
    const response = await axios.post(REGISTER_URL, {
      username,
      email,
      password,
    });
    console.log(response.data.user);
    dispatch(register(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => ({
  type: LOGOUT,
});
