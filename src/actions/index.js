let nextUrlId = 0
export const addUrl = (url) => ({
  type: 'ADD_URL',
  id: nextUrlId++,
  url,
})

export const deleteUrl = (id) => ({
  type: 'DELETE_URL',
  id
})