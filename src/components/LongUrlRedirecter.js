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
    axios.get(`/shortUrl/${this.props.match.params.shortUrl}`)
      .then(result => {
        console.log(result)
        this.setState({loading:false})
        if (result.data.longUrl) {
          window.location = result.data.longUrl;
        } else {
          this.setState({loading: false, invalidUrl:true})
        }
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