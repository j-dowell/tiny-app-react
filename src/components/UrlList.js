import React from 'react';
import PropTypes from 'prop-types';
import Url from './Url';

const UrlList = ({ urls }) => (
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
      {urls.map(url =>
        <Url
          key={url.id}
          {...url}
          onDelete={() => deleteUrl(url.id)}
        />
      )}
    </tbody>
  </table>
)

TodoList.PropTypes = {
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