import React from 'react';
import PropTypes from 'prop-types';
import Url from './Url';
import {deleteUrl} from '../actions/index'
const UrlList = ({ urls }) => (
  <table>
    <thead>
      <tr>
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
      {urls.map(url =>
        <Url
          key={url.id}
          {...url}
          onDelete={() => deleteUrl(url.id)}
          id={url.id}
        />
      )}
    </tbody>
  </table>
)

UrlList.PropTypes = {
  urls: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteUrl: PropTypes.func.isRequired
}

export default UrlList;