import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './reducer_auth';
import postsReducer from './reducer_posts';
import userReducer from './reducer_user';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  posts: postsReducer,
  user: userReducer
});

export default rootReducer;
