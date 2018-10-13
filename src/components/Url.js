import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'

const Url = ({ name, url, id, onDelete }) => (
  <tr>
    <td>
      { name }
    </td>
    <td>
      {url}
    </td>
    <td>
      <a href={url} target='_blank'>
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
