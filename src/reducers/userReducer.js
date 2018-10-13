import { REGISTER_USER_SUCCESS } from '../actions';
import { LOGGING_IN, LOGGED_IN} from '../actions/index';

const initialState = {
  loading:false,
  error:null
}

const users = (state = initialState, action) => {
  switch(action.type) {
    case LOGGING_IN:
      return {...state, loading:true, error:null}
    case LOGGED_IN:
      return {...state, loading:false, error:null}
    case REGISTER_USER_SUCCESS:
      return { ...state, loading:false, registered: true };
    default:
      return state
  }
}

export default users;

