import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/signin');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return (
        <div>
          {this.props.authenticated ? 
            <ComposedComponent {...this.props} />
          :
            <p>unauthorized</p>}
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}