import React , { Component } from 'react';
import * as actions from '../../actions/posts_actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';


class Posts extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <Link to={`/posts/${post._id}`} key={post._id}>
          <li className="list-group-item">
            {post.title}
          </li>
        </Link>
      )
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, actions)(Posts);
