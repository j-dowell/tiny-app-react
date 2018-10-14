import React, { Component } from 'react';
import AddNewUrl from './Add';
import UrlListContainer from '../containers/UrlListContainer';
import NavBar from './NavBar';
import UrlInfo from './UrlInfo';
class App extends Component {
  render() {
    return (
      <div>
        <h1>TinyURL</h1>
        <NavBar/>
        <AddNewUrl/>
        <div style={{display:'flex'}}>
          <UrlListContainer/>
          <UrlInfo/>
        </div>
      </div>
    );
  }
}

export default App;
