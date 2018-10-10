const urls = (state = [], action) => {
  switch (action.type) {
    case 'ADD_URL':
      return [
        ...state,
        {
          id: action.id,
          url: action.url,
        }
      ]
    case 'DELETE_URL':
      const newState = state.filter(url => url.id !== action.id);
      return newState
    default:
      return state;
  }
}

export default urls