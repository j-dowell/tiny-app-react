import {
  FETCH_URLS_BEGIN,
  FETCH_URLS_SUCCESS,
  FETCH_URLS_FAILURE,
} from '../actions';
import { ADD_URL_BEGIN, ADD_URL_SUCCESS, ADD_URL_FAILURE } from '../actions/addUrl';
import { GET_URL_INFO_BEGIN, GET_URL_INFO_SUCCESS } from '../actions/viewUrlInfo'
import { VIEW_URL } from '../actions/viewUrlInfo';
const initialState = {
  items: [],
  loading: false,
  error: null,
  url_info: [],
  loading_info: true,
};

const urls = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_URL:
      return {
        ...state,
        loading_info:true,
        selectedUrl: action.payload.url
      }
    case GET_URL_INFO_BEGIN:
      return {
        ...state,
        loading_info:true,
        error:null
      }
    case GET_URL_INFO_SUCCESS:
      return {
        ...state,
        loading_info:false,
        error:null,
        url_info: action.payload.info
      }
    case ADD_URL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_URL_SUCCESS:
      return {
        ...state,
        loading:false,
        error: null
      }
    case FETCH_URLS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        loading_info:true,
        error: null
      };

    case FETCH_URLS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.URLS
      };

    case FETCH_URLS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      return state;
  }
}

export default urls