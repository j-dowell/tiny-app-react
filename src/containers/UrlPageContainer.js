import React, { Component } from 'react';
import AddNewUrl from '../components/Add';
import UrlListContainer from '../containers/UrlListContainer';
import UrlInfo from '../components/UrlInfo';
import { Link } from 'react-router-dom';
import TemporaryDrawer from '../components/material/Drawer';
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow';
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { userUrls } from '../actions'

const styles = {
  title: {
    textAlign: 'center'
  }
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(userUrls());
  }
  render() {
    return (
      <div>
      <TemporaryDrawer/>
        <Typography variant='h1' style={styles.title}>Your Links</Typography>
        {this.props.isLoading ? (
          <CircularProgress size={50} />          
        ) : (
          <div style={{display:'flex'}}>
            <UrlListContainer/>
            <UrlInfo/>
          </div>
        )}
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.urls.selectedUrl,
    info: state.urls.url_info,
    isLoading: state.urls.loading_info,
  }
}

export default connect(mapStateToProps)(App);
