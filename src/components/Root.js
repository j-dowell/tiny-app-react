import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './NavBar';
import SignIn from './SignIn';
import App from './App';
import requireAuth from './hoc/require_auth';
import noRequireAuth from './hoc/no_require_auth';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/signin" component={noRequireAuth(SignIn)} />
        <Route path="/urls" component={requireAuth(App)} />
        <Route exact path="/" component={requireAuth(NavBar)} />
      </Switch>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root