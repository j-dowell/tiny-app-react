import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './NavBar';
import SignIn from './SignIn';
import App from './App';
import requireAuth from './hoc/require_auth';
import noRequireAuth from './hoc/no_require_auth';
import { connect } from 'react-redux'
import Register from './Register';
import UrlPageContainer from '../containers/UrlPageContainer';
import AddNewUrl from './Add';
import AddUrlPage from '../containers/AddUrlPage';
import Redirecter from './LongUrlRedirecter';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/signin" component={noRequireAuth(SignIn)} />
        <Route exact path="/register" component={noRequireAuth(Register)}/>
        <Route exact path="/urls" component={requireAuth(UrlPageContainer)} />
        <Route exact path='/addurl' component={requireAuth(AddUrlPage)} />
        <Route exact path="/" component={noRequireAuth(App)} />
        <Route path="/:shortURL" component={Redirecter}/>
      </Switch>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default connect()(Root)