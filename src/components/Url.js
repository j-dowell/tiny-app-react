import React from 'react'
import PropTypes from 'prop-types'

const Url = ({ name, url, onDelete }) => {
  <tr>
    <td>
      {url}
    </td>
    <td>
      {name}
    </td>
    <td>
      <a href={url} target='_blank'>
      <button>Visit</button></a>
    </td>
    <td>
      <button onClick={onDelete}>Delete</button>
    </td>
  </tr>
}

Url.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Url;