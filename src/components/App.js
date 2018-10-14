import React, { Component } from 'react';
import AddNewUrl from './Add';
import UrlListContainer from '../containers/UrlListContainer';
import NavBar from './NavBar';
import UrlInfo from './UrlInfo';
import { Link } from 'react-router-dom';
import TemporaryDrawer from './material/Drawer';

class App extends Component {
  render() {
    return (
      <div>
        <h1 style={{textAlign:'center'}}>TinyURL</h1>
        <NavBar/>
        <TemporaryDrawer/>
        {/* <NavBar/>
        <AddNewUrl/>
        <div style={{display:'flex'}}>
          <UrlListContainer/>
          <UrlInfo/>
        </div> */}
      </div>
    );
  }
}

export default App;
