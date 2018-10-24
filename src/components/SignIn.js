import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { signInAction } from '../actions';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import SimpleCollapse from './SimpleCollapse';

const container = {
  display: 'flex',
  alignItems: "center",
  height: '-webkit-fill-available',
}

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false
    }
  }
  submit = (values) => {
    this.props.signInAction(values, this.props.history);
  }

  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  signInCollapse = () => {
    this.setState({
      checked: true
    })
  }

  render() {
    return (
      <div style={container}>
      <Typography variant="h1" color="primary" style={{textAlign:'center'}}>TinyURL</Typography>
      <SimpleCollapse history={this.props.history}/>
    </div>

    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}


const reduxFormSignin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, {signInAction})(reduxFormSignin);