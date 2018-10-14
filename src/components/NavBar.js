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
        <Link to='/urls'>View your links</Link>
        <Link to='/addurl'>Shorten a new link</Link>
        <SignOut signOutAction={signOutAction}/>
      </React.Fragment>
      ];
    }
    return [
      <li key="signin"><Link to="/signin">Sign in</Link></li>,
      <li key="register"><Link to="/register">Register</Link></li>
    ];
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">
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
