import React , { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/comments_actions';
import * as actionsPosts from '../../actions/posts_actions';


class NewComment extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getOnePost(id);
  }

  renderField(field) {
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label><strong>{field.label}</strong></label>
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
    const {id} = this.props.match.params;

    this.props.postComments(values, id, () => {
      this.props.history.push(`/posts/${id}`);
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div> Loading... </div>;
    }

    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label={`Comment for post: ${post.title}`}
          name="comment"
          type="text"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-success">Comment</button>
        <Link to={`/posts/${post._id}`} className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.comment) {
    errors.comment = "Enter a comment!";
  }

  return errors;
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actions, ...actionsPosts}, dispatch);
}

export default reduxForm({
  validate,
  form: 'comments_new'
})(connect(mapStateToProps, mapDispatchToProps)(NewComment));
