import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const logout = () => ({
  type: LOGOUT,
});

export const asynclogin = (email, password) => async dispatch => {
  console.log('asynclogin');
  try {
    await AsyncStorage.setItem(
      'currentuser',
      JSON.stringify({email, password}),
    );

    const response = await axios.post(LOGIN_URL, {
      identifier: email,
      password,
    });
    console.log(response.data);
    dispatch(login(response.data));
    return true;
  } catch (error) {
    return false;
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
    console.log('print');
    console.log(response.data.user);
    dispatch(register(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const asynclogout = () => async dispatch => {
  try {
    AsyncStorage.clear();
    console.log('asynclogout');
    dispatch(logout());
  } catch (error) {
    console.error(error);
  }
};
