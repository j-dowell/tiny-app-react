import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

const viewButton = {
  color: '#e57373',
}

const addButton = {
  color: '#e57373',
}
class App extends Component {
  render() {
    return (
      <div style={container}>
        <Typography variant="h1" color="primary" style={{textAlign:'center'}}>TinyURL</Typography>
        <div style={buttons}>
          <Link to='urls' style={linkStyle}><Button style={viewButton}>View Links</Button></Link>
        </div>
      </div>
    )
  }
}

export default App;
