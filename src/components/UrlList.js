import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Url from './Url';
import { userUrls} from '../actions'
import { connect } from 'react-redux'

class UrlList extends Component {
  componentDidMount() {
    console.log('fetching')
    this.props.dispatch(userUrls());
  }

  render() {
    const { error, loading, items } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (

      <table>
    <thead>
      <tr>
        <th>
          Name
        </th>
        <th>
          Link
        </th>
        <th>
          View
        </th>
        <th>
          Delete
        </th>
      </tr>
    </thead>
    <tbody>
      {items.map(item =>
        <Url
          key={item.id}
          {...item}
          // onDelete={() => deleteUrl(item.id)}
          id={item.id}
        />
      )}
    </tbody>
  </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    urls: state.urls,
    items: state.urls.items,
    loading: state.urls.loading,
    error: state.urls.error
  }
}

// const UrlList = ({ urls }) => (
//   <table>
//     <thead>
//       <tr>
//         <th>
//           Name
//         </th>
//         <th>
//           Link
//         </th>
//         <th>
//           View
//         </th>
//         <th>
//           Delete
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {urls.map(url =>
//         <Url
//           key={url.id}
//           {...url}
//           onDelete={() => deleteUrl(url.id)}
//           id={url.id}
//         />
//       )}
//     </tbody>
//   </table>
// )

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

// export default UrlList;