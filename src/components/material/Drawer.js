import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import SignOut from '../SignOut';
import { signOutAction } from '../../actions';
import NavList from './NavList';
import AddUrlForm from './AddUrlForm'

const styles = {
  list: {
    width: 300,
    textAlign:'center',
    paddingTop:'4em'
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <AddUrlForm toggle={this.toggleDrawer('left', false)}/>
      </div>
    );

    return (
      <div>
        <Button color="primary" onClick={this.toggleDrawer('left', true)}>Add Link</Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
          </div>
            {sideList}
        </Drawer>
      </div>
    );
  }
}

const formContainer = {
  paddingTop: '5em',
  textAlign: 'center'
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);