import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {withRouter} from 'react-router';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  renderField(field) {
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label><strong>{field.label}:</strong></label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
        <div className="text-help">
          { touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.signinUser(values, () => {
      this.props.getUser();
      this.props.history.push('/posts');
    });
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          label="Email"
          name="email"
          type="email"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-success">Sign In</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  //Validate the inputs from values
  if(!values.email) {
    errors.email = "Enter an email!";
  }
  if(!values.password) {
    errors.password = "Enter a password!";
  }
  //If errors is empty, the form is fine to submit
  //If errors has any properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  validate,
  form: 'signin'
})(connect(mapStateToProps, actions)(withRouter(Signin)));
