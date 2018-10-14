import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

export default function (ComposedComponent) {
  const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green,
    },
    status: {
      danger: 'orange',
    },
  });
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
      return (
        <MuiThemeProvider theme={theme}>
          <ComposedComponent {...this.props} />;
        </MuiThemeProvider>
      )
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