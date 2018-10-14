import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'

const Url = ({ name, url, id, onDelete, date, shortUrl }) => (
  <div>
    <h3>Created {new Date(date).toLocaleString()}</h3>
    <h2>{name}</h2>
    <h3>{shortUrl}</h3>
  </div>
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
