import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';
import { signOutAction } from '../actions';

class Navbar extends Component {
  navbarLinks() {
    if (this.props.authenticated) {
      return [
      <React.Fragment key="container">
          <Link to="/urls">Urls</Link><br/>
          <SignOut signOutAction={signOutAction}/>
        </React.Fragment>
      ];
    }
    return [
      <li key="signin"><Link to="/signin">Sign in</Link></li>,
      <li key="signup"><Link to="/signup">Sign up</Link></li>
    ];
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <Link to="/"><span className="brand">Home</span></Link>
          <ul>
            {this.navbarLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navbar);
