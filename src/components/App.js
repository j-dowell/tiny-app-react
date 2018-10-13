import React, { Component } from 'react';
import AddNewUrl from './Add';
import UrlListContainer from '../containers/UrlListContainer';
import NavBar from './NavBar';
class App extends Component {
  render() {
    return (
      <div>
        <p>TinyURL</p>
        <NavBar/>
        <AddNewUrl/>
        <UrlListContainer/>
      </div>
    );
  }
}

export default App;
