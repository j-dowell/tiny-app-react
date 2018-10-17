import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {deleteUrl} from '../actions'
import Typography from '@material-ui/core/Typography'
import {Button} from '@material-ui/core'
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grow from '@material-ui/core/Grow'
import Divider from '@material-ui/core/Divider';
import ordinalSuffixOf from '../helpers/ordinalSuffixOf'

class UrlInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked:false,
    }
  }

  componentDidMount() {
    let countries = this.getCountries(this.props.info)
    console.log(this.props.info)
    this.setState({countries})
  }

  componentWillReceiveProps(nextProps) {
    let countries = this.getCountries(nextProps.info)
    console.log(nextProps.info)
    this.setState({countries})
  }

  getCountries = (clickInfoObject) => {
    function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
    }  
    let countries = [];
    clickInfoObject.forEach(object => countries.push(object.country))
    let uniqueCountries = countries.filter(onlyUnique);
    return uniqueCountries;
  }

  convertDate = (input) => {
    const longMonthNames = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
    const dateObject = new Date(input)
    const day = dateObject.getDate();
    const month = dateObject.getMonth();
    const dateConverted = `${ordinalSuffixOf(day)} ${longMonthNames[month]}`;
    return dateConverted
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

    const { url, info, isLoading, loading } = this.props;


    return (
      <div>
        {!isLoading && !loading && this.state.countries ? (
          <Grow in={true}
        {...(true ? { timeout: 1000 } : {})}>
        <div style={{paddingLeft:'1em'}}>
          <div>
            <Typography variant="h4">{url.name}</Typography>
            <Divider/>
            <Typography variant="h5">{url.url}</Typography>
            <Typography variant="h5">{this.convertDate(url.date_added)}</Typography>
            <Typography style={{display:'inline'}}variant="h5">tinyURL/</Typography><Typography style={{display:'inline'}} variant="h4" color="primary">{url.shortURL}</Typography>
            <div style={buttonContainer}>
              <Button onClick={() => copyToClipboard(url.shortURL)}>Copy</Button>
              <Button>Share</Button>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          </div>
          <div>
            <Fade
              in={this.state.clicked}
              timeout={1000}
            >
              <Typography color="secondary" style={{paddingBottom:'1em', paddingLeft:"1em"}}>Copied to clipboard!</Typography>
            </Fade>
            <Typography variant="h4">Statistics</Typography>
            <Divider/>
            <Typography variant="h5">Clicks: {info.length}</Typography>
            <Typography variant="h5">Countries:</Typography>
            <List>
              {this.state.countries.map(x => {
                return (
                  <ListItem key={x}>
                    <ListItemText>{x}</ListItemText>
                  </ListItem>
                )
              })}
            </List>
          </div>
        </div>
        </Grow>) : (
          <div style={styles.wrap}>
            <div style={styles.plus}>
              <CircularProgress size={50} />
            </div>
          </div>
          )}
      </div>
    )
  }
}
const styles = {
  loading: {
    display:'flex',
    alignItems:'center',
    justifyItem:'center'
  },
  wrap: {
    position: 'fixed',
    width: '60%',
    height:'10%',
    display: 'flex',
    alignItems: 'center',
    top: '25%',
    },
    plus: {
      display: 'flex', 
      margin: '0 auto'
    }
  }

const buttonContainer = {
  paddingTop: '2em'
}

const mapStateToProps = state => {
  return {
    url: state.urls.selectedUrl,
    info: state.urls.url_info,
    isLoading: state.urls.loading_info,
    loading: state.urls.loading
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
