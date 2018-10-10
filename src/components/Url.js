import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {deleteUrl} from '../actions'

const Url = ({ url, id, onDelete }) => (
  <tr>
    <td>
      {url}
    </td>
    <td>
      <a href={url} target='_blank'>
      <button>Visit</button></a>
    </td>
    <td>
      <button onClick={() => onDelete(id)}>Delete</button>
    </td>
  </tr>
)

Url.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
}
const mapStateToProps = state => {
  return {
    urls: state.urls
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: (id) =>
      dispatch(deleteUrl(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Url)
// export default Url;