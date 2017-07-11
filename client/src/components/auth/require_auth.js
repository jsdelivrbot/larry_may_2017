import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.authError('Must be logged in to do that!');
        this.props.history.push('/');
      }
    }

    componentDidMount() {
      if (!this.props.user) {
        this.props.getUser();
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.authError('Must be logged in to do that!');
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      user: state.user
     };
  }

  return connect(mapStateToProps, actions)(Authentication);
}
