import axios from 'axios';
export const ADD_URL_BEGIN   = 'ADD_URL_BEGIN';
export const ADD_URL_SUCCESS = 'ADD_URL_SUCCESS';
export const ADD_URL_FAILURE = 'FETCH_URLS_FAILURE';

export const addUrlBegin = (name, url) => ({
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

export function addUrl(newUrl, url) {
  console.log('Trying to add URL')
  return function(dispatch) {
    dispatch(addUrlBegin(newUrl, url));
    return axios.post(`/api/addUrl`, {newUrl, url})
      .then(res => {
        console.log(res)
        dispatch(addUrlSuccess);
      })
  }
}