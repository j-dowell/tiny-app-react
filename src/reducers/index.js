import { combineReducers } from 'redux';
import urls from './urls';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
  urls,
  form: formReducer,
  auth: authReducer,
  user: userReducer,
})