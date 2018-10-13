import React, { Component } from 'react';
import AddNewUrl from './Add';
import UrlListContainer from '../containers/UrlListContainer';

class App extends Component {
  render() {
    return (
      <div>
        <p>TinyURL</p>
        <AddNewUrl/>
        <UrlListContainer/>
      </div>
    );
  }
}

export default App;
