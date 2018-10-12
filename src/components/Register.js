import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions';
import { connect } from 'react-redux';

class Register extends Component {
  submit = (values) => {
    this.props.registerUser(values, this.props.history);
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

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <div className="container">
          <h2>Register</h2>
          <form onSubmit={ handleSubmit(this.submit) }>
            <Field name="email"
                   component="input"
                   type="text"
                   placeholder="Email" 
            />
            <Field name="password" 
                   component="input"
                   type="password"
                   placeholder="Password" 
            />
            <Field name="first_name" 
                   component="input"
                   type="text"
                   placeholder="John" 
            />
            <Field name="last_name" 
                   component="input"
                   type="text"
                   placeholder="Smith" 
            />
            <button type="submit" className="blue">Register</button>
          </form>
          {this.errorMessage()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}


const reduxFormSignin = reduxForm({
  form: 'register'
})(Register);

export default connect(mapStateToProps, {registerUser})(reduxFormSignin);