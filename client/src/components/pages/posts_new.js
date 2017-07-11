import React , { Component } from 'react';
import * as actions from '../../actions/posts_actions';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class NewPost extends Component {
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
    this.props.createPost(values, () => {
      this.props.history.push('/posts');
    });
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          type="text"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-success">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "Enter a title!";
  }
  if(!values.content) {
    errors.content = "Enter some content please!";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'newform'
})(connect(null, actions)(NewPost));
