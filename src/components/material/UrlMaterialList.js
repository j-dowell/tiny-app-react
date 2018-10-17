import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { viewUrl, getURLInfo } from '../../actions/viewUrlInfo'
import { connect } from 'react-redux'
import theme from '../hoc/theme';
import ordinalSuffixOf from '../../helpers/ordinalSuffixOf'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
  },
});


const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


class UrlMaterialList extends Component {
  constructor(props) {
    super(props);
  }

  click = (item) => {
    this.props.viewLink(item)
    this.props.getInfo(item);
  }

  render() {
    const { classes, name, date, item } = this.props;
    const dateObject = new Date(date)
    const day = dateObject.getDate();
    const month = dateObject.getMonth();
    const dateConverted = `${ordinalSuffixOf(day)} ${monthNames[month]}`;

    return ( 
      <div >
        <List  style={{padding:0}} component="nav">
          <ListItem button onClick={() => this.click(item)}>
            <ListItemText primary={name} secondary={dateConverted}/><br/>
          </ListItem>
        </List>
      </div>
    )
  }
}


UrlMaterialList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    urls: state.urls
  }
}

function mapDispatchToProps(dispatch) {
  return({
      viewLink: (item) => {dispatch(viewUrl(item))},
      getInfo: (item) => {dispatch(getURLInfo(item.shortURL))}
  })
}


// const mapDispatchToProps = 

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UrlMaterialList));
