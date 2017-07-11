import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as actions from '../../actions/posts_actions';
import * as actionsIndex from '../../actions/index';
import * as actionsComments from '../../actions/comments_actions';

class ShowPosts extends Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    const {id} = this.props.match.params;

    this.props.getOnePost(id);

    if(this.props.auth) {
      this.props.getUser();
    }
  }

  renderButtons() {
    const { post } = this.props;

    if(!this.props.user) {
      return ( <div></div> );
    }

    if(this.props.auth) {
      if(this.props.user._id === post.author.id) {
        return (
          <div>
            <button
              onClick={this.onDeleteClick}
              className="btn btn-danger"
              >
              Delete
            </button>
            <Link
              to={`/posts/${post._id}/edit`}
              className="btn btn-success"
              >
              Edit
            </Link>
          </div>
        )
      }
    } else {
      return (
        <div></div>
      )
    }
  }

  renderCommentsButtons(comment) {
    const { post, user, auth } = this.props;

    if(!user) {
      return (<div></div>);
    }

    if(auth) {
      if(user._id === comment.author.id) {
        return (
          <div>
            <button
              onClick={() => this.deleteComment(comment)}
              className="btn btn-xs btn-danger">
              Delete
            </button>
            <Link
              to={`/posts/${post._id}/comments/${comment._id}/edit`}
              className="btn btn-xs btn-warning">
              Edit
            </Link>
          </div>
        )
      }
    }
  }

  renderComments() {
    const { post } = this.props;
    return _.map(post.comments, comment => {
      return (
        <li className="list-group-item" key={comment._id}>
          <div>
            {comment.text} : {comment.author.email}
          </div>
          {this.renderCommentsButtons(comment)}
        </li>
      );
    });
  }

  deleteComment(comment) {
    const {id} = this.props.match.params;
    const {user, post, auth} = this.props;

    if(!user) {
      return (<div></div>);
    }

    if(auth) {
      if(user._id === comment.author.id){
        this.props.deleteComments(post, comment._id, () => {
          this.props.history.push(`/posts/${post._id}`);
        });
      }
    }
  }

  onDeleteClick() {
    const {id} = this.props.match.params;
    const {post} = this.props;

    if(!this.props.user) {
      return (<div></div>);
    }

    if(this.props.auth) {
      if(this.props.user._id === post.author.id) {
        this.props.deletePost(id, () => {
          this.props.history.push(`/posts`);
        });
      }
    }
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div> Loading...No Post</div>;
    }

    return (
      <div>
        <Link className="btn btn-primary" to="/posts">Back To Post</Link>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p>created by: {post.author.email}</p>
        <ul className="list-group">
          {this.renderComments()}
        </ul>
        {this.renderButtons()}
        <Link
          className="btn btn-warning"
          to={`/posts/${post._id}/comments/new`}>
            Comment
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ posts, auth, user }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
    user: user,
    auth: auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...actions, ...actionsIndex, ...actionsComments}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPosts);
