const urls = (state = [], action) => {
  switch (action.type) {
    case 'ADD_URL':
      return [
        ...state,
        {
          id: action.id,
          url: action.url,
          name: action.name
        }
      ]
    case 'DELETE_URL':
      return state.filter(url => url.id !== action.id);
    default:
      return state;
  }
}

export default urls