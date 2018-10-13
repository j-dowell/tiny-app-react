import axios from 'axios';
import {userUrls} from './index'
export const ADD_URL_BEGIN   = 'ADD_URL_BEGIN';
export const ADD_URL_SUCCESS = 'ADD_URL_SUCCESS';
export const ADD_URL_FAILURE = 'FETCH_URLS_FAILURE';
export const addUrlBegin = (url, name) => ({
  type: ADD_URL_BEGIN,
  payload: {
    name,
    url,
  }
});

export const addUrlSuccess = () => ({
  type: ADD_URL_SUCCESS,
});

export const addUrlError = error => ({
  type: ADD_URL_FAILURE,
  payload: { error }
});

export function addUrl(newUrl, name) {
  console.log('Trying to add URL')
  return function(dispatch) {
    dispatch(addUrlBegin(newUrl, name));
    return axios.post(`/api/addUrl`, {newUrl, name})
      .then(json => {
        console.log('posted url', json)
        dispatch(addUrlSuccess());
        dispatch(userUrls());
      })
  }
}