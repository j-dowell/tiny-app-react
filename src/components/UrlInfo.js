import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'
import Typography from '@material-ui/core/Typography'
import {Button} from '@material-ui/core'
import Fade from '@material-ui/core/Fade';

class UrlInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked:false,
    }
  }

  componentWillReceiveProps(nextProps) {
    let x = this.getCountries(nextProps.info)
    console.log(nextProps.info)
    this.setState({countries:x})
  }

  getCountries = (list) => {
    function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
    }  
    let countries = [];
    list.forEach(item => countries.push(item.country))
    let uniqueCountries = countries.filter(onlyUnique);
    return uniqueCountries
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

  

    const { url, info, isLoading } = this.props;
    return (
      <div>
        {!isLoading ? ( 
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
              <Typography>Copied to clipboard!</Typography>
            </Fade>
            <Typography>Times clicked:{info.length}</Typography>
            <ul>Locations: 
              {this.state.countries.map(x => <li key={x}>{x}</li>)}
            </ul>
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
    url: state.urls.selectedUrl,
    info: state.urls.url_info,
    isLoading: state.urls.loading_info
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
