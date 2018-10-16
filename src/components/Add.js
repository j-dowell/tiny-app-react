import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { addUrl } from '../actions/addUrl'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i

const validate = values => {
  const errors = {}
  if (!values.url) {
    errors.url = 'Required'
  } else if (!urlRegex.test(values.url)) {
    errors.url = 'Invalid url'
  }
  if(!values.name) {
    errors.name = "Required"
  } 
  return errors
}
const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class AddNewUrl extends Component {
  submit = (values) => { 
    const { url, name } = values;
    this.props.addUrl(url, name, this.props.history);
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
          <form onSubmit={ handleSubmit(this.submit) }>
            <Field name="name" 
                   type="text"
                   label="Name"
                   placeholder="Google"
                   component={renderField}
            />
            <Field name="url"
              type="text"
              label="Link"
              placeholder="www.google.com"
              component={renderField}
            />
             <TextField
          id="standard-name"
          label="Name"
              component={renderField}

          margin="normal"
        />
            <button type="submit" className="blue">Add</button>
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
  form: 'addUrl',
  validate
})(AddNewUrl);

export default connect(mapStateToProps, {addUrl})(reduxFormSignin);