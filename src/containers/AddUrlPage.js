import React, { Component } from 'react';
import AddNewUrl from '../components/Add';
import UrlListContainer from '../containers/UrlListContainer';
import UrlInfo from '../components/UrlInfo';
import { Link } from 'react-router-dom';
import Add from '../components/Add';
import TemporaryDrawer from '../components/material/Drawer';

class App extends Component {
  render() {
    return (
      <div>
        <TemporaryDrawer/>      
        <Link to='/urls'>View your links</Link>
        <div style={{display:'flex'}}>
          <Add/>
        </div>
      </div>
    );
  }
}

export default App;
