import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import tinyApp from './reducers'
import Root from './components/Root'
import * as serviceWorker from './serviceWorker';
import reduxThunk from 'redux-thunk';
import { AUTHENTICATED } from './actions';
import logger from 'redux-logger'
// const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
// const store = createStoreWithMiddleware(tinyApp);

const store = createStore(
  tinyApp,
  applyMiddleware(reduxThunk, logger)
)


const user = localStorage.getItem('user');
if(user) {
  console.log('checked')
  store.dispatch({ type: AUTHENTICATED });
}



render(
    <Root store={store} />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
