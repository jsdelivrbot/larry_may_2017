//actions go here
import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
  GET_USER,
  REMOVE_USER
} from './types';

const ROOT_URL = 'http://localhost:3000';

export function signinUser({email, password}, cb) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then((response) => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
      })
      .then(() => cb())
      .catch((error) => {
        console.log(error.response.data.message);
        dispatch(authError(error.response.data.error));
      });
  }
}

export function signupUser({ email, password }, cb) {
  return function(dispacth) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then((response) => {
        dispacth({type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
      })
      .then(() => cb())
      .catch((error) => {
        dispacth(authError(error.response.data.error));
      });
  }
}

export function getUser() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: GET_USER,
        payload: response
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return function(dispatch){
    dispatch({ type: UNAUTH_USER});
  }
}

export function removeUser() {
  return {
    type: REMOVE_USER
  }
}
