import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import { addUrl } from '../../actions/addUrl'
import {theme} from '../hoc/theme'
import { signInAction } from '../../actions'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
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
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class SignInForm extends Component {
  constructor(props) {
    super(props)
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

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div>
        <div>
          <Field name="email" component={renderTextField} label="Email" />
        </div>
          <Field
            name="password"
            component={renderTextField}
            label="Password"
            type="password"
          />
        </div>
        <div>
          <Button color="primary" type="submit" disabled={pristine || submitting}>
            Sign In
          </Button><br/>
          <Button color="secondary" type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </div>
      </form>
    )
  }
}


function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.error,
  };
}



const signIn = reduxForm({
  form: 'SignInForm',
  validate
})(SignInForm)

export default connect(mapStateToProps, {signInAction})(signIn);
