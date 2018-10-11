import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './NavBar';
import SignIn from './SignIn';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/" component={NavBar} />
      </Switch>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root