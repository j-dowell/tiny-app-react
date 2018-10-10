import React, { Component } from 'react';
import AddUrl from '../containers/AddUrl';
import UrlListContainer from '../containers/UrlListContainer';

class App extends Component {
  render() {
    return (
      <div>
        <p>TinyURL</p>
        <AddUrl/>
        <UrlListContainer/>
      </div>
    );
  }
}

export default App;
