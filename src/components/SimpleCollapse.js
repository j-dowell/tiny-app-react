import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button'
import SignInForm from '../components/material/SignInForm'
const styles = theme => ({
  root: {
    height: '1em',
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: 10,
    padding: 10
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
});

class SimpleCollapse extends React.Component {
  state = {
    checked: false,
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    return (
      <div className={classes.root}>
        <Button color="secondary" onClick={this.handleChange}>Sign In</Button>
        <div className={classes.container}>
          <Collapse in={checked}>
            <Paper elevation={4} className={classes.paper}>
              <SignInForm history={this.props.history}/>
            </Paper>
          </Collapse>
        </div>
      </div>
    );
  }
}

SimpleCollapse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCollapse)