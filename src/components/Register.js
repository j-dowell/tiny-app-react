import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Required'
  } 
  if (!values.last_name) {
    errors.last_name = 'Required'
  } 
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }  else if (values.password.length < 7) {
    errors.password = 'Password needs to be at least 6 characters'
  }
  return errors
}
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class Register extends Component {
  submit = (values) => {
    console.log(this.props.history)    
    this.props.registerUser(values, this.props.history);
    console.log(this.props.history)
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
                   type="email"
                   label="Email"
                   placeholder="Email"
                   component={renderField}
            />
            <Field name="password" 
                   component="input"
                   type="password"
                   label="Password"
                   placeholder="Password"
                   component={renderField}
            />
            <Field name="first_name" 
                   component="input"
                   type="text"
                   label="First Name"
                   placeholder="John"
                   component={renderField}
            />
            <Field name="last_name" 
                   component="input"
                   type="text"
                   label="Last Name"
                   placeholder="Smith"
                   component={renderField}
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
  form: 'register',
  validate
})(Register);

export default connect(mapStateToProps, {registerUser})(reduxFormSignin);