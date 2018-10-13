import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'

const Url = ({ name, url, id, onDelete, date }) => (
  <tr>
    <td>
      { name }
    </td>
    <td>
      {url}
    </td>
    <td>
      {new Date(date).toLocaleString()}
    </td>
    <td>
      <a href={url} target='_blank' rel="noopener noreferrer">
      <button>Visit</button></a>
    </td>
    {/* <td>
      <button onClick={() => onDelete(id)}>Delete</button>
    </td> */}
  </tr>
)

Url.propTypes = {
  url: PropTypes.string.isRequired,
}
const mapStateToProps = state => {
  return {
    urls: state.urls
  }
}

// const mapDispatchToProps = dispatch => {
//   // return {
//   //   onDelete: (id) =>
//   //     dispatch(deleteUrl(id))
//   // }
// }

export default connect(
  mapStateToProps
)(Url)
