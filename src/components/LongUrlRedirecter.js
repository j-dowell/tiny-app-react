import React, { Component } from 'react';
import axios from 'axios';

class Redirecter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true
    }
  }
  componentWillMount() {
    const shortURL = this.props.match.params.shortURL;
    axios.get(`http://ip-api.com/json`)
      .then(response => {
        console.log(response.data.country)
        const country = response.data.country
        return axios.post(`/shortURL/clickinfo`, {shortURL, country})
        .then(() => {
          return axios.get(`/shortURL/${this.props.match.params.shortURL}`)
          .then(result => {
            this.setState({loading:false})
            if (result.data.longURL) {
              window.location = result.data.longURL;
            } else {
              this.setState({loading: false, invalidUrl:true})
            }
          })
        })
      })
    }
  render() {
    return (
      <div>
        {this.state.loading && <p>Loading</p>}
        {this.state.invalidUrl && <p>Invalid url</p>}
      </div>
    )
  }
}

export default Redirecter