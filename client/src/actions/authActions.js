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

// Register User
export const register = ({name, email, password}) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // Request Body
  const body = JSON.stringify ({name, email, password});

  axios
    .post ('/api/users', body, config)
    .then (res =>
      dispatch ({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch (err => {
      dispatch (
        returnError (err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch ({
        type: REGISTER_FAIL,
      });
    });
};
// Logout User and clear token
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from local storage
  const token = getState ().auth.token;

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
