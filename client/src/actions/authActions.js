import axios from 'axios';
import {returnError} from './errorActions';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
} from './types';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch ({
    type: USER_LOADING,
  });

  axios
    .get ('/api/auth/user', tokenConfig (getState))
    .then (res =>
      dispatch ({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch (err => {
      dispatch (returnError (err.response.data, err.response.status));
      dispatch ({
        type: AUTH_ERROR,
      });
    });
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from local storage
  const token = getState.auth.token;

  //Header
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
