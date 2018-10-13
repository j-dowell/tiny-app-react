import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { addUrl } from '../actions/addUrl'
import { connect } from 'react-redux';

const validate = values => {
  const errors = {}
  if (!values.url) {
    errors.url = 'Required'
  } else if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(values.url)) {
    errors.url = 'Invalid url'
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

class AddNewUrl extends Component {
  submit = (values) => { 
    const { url, name } = values;
    this.props.addUrl(url, name);
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
          <h2>Add URL</h2>
          <form onSubmit={ handleSubmit(this.submit) }>
            <Field name="url"
                  //  component="input"
                   type="text"
                   label="url"
                   placeholder="URL"
                   component={renderField}
            />
            <Field name="name" 
                  //  component="input"
                   type="text"
                   label="name"
                   placeholder="name"
                   component={renderField}
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
  form: 'register',
  validate
})(AddNewUrl);

export default connect(mapStateToProps, {addUrl})(reduxFormSignin);