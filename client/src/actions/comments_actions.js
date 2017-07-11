import axios from 'axios';
import {
  GET_COMMENTS,
  CREATE_COMMENTS,
  DELETE_COMMENTS,
  UPDATE_COMMENTS
} from './types';

const ROOT_URL = 'http://localhost:3000/posts';
const AUTH_TOKEN = localStorage.getItem('token');

axios.defaults.headers.common['authorization'] = AUTH_TOKEN;

export function getComments(post_id) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/${post_id}/comments`)
      .then((response) => {
        dispatch({
          type: GET_COMMENTS,
          payload: response
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export function postComments(comment, post_id, cb) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/${post_id}/comments`, comment)
      .then((response) => {
        dispatch({
          type: CREATE_COMMENTS,
          payload: response
        });
      })
      .then(() => cb())
      .catch((error) => {
        console.log(error);
      });
  }
}

export function editComments({text}, post_id, comment_id, cb) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/${post_id}/comments/${comment_id}`, {text})
      .then((response) => {
        dispatch({
          type: UPDATE_COMMENTS,
          payload: response,
          id: post_id
        });
      })
      .then(() => cb())
      .catch((error) => {
        console.log(error);
      });
  }
}

export function deleteComments(post, comment_id, cb) {
  return function(dispatch) {
    axios.delete(`${ROOT_URL}/${post._id}/comments/${comment_id}`)
      .then(() => {
        dispatch({
          type: DELETE_COMMENTS,
          payload: comment_id,
          post: post
        });
      })
      .then(() => cb())
      .catch((error) => {
        console.log(error);
      });
  }
}
