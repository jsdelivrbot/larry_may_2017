import {
  GET_ALL_POSTS,
  GET_POST,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  DELETE_COMMENTS,
  UPDATE_COMMENTS
} from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_ALL_POSTS:
    const {data} = action.payload;
    const newPostsObj = data.reduce(function(posts, post) {
      const newPosts = Object.assign({}, post);
      newPosts._id = post._id;
      newPosts.comments = post.comments.reduce((comments, comment) => {
        const newComments = Object.assign({}, comment);
        newComments._id = comment._id;
        return Object.assign({}, comments, {[newComments._id]: newComments});
      }, {});
      return Object.assign({}, posts, {[newPosts._id]: newPosts});
    },{});

    return newPostsObj;
    break;
    case GET_POST:
      const newPost = Object.assign({}, action.payload.data);
      newPost._id = action.payload.data._id;
      newPost.comments = _.mapKeys(action.payload.data.comments, '_id');
      const newPostState = {...state, [action.payload.data._id]: newPost};
      return newPostState;
    break;
    case DELETE_POST:
      return _.omit(state, action.payload);
    break;
    case DELETE_COMMENTS:
      const newCommentArray = _.reject(action.post.comments, {'_id': action.payload});
      const newState = {
        ...state,
          [action.post._id] : {
            ...action.post,
              comments : newCommentArray
          }
      };
      return newState;
    break;
    case UPDATE_COMMENTS:
      const editCommentState = {
        ...state,
          [action.id] : {
            ...state[action.id],
              comments: {
                ...state[action.id].comments,
                  [action.payload.data._id]: action.payload.data
              }
          }
      }
      return editCommentState;
    break;
    case UPDATE_POST:
      let updates = {[action.payload.data._id]: action.payload.data};
      const editedPost = _.merge(...state, updates);
      return editedPost;
    break;
    default:
      return state;
    break;
  }
}
