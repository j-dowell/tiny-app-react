import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { viewUrl } from '../../actions/viewUrlInfo'
import { connect } from 'react-redux'
import theme from '../hoc/theme';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
  },
});

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
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function UrlMaterialList(props) {
  const { classes, name, date, item } = props;
  const dateObject = new Date(date)
  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const dateConverted = `${ordinal_suffix_of(day)} ${monthNames[month]}`;

  return (
    <div >
      <List component="nav">
        <ListItem button onClick={() => props.dispatch(viewUrl(item))}>
          <ListItemText primary={name} secondary={dateConverted}/><br/>
        </ListItem>
      </List>
    </div>
  );
}

UrlMaterialList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    urls: state.urls
  }
}

export default connect(mapStateToProps)(withStyles(styles)(UrlMaterialList));
