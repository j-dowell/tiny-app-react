import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'
import Typography from '@material-ui/core/Typography'

class Url extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    function ordinal_suffix_of(i) {
      var j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return i + "st";
      }
      if (j == 2 && k != 12) {
          return i + "nd";
      }
      if (j == 3 && k != 13) {
          return i + "rd";
      }
      return i + "th";
  }
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

  const { name, date } = this.props;
  const dateObject = new Date(date)
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const dateConverted = `${monthNames[month]} ${day}`;
  
    return (
      <div>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="h5">{dateConverted}</Typography>
      </div>
    )
  }
}

// const Url = ({ name, url, id, onDelete, date, shortUrl }) => (
//   <div>
//     <Typography variant="h4">{name}</Typography>
//     <Typography variant="h5">{new Date(date).toLocaleString()}</Typography>
//   </div>
// )

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
