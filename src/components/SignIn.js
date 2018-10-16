import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { signInAction } from '../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SignInForm from '../components/material/SignInForm'
import Collapse from '@material-ui/core/Collapse';
import SimpleCollapse from './SimpleCollapse';

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
    const { handleSubmit } = this.props;
    return (
      <div style={container}>
      <Typography variant="h1" color="primary" style={{textAlign:'center'}}>TinyURL</Typography>
      {/* <Button direction="left" onClick={this.signInCollapse}>Sign In</Button> */}
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