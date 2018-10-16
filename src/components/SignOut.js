import React, { Component } from 'react';
import { signOutAction } from '../actions';
import { connect } from 'react-redux';

class SignOut extends Component {
  click = () => {
    this.props.click(this.props.history)
  }
  render() {
    return (
      <div>
        <button onClick={() => this.click()}>Sign Out</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return({
      click: (x) => {dispatch(signOutAction(x))}
  })
}


// const SignOut = ({ dispatch, props  }) => {
//     return (
//       <div>
//         <button onClick={() => dispatch(signOutAction(props.history))}>Sign Out</button>
//       </div>
//     );
// }

export default connect(null, mapDispatchToProps)(SignOut);