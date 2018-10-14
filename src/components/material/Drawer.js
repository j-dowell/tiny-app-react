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

const styles = {
  list: {
    width: 250,
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
        <Link to='/urls' style={{textDecoration:'none'}} >
          <Button style={{ width:'100%'}}>Your links</Button>
        </Link>
        <Divider/>
        <Link to='/addurl' style={{textDecoration:'none'}}>
          <Button variant="contained" color="primary" style={{ width:'100%'}}>Shorten a new link</Button>
        </Link>
        <Divider/>
        <SignOut signOutAction={signOutAction}/>
      </div>
    );

    return (
      <div>
        <Button color="primary" onClick={this.toggleDrawer('left', true)}>MENU</Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {/* {sideList} */}
            <NavList/>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);