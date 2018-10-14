import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'

const UrlInfo = ({ url }) => (
  <div>
  {url ? ( 
  <div>
    <div>
      <h1>{url.name}</h1>
      <h3>{url.url}</h3>
      <h3>Created {new Date(url.date_added).toLocaleString()}</h3>
      <h3>/{url.shortURL}</h3>
      <button>Copy</button><button>Share</button><button>Edit</button><button>Delete</button>
    </div>
    <div>
      <p>Times clicked:</p>
      <p>Locations</p>
    </div>
  </div>) : (<p>click</p>)}
  </div>
)

const mapStateToProps = state => {
  return {
    url: state.urls.selectedUrl
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
)(UrlInfo)
