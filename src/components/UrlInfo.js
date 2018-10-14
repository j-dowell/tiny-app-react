import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'
import Typography from '@material-ui/core/Typography'
import {Button} from '@material-ui/core'
import SimpleFade from '../components/material/Fade'
import Fade from '@material-ui/core/Fade';

class UrlInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked:false,
    }
  }
  
  render() {
    const copyToClipboard = str => {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.setState({clicked:true})
      setTimeout(() => {
        this.setState({clicked: false});
      }, 1000)
    };

    const { url } = this.props;

    return (
      <div>
        {url ? ( 
        <div>
          <div>
            <Typography variant="h3">{url.name}</Typography>
            <Typography variant="h4">{url.url}</Typography>
            <Typography variant="h4">Created {new Date(url.date_added).toLocaleString()}</Typography>
            <Typography variant="h4">/{url.shortURL}</Typography>
            <Button onClick={() => copyToClipboard(url.shortURL)}>Copy</Button>
            <Button>Share</Button>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
          <div>
          <br/>
            <Fade
              in={this.state.clicked}
              timeout={1000}
            >
              <p>Copied to clipboard!</p>
            </Fade>
            <Typography>Times clicked:</Typography>
            <Typography>Locations</Typography>
          </div>
        </div>) : (<p>click</p>)}
      </div>
    )
  }
}



// const UrlInfo = ({ url }) => (
  
// )

const mapStateToProps = state => {
  return {
    url: state.urls.selectedUrl
  }
}

// const mapDispatchToProps = dispatch => {
//   // return {
//   //   onDelete: (id) =>
//   //     dispatch(deleteUrl(id))
//   // }
// }

export default connect(
  mapStateToProps
)(UrlInfo)
