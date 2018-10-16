import React, { Component } from 'react';
import AddNewUrl from '../components/Add';
import UrlListContainer from '../containers/UrlListContainer';
import UrlInfo from '../components/UrlInfo';
import { Link } from 'react-router-dom';
import AddLinkSideBar from '../components/material/Drawer';
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
      <div style={{display:'flex', justifyContent:'center', padding:'3em'}}>
        <AddLinkSideBar/>
        <Typography variant='h1' style={styles.title}>Your Links</Typography>
        <SignOut history={this.props.history}/>
      </div>
        <div style={{display:'flex'}}>
          <UrlListContainer/>
          <UrlInfo/>
        </div>
      </div>
    );
  }
}

export default App;
