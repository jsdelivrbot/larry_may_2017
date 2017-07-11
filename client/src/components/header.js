import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions/index';

class Header extends Component {
  componentDidMount() {
    if(this.props.authenticated) {
      this.props.getUser();
    }
  }

  renderLinks() {
    if(this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/posts/new">Create New Post</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/posts">Posts</Link>
        </li>
      ];
    } else {
      return [
        <li className="nav-item" key={4}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={5}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  renderUser() {
    if(this.props.user) {
      return (
        <li className="nav-item" key={this.props.user.id}>
          {this.props.user.email}
        </li>
      )
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Ghost Hunters</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          {this.renderUser()}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(Header);
