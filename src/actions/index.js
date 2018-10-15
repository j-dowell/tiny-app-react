import axios from 'axios';
import {viewUrl, getURLInfo} from './viewUrlInfo'
// let nextUrlId = 0
// export const addUrl = (name, url) => ({
//   type: 'ADD_URL',
//   id: nextUrlId++,
//   name,
//   url,
// })

// export const deleteUrl = (id) => ({
//   type: 'DELETE_URL',
//   id
// })

export const FETCH_URLS_BEGIN   = 'FETCH_URLS_BEGIN';
export const FETCH_URLS_SUCCESS = 'FETCH_URLS_SUCCESS';
export const FETCH_URLS_FAILURE = 'FETCH_URLS_FAILURE';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';

export const loggingIn = () => ({
  type: LOGGING_IN
})
export const loggedIn = () => ({
  type: LOGGED_IN
})
export const fetchUrlsBegin = () => ({
  type: FETCH_URLS_BEGIN
});

export const fetchUrlsSuccess = URLS => ({
  type: FETCH_URLS_SUCCESS,
  payload: { URLS }
});

export const fetchUrlsError = error => ({
  type: FETCH_URLS_FAILURE,
  payload: { error }
});

export function userUrls() {
  let userToken = localStorage.getItem('user');
  console.log(userToken)
  console.log('made it to userUrls action function')
  return function(dispatch) {
    dispatch(fetchUrlsBegin());
    console.log('about to get users urls, with token:', userToken);
    return axios.get(`/api/urlList/${userToken}`)
      .then(response => {
        console.log(response.data.urls);
        dispatch(fetchUrlsSuccess(response.data.urls.reverse()));
        return response.data.urls;
      })
      .then((res) => {
        dispatch(viewUrl(res[0]))
        dispatch(getURLInfo(res[0].shortURL))
      })
  }
}
export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function signInAction({ email, password }, history) {

  return function (dispatch) {
    dispatch(loggingIn());
    return axios.post(`/api/login`, {email, password})
    .then(res => {
      console.log(res);
      if (!res.data.auth) {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid email or password'
        });
      } else {
        localStorage.setItem('user', res.data.token);
      }
    })
    .then(res => {
      dispatch(loggedIn());
      dispatch({ type: AUTHENTICATED });
      console.log(localStorage) 
      history.push('/');
    })
  } 
}

export function verifyUserToken(token) {
  return function(dispatch) {
    return axios.get(`token/${token}`)
    .then(response => {
      console.log(response)
      if (response.data.auth) {
        dispatch({
          type: AUTHENTICATED
        })
        console.log('authorised')
      } else {
        dispatch({
          type: UNAUTHENTICATED
        })
        console.log('unauthorised')
      }
    })
  }
}


export function signOutAction() {
  localStorage.clear();
  console.log(localStorage)
  return {
    type: UNAUTHENTICATED
  }
}

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export function registerUser({email, password, first_name, last_name}, history) {
  return function(dispatch) {
    dispatch(loggingIn());
    return axios.post(`/api/register`, {email, password, first_name, last_name})
    .then(res => {
      if (res.data.user_added) {
        localStorage.setItem('user', res.data.token);
      } else {
        dispatch ({
          type: AUTHENTICATION_ERROR,
          payload: 'Email already exists!'
        })
      }
    })
    .then(res => {
      dispatch(loggedIn());
      dispatch({
        type: AUTHENTICATED
      })
      history.push('/');
    })
  }
}

