import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import { addUrl } from '../../actions/addUrl'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import {theme} from '../hoc/theme'


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

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <MuiThemeProvider theme={theme}>
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  </MuiThemeProvider>
);


class AddUrlForm extends Component {
  constructor(props) {
    super(props)
  }

  submit = (values) => { 
    const { url, name } = values;
    this.props.addUrl(url, name, this.props.history);
    this.props.toggle()
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
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div>
          <Field
            name="name"
            component={renderTextField}
            label="Name"
            placeholder="Google"
          />
        </div>
        <div>
          <Field 
            name="url"
            component={renderTextField}
            label="Link"
            placeholder="www.google.com"
          />
        </div>
        <div>
          <Button color="primary" type="submit" disabled={pristine || submitting}>Submit</Button><br/>
          <Button color="secondary" type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
        </div>
      </form>
    );
  }
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error}
}


const reduxFormAddUrl = reduxForm({
  form: 'AddUrlForm',
  validate,
})(AddUrlForm);

export default connect (null, {addUrl})(reduxFormAddUrl)
