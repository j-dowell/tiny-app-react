import { combineReducers } from 'redux';
import urls from './urls';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  urls,
  form: formReducer,
  auth: authReducer
})