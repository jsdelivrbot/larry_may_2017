import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/posts_actions';
import * as actionsIndex from '../../actions/index';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class EditPost extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getOnePost(id);

    if(this.props.user._id !== this.props.post.author.id) {
      this.props.history.replace(`/posts/${id}`);
    }
    if(this.props.auth) {
      this.props.getUser();
    }
  }

  componentWillReceiveProps ({ user: nextUser, history, match, post, auth}) {

    const {user: currentUser} = this.props;
    const { id } = match.params

    if (!currentUser || nextUser !== currentUser) {
    if (nextUser && (nextUser._id !== post.author.id)) {
      history.replace(`/posts/${id}`);
    }
  }
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
    const {id} = this.props.match.params;

    this.props.updatePost(values, id, () => {
      this.props.history.push(`/posts/${id}`);
    });
  }

  render() {
    const {handleSubmit} = this.props;

    const {id} = this.props.match.params;

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
        <Link to={`/posts/${id}`} className="btn btn-danger">Cancel</Link>
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

function mapStateToProps({ posts, auth, user }, ownProps) {
  return {
    initialValues: posts[ownProps.match.params.id],
    post: posts[ownProps.match.params.id],
    auth: auth.authenticated,
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actions, ...actionsIndex}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  validate,
  form: 'editform'
})(EditPost));
