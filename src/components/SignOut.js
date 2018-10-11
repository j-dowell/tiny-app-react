import React, { Component } from 'react';
import { signOutAction } from '../actions';
import { connect } from 'react-redux';

const SignOut = ({ dispatch }) => {
    return (
      <div>
        <button onClick={() => dispatch(signOutAction())}>Sign Out</button>
      </div>
    );
}
// class SignOut extends Component {
//   submit = () => {
//     this.props.signOutAction();
//   }

//   render() {
//     return (
//       <div>
//         <button onSubmit={() => this.props.signOutAction()}>Sign Out</button>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return { authenticated: state.auth.authenticated };
// }

export default connect()(SignOut);
// export default connect(mapStateToProps, {signOutAction})(SignOut);