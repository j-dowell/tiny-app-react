import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Url from './Url';
import { userUrls } from '../actions'
import { viewUrl } from '../actions/viewUrlInfo'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import UrlMaterialList from '../components/material/UrlMaterialList'
import Grow from '@material-ui/core/Grow'
const singleUrlContainer = {

}

const urlListContainer = {
  overflow: 'scroll',
  height: '-webkit-fill-available',
  width:'20%'
}

class UrlList extends Component {
  componentDidMount() {
    console.log('fetching')
    // this.props.dispatch(userUrls());
  }

  render() {
    const { error, loading, items, usersLoading, loading_info } = this.props;
    const httpRegex = /^(http:|https:)/;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading || usersLoading ) {
      return <div></div>;
    }

    return (
      <React.Fragment>
          <div style={urlListContainer}>
        {items ? (
          <React.Fragment>
          {items.map(item =>
            <Grow in={true}
            {...{ timeout: 2000 }}
            >
              <div key={item.shortURL} style={singleUrlContainer}>
                <UrlMaterialList
                  name={item.name}
                  date={item.date_added}
                  shortUrl={item.shortURL}
                  url={(httpRegex.test(item.url)) ? (item.url) : ('https://' + item.url) }
                  // onDelete={() => deleteUrl(item.id)}
                  id={item.id}
                  item={item}
                />
                </div>
              </Grow>
          )}
            </React.Fragment>
        ) : (<p>Make a short url!</p>)}
          </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    urls: state.urls,
    items: state.urls.items,
    loading: state.urls.loading,
    error: state.urls.error,
    usersLoading: state.users.loading,
    loading_info: state.urls.loading_info
  }
}

// UrlList.PropTypes = {
//   urls: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//       url: PropTypes.string.isRequired,
//     }).isRequired
//   ).isRequired,
//   deleteUrl: PropTypes.func.isRequired
// }
export default connect(
  mapStateToProps,
)(UrlList)

