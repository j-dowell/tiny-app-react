nextUrlId = 0
export const addUrl = (url, name) => ({
  type: 'ADD_URL',
  id: nextUrlId++,
  url,
  name
})

export const deleteUrl = (id) => ({
  type: 'DELETE_URL',
  id
})