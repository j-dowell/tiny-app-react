import {randomIdGenerator} from '../helpers/randomIdGenerator'
import {
  FETCH_URLS_BEGIN,
  FETCH_URLS_SUCCESS,
  FETCH_URLS_FAILURE
} from '../actions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const urls = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_URL':
      return [
        ...state,
        {
          id: action.id,
          url: action.url,
          name: action.name,
          shortUrl: randomIdGenerator()
        }
      ]
    case 'DELETE_URL':
      const newState = state.filter(url => url.id !== action.id);
      return newState

    case FETCH_URLS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
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