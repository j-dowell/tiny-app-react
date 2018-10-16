import React, { Component } from 'react';
import AddNewUrl from '../components/Add';
import UrlListContainer from '../containers/UrlListContainer';
import UrlInfo from '../components/UrlInfo';
import { Link } from 'react-router-dom';
import TemporaryDrawer from '../components/material/Drawer';
import Typography from '@material-ui/core/Typography'
import { signOutAction } from '../actions'
import SignOut from '.././components/SignOut';

const styles = {
  title: {
    textAlign: 'center'
  }
}

class App extends Component {
  render() {
    return (
      <div>
      <TemporaryDrawer/>
        <Typography variant='h1' style={styles.title}>Your Links</Typography>
        <div style={{display:'flex'}}>
          <UrlListContainer/>
          <UrlInfo/>
          <SignOut signOutAction={signOutAction}/>
        </div>
      </div>
    );
  }
}

export default App;
