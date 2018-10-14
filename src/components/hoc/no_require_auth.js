import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    componentWillMount() {
      if (this.props.authenticated && !this.props.userLoading) {
        // this.props.history.push('/urls');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated && !nextProps.userLoading) {
        // this.props.history.push('/urls');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { 
      authenticated: state.auth.authenticated,
      userLoading: state.users.loading
    };
  }

  return connect(mapStateToProps)(NotAuthentication);
}