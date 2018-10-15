import axios from 'axios';
export const VIEW_URL = 'VIEW_URL'
export const GET_URL_INFO_BEGIN   = 'GET_URL_INFO_BEGIN';
export const GET_URL_INFO_SUCCESS   = 'GET_URL_INFO_SUCCESS';

export const viewUrl = (url) => ({
  type: VIEW_URL,
  payload: {
    url
  }
});

export const getURLInfoBegin = () => ({
  type: GET_URL_INFO_BEGIN,
})

export const getURLInfoSuccess = (info) => ({
  type: GET_URL_INFO_SUCCESS,
  payload: {
    info
  }
})

export function getURLInfo(shortURL) {
  return function(dispatch) {
    dispatch(getURLInfoBegin())
    return axios.get(`/api/${shortURL}/clickinfo`)
      .then(res => {
        console.log('res', res.data)
        dispatch(getURLInfoSuccess(res.data))
      })
  }
}