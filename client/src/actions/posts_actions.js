import axios from 'axios';
import {
  GET_ALL_POSTS,
  GET_POST,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST
} from './types';

const ROOT_URL = 'http://localhost:3000';
// const AUTH_TOKEN = localStorage.getItem('token');
//
// axios.defaults.headers.common['authorization'] = AUTH_TOKEN;

export function getAllPosts() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/posts`)
      .then((response) => {
        dispatch({
          type: GET_ALL_POSTS,
          payload: response
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export function getOnePost(id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        dispatch({
          type: GET_POST,
          payload: response
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export function createPost({title, content}, cb) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/posts`, {title, content}, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then((response) => {
        dispatch({
          type: CREATE_POST,
          payload: response
        });
      })
      .then(() => cb())
      .catch((error) => {
        if(error.response) {
          console.log(error.response.data);
        }
        console.log("Problem submitting New Post", error);
      });
  }
}

export function updatePost(values, id, cb) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/posts/${id}`, values, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then((response) => {
        dispatch({
          type: UPDATE_POST,
          payload: response
        });
      })
      .then(() => cb())
      .catch((error) => {
        console.log(error);
      })
  }
}

export function deletePost(id, cb) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/posts/${id}`, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(() => {
        dispatch({
          type: DELETE_POST,
          payload: id
        });
      })
      .then(() => cb())
      .catch((error) => {
        console.log(error);
      });
  }
}
