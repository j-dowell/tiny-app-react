import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import { registerUser } from '../../actions';


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

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class RegisterForm extends Component {
  constructor(props) {
    super(props)
  }

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

        <div className="container">
          <h2>Register</h2>
          <form onSubmit={ handleSubmit(this.submit) }>
            <Field name="email"
                  //  component="input"
                   type="email"
                   label="Email"
                   placeholder="Email"
                   component={renderTextField}
            />
            <Field name="password" 
                  //  component="input"
                   type="password"
                   label="Password"
                   placeholder="Password"
                   component={renderTextField}
            />
            <Field name="first_name" 
                  //  component="input"
                   type="text"
                   label="First Name"
                   placeholder="John"
                   component={renderTextField}
            />
            <Field name="last_name" 
                  //  component="input"
                   type="text"
                   label="Last Name"
                   placeholder="Smith"
                   component={renderTextField}
            />
            <button type="submit" className="blue">Register</button>
          </form>
          {this.errorMessage()}
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
})(RegisterForm);

export default connect(mapStateToProps, {registerUser})(reduxFormSignin);
