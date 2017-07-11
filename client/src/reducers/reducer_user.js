import {GET_USER, REMOVE_USER} from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case GET_USER:
      let user = action.payload.data;
      return user;
    break;
    case REMOVE_USER:
      return null;
    default:
      return state;
    break;
  }
}
