import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddUrlForm from './AddUrlForm'


const styles = {
  list: {
    width: 500,
    height:250,
    textAlign:'center',
    paddingTop:'4em'
  },
  fullList: {
    width: 'auto',
  },
};

class AddLinkSideBar extends React.Component {
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
        <AddUrlForm toggle={this.toggleDrawer('top', false)}/>
      </div>
    );

    return (
      <React.Fragment>
        <span><Button style={{paddingTop:'1em'}} color="primary" onClick={this.toggleDrawer('top', true)}>Add Link</Button></span>
        <div>
          <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('top', false)}
              onKeyDown={this.toggleDrawer('top', false)}
            >
            </div>
              {sideList}
          </Drawer>
        </div>
      </React.Fragment>
    );
  }
}

const formContainer = {
  paddingTop: '5em',
  textAlign: 'center'
}

AddLinkSideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddLinkSideBar);