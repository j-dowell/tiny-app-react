import React, { Component } from 'react';
import AddNewUrl from '../components/Add';
import UrlListContainer from '../containers/UrlListContainer';
import UrlInfo from '../components/UrlInfo';
import { Link } from 'react-router-dom';
import TemporaryDrawer from '../components/material/Drawer';

class App extends Component {
  render() {
    return (
      <div>
      <TemporaryDrawer/>
        <h1 style={{textAlign:'center'}}>Your links</h1>
        <Link to='/addurl'>Shorten a new link</Link>
        <div style={{display:'flex'}}>
          <UrlListContainer/>
          <UrlInfo/>
        </div>
      </div>
    );
  }
}

export default App;
