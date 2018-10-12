import { REGISTER_USER, REGISTER_USER_SUCCESS } from '../actions';


export default function(state={}, action) {
  switch(action.type) {
    case REGISTER_USER_SUCCESS:
      return { ...state, registered: true };
    default:
      return state
  }
}

