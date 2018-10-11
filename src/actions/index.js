import axios from 'axios';

let nextUrlId = 0
export const addUrl = (name, url) => ({
  type: 'ADD_URL',
  id: nextUrlId++,
  name,
  url,
})

export const deleteUrl = (id) => ({
  type: 'DELETE_URL',
  id
})

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function signInAction({ email, password }, history) {

  return function (dispatch) {
    return axios.post(`/api/login`, {email, password})
    .then(res => {
      console.log(res);
      if (!res.data.auth) {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid email or password'
        });
      } else {
        dispatch({ type: AUTHENTICATED });
        localStorage.setItem('user', res.data.token);
        console.log(localStorage)
        history.push('/');
      }
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

export const registerUser = (email, password, first_name, last_name) => ({
  type: 'REGISTER_USER',
  email,
  password,
  first_name,
  last_name
})