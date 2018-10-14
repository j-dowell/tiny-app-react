import React, { Component } from 'react';
import AddNewUrl from './Add';
import UrlListContainer from '../containers/UrlListContainer';
import NavBar from './NavBar';
import UrlInfo from './UrlInfo';
import { Link } from 'react-router-dom';
import TemporaryDrawer from './material/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const container = {
  display: 'flex',
  alignItems: "center",
  height: '-webkit-fill-available',
}

const buttons = {
  display: 'flex',
  justifyContent: 'spaceEvenly'
}

const linkStyle = {
  textDecoration: 'none'
}
class App extends Component {
  render() {
    return (
      <div style={container}>
        <Typography variant="h1" color="primary" style={{textAlign:'center'}}>TinyURL</Typography>
        <div style={buttons}>
          <Link to='urls' style={linkStyle}><Button>View Links</Button></Link>
          <Link to='addurl' style={linkStyle}><Button>Add Link</Button></Link>
        </div>
      </div>
    )
  }
}

export default App;
