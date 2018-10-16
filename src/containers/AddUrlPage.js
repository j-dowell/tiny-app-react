import React, { Component } from 'react';
import AddNewUrl from '../components/Add';
import UrlListContainer from '../containers/UrlListContainer';
import UrlInfo from '../components/UrlInfo';
import { Link } from 'react-router-dom';
import Add from '../components/Add';
import TemporaryDrawer from '../components/material/Drawer';
import Typography from '@material-ui/core/Typography'
import AddUrlForm from '../components/material/AddUrlForm'
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
        <Typography variant='h1' style={styles.title}>Add Link</Typography>
        <div style={{display:'flex'}}>
          {/* <Add history={this.props.history}/> */}
          <AddUrlForm history={this.props.history}/>
        </div>
      </div>
    );
  }
}

export default App;
