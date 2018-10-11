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

export default connect()(SignOut);