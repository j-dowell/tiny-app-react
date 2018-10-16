import React, { Component } from 'react';
import { signOutAction } from '../actions';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'

class SignOut extends Component {
  click = () => {
    this.props.click(this.props.history)
  }
  render() {
    return (
      <div>
        <Button style={{paddingTop:'1em'}} color="secondary" onClick={() => this.click()}>Sign Out</Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return({
      click: (x) => {dispatch(signOutAction(x))}
  })
}


export default connect(null, mapDispatchToProps)(SignOut);