import { connect } from 'react-redux'
// import { deleteUrl } from '../actions'
import UrlList from '../components/UrlList'

const mapStateToProps = state => ({
  urls: state.urls
})

const mapDispatchToProps = dispatch => ({
  // deleteUrl: id => dispatch(deleteUrl(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UrlList)
