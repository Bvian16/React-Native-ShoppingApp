import {API_URL} from '@env';

export const getApiUrl = endpoint => API_URL + endpoint;

export const LOGIN_URL = getApiUrl('/auth/local');
export const REGISTER_URL = getApiUrl('/auth/local/register');
export const PRODUCT_URL = getApiUrl('/products');
