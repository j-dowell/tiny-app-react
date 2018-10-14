import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'
import Typography from '@material-ui/core/Typography'

const UrlInfo = ({ url }) => (
  <div>
  {url ? ( 
  <div>
    <div>
      <Typography variant="h2">{url.name}</Typography>
      <Typography variant="h3">{url.url}</Typography>
      <Typography variant="h3">Created {new Date(url.date_added).toLocaleString()}</Typography>
      <Typography variant="h3">/{url.shortURL}</Typography>
      <button>Copy</button><button>Share</button><button>Edit</button><button>Delete</button>
    </div>
    <div>
      <Typography>Times clicked:</Typography>
      <Typography>Locations</Typography>
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
